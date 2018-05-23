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
    <div v-for="item in message">
        <v-container
          fluid
          style="min-height: 0;padding:8px 16px"
          grid-list-lg
        >
            <v-flex xs12>
              <v-card :class="{green:item.type}">
              <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs4 md2 sm2>
                        <div style="text-align:center;">
                            <v-avatar
                                slot="activator"
                                block
                            >
                                <img
                                :src="imgSrc"
                                alt=""
                                >
                            </v-avatar>
                            <div style="position:relative;margin-top:10px;">{{item.user_name}}</div>
                        </div>
                    </v-flex>
                    <v-flex xs8>
                        <p style="margin-bottom:8px;">{{item.createdAt}}</p>
                        <div>
                            {{item.content}}
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
            <v-flex xs8>
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
                @click="submit"
                color="blue"
                icon
                dark
            >
                <v-icon>
                    send
                </v-icon>
            </v-btn></v-flex>
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
        msg: '',
        room_name:'JavaScript学习',
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
            {
                user_name:'博丽灵梦',
                content:'信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息',
                type:false,
                createdAt:'2018-10-1 11:11:11',
                
            },
            {
                user_name:'雾雨魔理沙',
                content:'信息信息信息信息信息信息信息信息',
                type:true,
                createdAt:'2018-10-1 11:11:11'
            },
            {
                user_name:'博丽灵梦',
                content:'信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息',
                type:false,
                createdAt:'2018-10-1 11:11:11'
            },
            {
                user_name:'博丽灵梦',
                content:'信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息',
                type:false,
                createdAt:'2018-10-1 11:11:11'
            },
            {
                user_name:'雾雨魔理沙',
                content:'信息信息信息信息信息信息信息信息',
                type:true,
                createdAt:'2018-10-1 11:11:11'
            },
            {
                user_name:'博丽灵梦',
                content:'信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息',
                type:false,
                createdAt:'2018-10-1 11:11:11'
            },
            {
                user_name:'博丽灵梦',
                content:'信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息',
                type:false,
                createdAt:'2018-10-1 11:11:11'
            }
        ],
        texting:'',
        textRules:[ v => !!v || 'required'],
        content:'',
        //chat 部分
        sessionId:null,
        stompClient:null,
        msgSubscription:null,    // 订阅房间
        recordSubscription:null  // 订阅消息记录

    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toBack(){
          var self = this;
        //   this.$router.push('/main/conversations');
            self.enterRoom();
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
              url:self.$API.deleteAPI + '/' + self.room_id
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
            self.sessionId = self.guid();
            var socket = new self.$SockJS('/coderRoom', [], {
                sessionId: () => {
                    return self.sessionId
                }
            }); 
            //构建一个SockJS对象
            self.stompClient = self.$Stomp.over(socket); //用Stomp将SockJS进行协议封装
            self.stompClient.connect({}, function (frame) {
                setConnected(true);
                console.log('Connected: ' + self.sessionId);
                self.recordSubscription = self.stompClient.subscribe(
                    '/user/' + self.sessionId + '/self',
                    function (response) {
                        var recordList = JSON.parse(response.body).list;
                        for (var i=0;i<recordList.length;i++){
                            var record = recordList[i];
                            self.prependMsg(record.username,record.content,record.createdAt);
                        }
                    }
                );
            });
        },
        prependMsg(_username,_content,_createdAt) {
            var self = this;
            var item = { 
                user_name:_username,
                content:_content,
                createdAt:_createdAt
            }
            self.message.unshift(item);
        },
        /* 往底部消息 */
        appendMsg(_username,_content,_createdAt) {
            var self = this;
            var item = { 
                user_name:_username,
                content:_content,
                createdAt:_createdAt
            }
            self.message.push(item);
        },
        disconnect(){    
            var self = this;
            if (self.stompClient !== null) {
                self.stompClient.disconnect();
            }
            self.setConnected(false);
            console.log("Disconnected");
        },
        setConnected(connected) {  //working
            var self = this;
            // $("#connect").prop("disabled", connected);
            // $("#disconnect").prop("disabled", !connected);
            if (connected) {
                // $("#conversation").show();
            }
            else {
                // $("#conversation").hide();
            }
            self.clearMsg();
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
                        'roomId': self.room_id
                    }
                )
            );
        },
        exitRoom(){ 
            var self = this;
            self.stompClient.send(
                "/app/exit",
                {},
                JSON.stringify(
                    {
                        'content': self.user_name,
                        'roomId': self.room_id
                    }
                )
            );

            // 取消该房间订阅
            self.msgSubscription.unsubscribe();
            console.log("exit room : " + $("#room").val());
            clearMsg();
        },
        //处理消息
        handleMsg(message){
            var self = this;
            console.log(message);
            if (message.type == 1) {
                self.appendMsg(message.username,message.content,message.createdAt);
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
                        'roomId': self.room_id,
                        'content': self.content
                    }
                )
            );
        },
        /* 查看消息记录 */
        getMessageRecord(roomId,pageNum,pageSize) {
            var self = this;
            self.stompClient.send(
                "/app/getRecordByRoomIdAndPage",
                {},
                JSON.stringify(
                    {
                        'roomId': roomId,
                        'pageNum':pageNum,
                        'pageSize': pageSize
                    }
                )
            );
        },
        /* 查看消息记录 */
        // datetime格式 : yyyy-MM-dd'T'HH:mm:ss
        getMessageRecord2(roomId,datetime) {
            var self = this;
            self.stompClient.send(
                "/app/getRecordByRoomIdAndLastTime",
                {},
                JSON.stringify(
                    {
                        'roomId': roomId,
                        'time': datetime
                    }
                )
            );
        },
        //点击发送信息
        submit(){
            var self = this;
            self.sendMessage();
            self.content = '';
        }
  },
  mounted(){
        var self = this;
        this.room_id = this.$route.params.roomid;
        //进入房间时建立连接：
        self.connect();
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
