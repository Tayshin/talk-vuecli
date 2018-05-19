<template>
<v-app id="inspire" class="special">
    <v-layout row>
    <v-flex xs12>
        <v-toolbar color="primary" dark fixed>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>{{Title}}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn icon @click="toSearch()">
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
              <v-list-tile-title>Davy</v-list-tile-title>
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
    </v-flex>
    </v-layout>
    <v-flex xs12 style="margin-top:56px;">
        <v-container grid-list-lg >

        <v-card v-for="item in articles" :key="item.title"
        style="background-color:#fff;width:100%;min-height:100px;padding:10px 16px 10px 16px;" 
        @click=""
        >
            <div @click="toArticle(item.id)">
            <v-layout row>
                <v-flex xs2 md1>
                    <v-avatar size="36px">
                        <img :src="imgSrc" alt="">
                    </v-avatar>
                </v-flex>
                <v-flex xs3 md1 style="padding-top:14px;font-size:16px;">
                    <label>{{item.username}}</label>
                </v-flex>
            </v-layout>

            <v-flex xs12 style="font-size:18px;font-weight:bold;">
                <label>{{item.name}}</label>
            </v-flex>

            <v-flex xs12  style="font-size:15px;font-weight:light;color:rgb(175, 159, 159);">
                <label>{{item.createdAt}}</label>
            </v-flex>
            </div>
        </v-card>
        
        </v-container>

        
    </v-flex>
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
          color="primary"
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
          color="primary darken-2"
          @click="toCreate()"
        >
          <v-icon>send</v-icon>
        </v-btn>
      </v-speed-dial>
</v-app>
</template>

<script>
export default {
  data () {
    return {
        msg: '',
        Title:'我的文章',
        imgSrc:"./static/img.jpg",
        user_name:'Davy',
        articles: [
            
            {
                name:'Webpack环境配置',
                id:1,
                createdAt:'10分钟前',
                username:'davy'
            },
            {
                name:'Webpack环境配置',
                id:1,
                createdAt:'10分钟前',
                username:'davy'
            },
            {
                name:'Webpack环境配置',
                id:1,
                createdAt:'10分钟前',
                username:'davy'
            },
            {
                name:'Webpack环境配置',
                id:1,
                createdAt:'10分钟前',
                username:'davy'
            },
            {
                name:'Webpack环境配置',
                id:1,
                createdAt:'10分钟前',
                username:'davy'
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
        transition: 'slide-y-reverse-transition',
        drawer: null,
        //菜单选项：
        menu: [
            { id: '1', title: '我的文章', icon: 'home', link:'/article' },
            { id: '2', title: '我的收藏', icon: 'stars',link:'/article-collect' }
        ]
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toMenu(){
          this.$router.push('/menu');
      },
      toSearch(){
          this.$router.push('/article-search');
      },
      toCreate(){
          this.$router.push('/article-create')
      },
      toArticle(_id){
          this.$router.push('/a/'+_id);
      },
      toLink(_item){
          var self = this;
          self.$data.Title = _item.title;
          self.$router.push(_item.link);
      },
      getArticles(){
          var self = this;
          self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.columnAPI+'/1'+self.$API.articlesAPI + '?pageNum=1&pageSize=10',
              // withCredentials: true
              // url:'/static/conversation.json'
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data.payload)
                    self.articles = new Array();
                    self.articles = self.articles.concat(res.data.payload.list)
                    console.log(self.articles);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
          });  
      }
  },
  mounted(){
      var self = this;
        self.getArticles();
  },
  computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
  
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
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
