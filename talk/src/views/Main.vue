<template>    
    <v-app id="inspire">
        <v-toolbar dark color="primary" fixed>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="white-text">{{Title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="toSearch()" icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer
        temporary
        v-model="drawer"
        absolute
        >
        <v-parallax height="auto"src="https://vuetifyjs.com/static/doc-images/parallax/material.jpg">
        
        <v-list class="avatar">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="imgSrc" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user_name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        </v-parallax>
        
        <v-list class="" dense>
          <v-list-tile v-for="item in menu" :key="item.title" @click="toLink(item)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        
        <v-divider></v-divider>

        <!-- <v-list subheader dense>
            <v-subheader>Communities</v-subheader>
            <v-list class="" dense>
            <v-list-tile v-for="item in communities" :key="item.name" @click="toCom(item)">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-list>
        <v-divider></v-divider> -->

        <v-list class="" dense>
          <v-list-tile @click="toMenu()">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Back to Menu</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        
      </v-navigation-drawer>

      <router-view></router-view>
       
    </v-app>
</template>

<script>
export default {
  name: 'AppHeader',
  data (){
      var self = this;
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title:"聊天室",
            imgSrc:self.$API.avatar_1,
            user_name:'Davy',
            drawer: null,
            //菜单选项：
            menu: [
                { id: '1', title: '所有聊天', icon: 'home', link:'/main/conversations' },
                { id: '2', title: '朋友', icon: 'people',link:'/main/people' }
            ],
            communities: [
                { id: '1', name: 'webpack'}
            ]
            
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toSearch(){
          var self = this;
          self.$router.push('/search');
      },
      toLink(_item){
          var self = this;
          self.$data.Title = _item.title;
          self.$router.push(_item.link);
      },
      toCom(_item){
          var self = this;
          self.$router.push('/c/'+_item.id)
      },
      getCom(){
          var self = this;
          self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.mainAPI + '?pageNum=1&pageSize=10',
            //   withCredentials: true
            //   url:'/static/main.json'
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data.payload.list)
                    self.communities = new Array();
                    self.communities = self.communities.concat(res.data.payload.list)
                    console.log(self.communities);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            });     
      },
      toMenu(){
          this.$router.push('/menu');
      }
  },
  mounted(){
      var self = this;
      self.getCom();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white-text{
    color:#FFFFFF
}
#inspire{
    overflow:#hidden;
}
#create .speed-dial {
  position: absolute;
}

#create .btn--floating {
  position: relative;
}
</style>
