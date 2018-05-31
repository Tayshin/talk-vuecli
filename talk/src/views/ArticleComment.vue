<template>
<v-app id="inspire" style="background-color:#fff;">
    <v-layout row>
    <v-flex xs12>
        <v-toolbar color="primary" dark fixed>
            <v-btn icon @click="toBack()">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>评论</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-flex>
    </v-layout>
    <v-flex xs12 style="margin-top:56px;margin-bottom:60px;">
    <div v-for="item in message">
        <v-container
          fluid
          style="min-height: 0; padding:16px 10px"
        >
            <v-flex xs12>
              <v-container style="min-height: 0; padding:0">
                  <v-layout row>
                    <v-flex xs3 md2 sm2>
                        <div style="text-align:center;">
                            <v-avatar
                                slot="activator"
                                block
                            >
                                <img
                                :src="icon(item)"
                                alt=""
                                >
                            </v-avatar>
                            <div style="position:relative;margin-top:10px;">{{item.username}}</div>
                        </div>
                    </v-flex>
                    <v-flex xs8>
                        <p style="">{{item.createdAt}}</p>
                        <div>
                            {{item.content}}
                        </div>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-flex>
        </v-container>
    </div>
    </v-flex>
    <v-flex xs12 class="messaging">
        <v-container style="padding:10px">
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
                    v-model="texting"
                    :rules="textRules"
                    @change="searching(search)"
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
            <v-btn
                @click="comment"
                color="green"
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
      room_name:'Room_id:',
      room_id:'000',
      imgSrc:'./static/img.jpg',
      options:[
        {   id:1,
            title: 'Leave the Room' 
        },
        { 
            id:2,
            title: 'Setting(if is yours,include delete)' 
        },          
        { 
            id:3,
            title: 'extra options' 
        }
      ],
      //type =1 表示自己
      message:[
          
      ],
      texting:'',
      textRules:[
                v => !!v || 'required'
            ]
    }
  },
  methods:{
        icon(item){
            var self = this;
            return self.$code.getIcon(item.icon);
        },
        show(key){
            alert(key);
        },
        toBack(){
            history.go(-1);
        },
        getComment(){
            var self = this;
            self.$axios({
                method:'get',
                baseURL:self.$API.baseURL,
                url:self.$API.articleAPI+'/'+self.article_id +'/comments?pageNum=1&pageSize=10',
                //withCredentials: true
            }).then(res => {
                if(res.data.code == 1){
                    //点了踩
                    self.message = res.data.payload.list;
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
        comment(){
            var self = this;
            if(self.texting == ""){
                self.$toast.center('评论内容不能为空～');
            }  else {
                self.post();
            }
        },
        post(){
            var self = this;
            self.$axios({
                method:'post',
                baseURL:self.$API.baseURL,
                url:self.$API.articleAPI+'/'+self.article_id +'/comment',
                //withCredentials: true
                data:{
                    "comment":self.texting
                }
            }).then(res => {
                if(res.data.code == 1){
                    //点了踩
                    self.$toast.center('评论成功');
                    self.texting ='';
                    self.getComment();
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
        getMe(){
            var self = this;
            self.$code.getUser().then(res =>{
                console.log('res',res)
                self.imgSrc = self.$code.getIcon(res.data.payload.icon);
            }).catch(error =>{
                console.warn('fuck');
            });
        }
},
  mounted(){
      this.article_id = this.$route.params.articleid;
      this.getComment();
      this.getMe();
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
