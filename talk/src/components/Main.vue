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
        <v-list class="avatar">

          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="imgSrc" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Davy</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list class="" dense>
          <v-divider></v-divider>
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

        <v-list subheader dense>
            <v-subheader>Communities</v-subheader>
            <v-list class="" dense>
            <v-list-tile v-for="item in communities" :key="item.title" @click="show(item.link)">
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        </v-list>
        <v-divider></v-divider>
        <v-list class="" dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Sign out</v-list-tile-title>
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
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title:"All Conversations",
            imgSrc:"./static/img.jpg",
            drawer: null,
            //菜单选项：
            menu: [
                { id: '1', title: 'All Conversations', icon: 'home', link:'/main/conversations' },
                { id: '2', title: 'People', icon: 'people',link:'/main/people' }
            ],
            communities: [
                { id: '1', title: 'webpack'}
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
      }
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
</style>
