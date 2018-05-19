<template>    
  <v-app id="inspire" class="special" fixed> 
    <v-layout row>
        <v-flex xs12>
          <div id="create">
          <v-list subheader>
            <v-subheader>My Rooms</v-subheader>
            <v-list-tile avatar v-for="item in myrooms" :key="item.name" @click="toRoom(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon :color="'teal'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <!-- <v-divider></v-divider>
          <v-list subheader>
            <v-subheader>Suggested Rooms</v-subheader>
            <v-list-tile avatar v-for="item in suggest" :key="item.name" @click="">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list> -->
        </div>
      </v-flex>
    </v-layout>
    <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <v-btn
          slot="activator"
          color="blue darken-2"
          dark
          fab
          hover
          v-model="fab"
        >
          <v-icon>add</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="blue darken-2"
          @click="toCreateRoom()"
        >
          <v-icon>forum</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="blue darken-2"
          @click="toCreateCom()"
        >
          <v-icon>people</v-icon>
        </v-btn>
      </v-speed-dial>
   
  </v-app>
</template>

<script>
export default {
    name: 'AppHeader',
    data (){
        return {
          myrooms: [
             {
               name:'java交流',
               id:123
             },
             {
               name:'python学习',
               id:123
             },
             {
               name:'React学习',
               id:123
             }       
          ],
          suggest: [
              {
                  name:'施工中...'
              }
          ],
          direction: 'top',
          fab: false,
          fling: false,
          hover: false,
          tabs: null,
          top: false,
          right: true,
          bottom: true,
          left: false,
          transition: 'slide-y-reverse-transition'
          //悬浮btn 控制参数
        }
    },
    methods:{
        show(key){
            alert(key);
        },
        toBack(){
            var self = this;
            this.$router.push('/main');
        },
        //to：创建房间页
        toCreateCom(){
            this.$router.push('/create-community');
        },
        toCreateRoom(){
            this.$router.push('/create-room');
        },
        getConversation(){
          var self = this;
          self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.conversationAPI,
              // withCredentials: true
              // url:'/static/conversation.json'
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data.payload)
                    self.myrooms = new Array();
                    self.myrooms = self.myrooms.concat(res.data.payload)
                    console.log(self.myrooms);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
          });  
        },
        toRoom(_item){
            this.$router.push('/r/'+_item.id)
        }
    },
    mounted(){  
        var self = this;
        self.getConversation();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.special .white-text{
    color:#FFFFFF
}
.special {
    position:absolute;
    top:56px;
    width:100%;
}
.special .speed-dial {
  position: fixed !important;
  text-align:center;
}

.special .speed-dial .icon {
  position:absolute;
  top:25%;
}



</style>
