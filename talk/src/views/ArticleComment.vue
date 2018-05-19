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
                                :src="imgSrc"
                                alt=""
                                >
                            </v-avatar>
                            <div style="position:relative;margin-top:10px;">{{item.user_name}}</div>
                        </div>
                    </v-flex>
                    <v-flex xs8>
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
                    :rules="textRules"
                    @change="searching(search)"
                ></v-text-field>
            </v-flex>
            <v-flex xs2>
            <v-btn
                @click="submit"
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
          {
              user_name:'博丽灵梦',
              content:'评论',
              type:false
          },
          {
              user_name:'雾雨魔理沙',
              content:'评论评论评论评论评论评论',
              type:true
          }
      ],
      texting:'',
      textRules:[
                v => !!v || 'required'
            ]
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toBack(){
          var self = this;
            history.go(-1);
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
          self.$router.push('/room-setting')
      }
  },
  mounted(){
      this.room_id = this.$route.params.roomid;
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
