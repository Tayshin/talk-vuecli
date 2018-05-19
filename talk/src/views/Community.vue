<template>
<v-app id="inspire">
    <v-layout row>
    <v-flex xs12>
        <v-card>
        <v-toolbar color="primary" dark>
        
            <v-btn icon @click="toBack()">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{home_name + home_id}}</v-toolbar-title>
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
        
        </v-card>
    </v-flex>
    
    </v-layout>
    <v-flex xs12>
      <v-divider style="background-color:#fff"></v-divider>
          <v-list subheader>
            <v-list-tile avatar v-for="item in rooms" :key="item.name" @click="toRoom(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          
      </v-flex>
</v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '',
      home_name:'',
      home_id:'',
      options:[
          { 
              id:1,
              title: 'Leave the Community' 
          },
          { 
              id:2,
              title: 'Setting' 
          }
      ],
      rooms: [
                          
      ]
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toBack(){
          var self = this;
          // this.$router.push('/main/conversations');
          history.go(-1);
      },
      toRoom(_item){
          this.$router.push('/r/'+ _item.id);
      },
      getRooms(){
        var self = this;
        self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.communityAPI + '/' +self.home_id + '/rooms?pageNum=1&pageSize=10'
              // url:'/static/community.json'
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data.payload.list)
                    self.rooms = new Array();
                    self.rooms = self.rooms.concat(res.data.payload.list)
                    console.log(self.rooms);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
          });  
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
              url:self.$API.homeAPI + '/' + self.home_id
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data)
                    alert('you left the community.');
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
          self.$router.push('/com-setting')
      }

  },
  mounted(){
      var self = this;
      this.home_id = this.$route.params.homeid;
      self.getRooms();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
