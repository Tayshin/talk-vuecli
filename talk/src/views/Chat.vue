<template>
<v-app id="inspire">
    <v-layout row>
    <v-flex xs12>
        <v-toolbar color="primary" dark fixed>
            <v-btn icon @click="toBack()">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{room_name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu>
              <v-btn icon slot="activator">
                  <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile v-for="item in options" :key="item.title" @click="option(item.id)">
                  <v-list-tile-title>{{ item.title}}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
        </v-toolbar>
    </v-flex>
    </v-layout>
    <v-flex xs12 style="margin-top:56px;margin-bottom:60px;">
    <div v-for="item in message" @swipeup="checkHistory();"> 
        <v-container
          fluid
          style="min-height: 0;padding:8px 16px"
          grid-list-lg
        >
            <v-flex xs12>
              <v-card :class="{green:item.isMe}">
              <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs4 md2 sm2>
                        <div style="text-align:center;">
                            <v-avatar
                                slot="activator"
                                block
                            >
                                <img
                                :src="getMyIcon(item.icon)"
                                alt=""
                                >
                            </v-avatar>
                            <div style="position:relative;margin-top:10px;">{{item.user_name}}</div>
                        </div>
                    </v-flex>
                    <v-flex xs8>
                        <p style="margin-bottom:8px;">{{item.createdAt}}</p>
                        <div v-if="item.content_type == 1">
                            {{item.content}}
                        </div>
                        <div v-else>
                            <img style="width:100%;":src="item.content" alt="">
                        </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
        </v-container>
    </div>
    </v-flex>
    <v-flex xs12 class="messaging">
        <v-container grid-list-lg>
            <v-layout row>
            <v-flex xs2>
                <v-avatar size="43px">
                    <img :src="imgSrc">
                </v-avatar>
            </v-flex>
            <v-flex xs6>
                <v-text-field
                    class="text-place"
                    single-line
                    hide-details
                    v-model="content"
                    :rules="textRules"
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
            <v-btn
                @click="openPic()"
                color="grey"
                icon
                dark
            >
                <v-icon>
                    add
                </v-icon>
            </v-btn></v-flex>
            <v-flex xs2>
            <v-btn
                @click="submit()"
                color="blue"
                icon
                dark
            >
                <v-icon>
                    send
                </v-icon>
            </v-btn></v-flex>
            <v-dialog v-model="dialog" max-width="290">
                <v-card>
                <v-card-title class="headline">选择上传的图片</v-card-title>
                <v-container>
                <input type="file" class="file" id="file" ref="file"/>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="submitPic()">发送</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            </v-layout>
        </v-container>
    </v-flex>
</v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        dialog:false,
        msg: '',
        room_name:'PHP交流',
        room_id:'',
        user_name:'',
        imgSrc:'./static/img.jpg',
        options:[
            {   id:1,
                title: '离开房间' 
            },
            { 
                id:2,
                title: '房间设置' 
            }
        ],
        //type =1 表示自己
        message:[
            // {
            //     icon:1,
            //     user_name:'张三',
            //     content:'可以发我一张小狗的图片吗？',
            //     type:false,
            //     createdAt:'2018-10-1 11:11:11',
            //     content_type:1
            // },
            // {
            //     icon:2,
            //     user_name:'李四',
            //     content:'/static/img.jpg',
            //     type:false,
            //     createdAt:'2018-10-1 11:11:11',
            //     content_type:2

            // }
        ],
        texting:'',
        textRules:[ v => !!v || 'required'],
        content:'',
        addr:'',
        //chat 部分
        // sessionId:null,
        stompClient:null,
        msgSubscription:null,    // 订阅房间
        recordSubscription:null, // 订阅消息记录
        user_id:''
        //上传图片相关
        
    }
  },
  methods:{
        getRoomInfo(){
            var self = this;
            self.$axios({
                method:'get',
                baseURL:self.$API.baseURL,
                url:self.$API.roomAPI + '/' + self.room_id
            }).then(res => {
                if(res.data.code == 1){
                    self.room_name = res.data.payload.name;
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
                self.getMe();
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            }); 
        },
        getMe(){
            var self = this;
            self.$code.getUser().then(res =>{
                console.log('res',res)
                self.imgSrc = self.$code.getIcon(res.data.payload.icon);
                self.user_id = res.data.payload.userId;
                console.log('get UserId:',res.data.payload.userId);
                self.connect();
            }).catch(error =>{
                console.warn('fuck');
            });
        },
        getMyIcon(icon){
            var self = this;
            return self.$code.getIcon(icon);
            // self.$axios({
            //     method:'get',
            //     baseURL:self.$API.baseURL,
            //     url:'/user/' + _id
            // }
            // ).then(res =>{
            //     if(res.data.code == 1){
            //         return self.$code.getIcon(res.data.payload.icon);
            //     }
            //     else{
            //         self.$toast.center(self.$code.getCode(res.data.code));
            //     }
            // }).catch(error => {
            //         console.warn('catch :');
            //         console.log(error)
            // });
        },
        show(key){
            alert(key);
        },
        toBack(){
            var self = this;
            this.$router.push('/main/conversations');
                // self.enterRoom();
            // self.exitRoom();
        },
        option(_id){
            var self = this;
            switch(_id){
                    case 1:
                        self.opLeave();
                    break;
                    case 2:
                        self.opSetting();
                    break;
            }
        },
        opLeave(){
            var self = this;
            self.$axios({
                method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.historyAPI + '/' + self.room_id,
                data:{}
            }).then(res => {
                if(res.data.code == 1){
                        console.log(res.data)
                        alert('you left the room.');
                        self.toBack();
                    }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error)
            }); 
        },
        opSetting(){
            var self = this;
            self.$router.push('/room-setting/'+self.room_id)
        },
            //chat.js
        guid(){
            var self = this;
            return self.s4() + self.s4() + '-' + self.s4() + '-' + self.s4() + '-' + self.s4() + '-' + self.s4() + self.s4() + self.s4();
        },
        s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        },
        connect(){
            var self = this;
            // self.sessionId = self.guid();
            var socket = new self.$SockJS('/coderRoom', [], {
                // sessionId: () => {
                //     return self.sessionId
                // }
            }); 
            //构建一个SockJS对象
            self.stompClient = self.$Stomp.over(socket); //用Stomp将SockJS进行协议封装
            self.stompClient.connect({}, function (frame) {
                console.log('Connected: ' + self.user_id); 
                self.enterRoom();
                self.recordSubscription = self.stompClient.subscribe(
                    '/user/' + self.user_id + '/self',
                    function (response) {
                        var recordList = JSON.parse(response.body).list;
                        for (var i=0;i<recordList.length;i++){
                            var record = recordList[i];
                            self.prependMsg(record);
                        }     
                    }
                );
            });
        },
        prependMsg(message) {
            var self = this;
            var item = { 
                // user_name:record.username,
                // content:record.content,
                // createdAt:record.createdAt
                user_name:message.username,
                content:message.content,
                createdAt:message.createdAt,
                type:message.type,
                content_type:message.contentType,
                icon:message.icon
            }
            self.message.unshift(item);
        },
        /* 往底部消息 */
        appendMsg(message) {
            var self = this;
            var item = { 
                user_name:message.username,
                content:message.content,
                createdAt:message.createdAt,
                type:message.type,
                content_type:message.contentType,
                icon:message.icon
            }
            self.message.push(item);
        },
        disconnect(){    
            var self = this;
            if (self.stompClient !== null) {
                self.stompClient.disconnect();
            }
            console.log("Disconnected");
            this.$router.push('/main/conversations');
            
        },
        
        //清除所有信息
        clearMsg(){ 
            var self = this;
            // $("#contents").html("");
            self.message = [];
        },
        enterRoom(){ 
            var self = this;
            console.log("join room :" + self.room_id);
            // 订阅该地址，有消息时显示
            self.msgSubscription = self.stompClient.subscribe(
                '/chat/' + self.room_id,
                function (response) {
                    var record = JSON.parse(response.body);
                    self.handleMsg(record);
                }
            );
            self.stompClient.send(
                "/app/enter",
                {},
                JSON.stringify(
                    {
                        'content': self.user_name,
                        'toId': self.room_id
                    }
                )
            );
            self.getMessageRecord(self.room_id,1,10);
        },
        exitRoom(){ 
            var self = this;
            self.stompClient.send(
                "/app/exit",
                {},
                JSON.stringify(
                    {
                        'content': self.user_name,
                        'toId': self.room_id
                    }
                )
            );
            // 取消该房间订阅
            self.msgSubscription.unsubscribe();
            console.log("exit room :"+self.room_id);
            clearMsg();
            self.disconnect();
            
        },
        //处理消息
        handleMsg(message){
            var self = this;
            console.log(message);
            if (message.type == 1) {
                self.appendMsg(message);
            }
        },
        /* 发送消息 */
        sendMessage() {
            var self = this;
            self.stompClient.send(
                "/app/chat",
                {},
                JSON.stringify(
                    {
                        'toId': self.room_id,
                        'content': self.content,
                        'type':1,
                        'contentType':1
                    }
                )
            );
        },
        /* 发送图片*/
        sendPic() {
            var self = this;
            self.stompClient.send(
                "/app/chat",
                {},
                JSON.stringify(
                    {
                        'toId': self.room_id,
                        'content': 'upload/'+self.addr,
                        'type':1,
                        'contentType':2
                    }
                )
            );
        },
        /* 查看消息记录 */
        getMessageRecord(roomId,pageNum,pageSize) {
            var self = this;
            self.stompClient.send(
                "/app/getRecordByToIdAndPage",
                // "app/getRecordByoIdAndLastTime",
                {},
                JSON.stringify(
                    {
                        'toId': roomId,
                        'pageNum':pageNum,
                        'pageSize': pageSize,
                        'type':1
                    }
                )
            );
        },
        /* 查看消息记录 */
        // datetime格式 : yyyy-MM-dd'T'HH:mm:ss
        getMessageRecord2(roomId,datetime,type) {
            var self = this;
            self.stompClient.send(
                "/app/getRecordByRoomIdAndLastTime",
                {},
                JSON.stringify(
                    {
                        'toId': roomId,
                        'time': datetime,
                        'type': type
                    }
                )
            );
        },
        checkHistory(){
            var self = this;
            self.getMessageRecord2(self.room_id,self.message[0].createdAt,1);
        },
        //点击发送信息
        submit(){
            var self = this;
            self.sendMessage();
            self.content = '';
        },
        openPic(){
            var self = this;
            self.dialog = true;
        },
        submitPic(){
            var self = this;
            self.postPic();
        },
        postPic(){
            var self = this;
            var form = new FormData();
            var file = self.$refs.file.files[0];

            if(file){
                form.append("name",self.guid());
                form.append("type",1);
                form.append("description",'');
                form.append("file",file,file.name);

                self.$axios({
                    method:'post',
                    baseURL:self.$API.baseURL,
                    url:self.$API.sourceAPI,
                    data:form,
                    // headers:{
                    //     'content-type': 'application/x-www-form-urlencoded'
                    // }
                }).then(res =>{
                    if(res.data.code == 1){
                            console.log(res.data)
                            self.addr = res.data.payload.addr;
                            self.sendPic();
                            self.dialog = false;
                        }
                        else{
                            alert(self.$code.getCode(res.data.code));
                        }
                    }).catch(error => {
                        console.warn('catch :');
                        console.log(error)
                }); 
            }
            else{
                self.$toast.center('请先选择图片');
                
            }
        }
  },
  mounted(){
        var self = this;
        this.room_id = this.$route.params.roomid;
        self.getRoomInfo();
        // self.getMe();
        //进入房间时建立连接：
        // self.connect();
        // self.enterRoom();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.green{
    background-color:'green';
}
.messaging{
    position:fixed;
    bottom:0;
    min-height:60px;
    background-color:rgb(250,250,250);
    width:100%;
}
.text-place{
    padding:7px 0 0;

}

</style>
