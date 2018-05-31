<template>
<v-app id="inspire" class="special">
    <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark fixed>
                <v-btn icon @click="toBack()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-toolbar-title>{{Title}}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            </v-card>
        </v-flex>
    </v-layout>
        <v-flex xs12 style="margin-top:56px;">
        <v-container grid-list-lg >
        <v-card v-for="item in articles" :key="item.title"
        style="background-color:#fff;width:100%;min-height:100px;padding:10px 16px 10px 16px;" 
        @click=""
        >
            <v-touch @press="deleteItem(item)" @tap="toArticle(item.id)">
            <v-layout row>
                <v-flex xs2 md1>
                    <v-avatar size="36px">
                        <img :src="icon(item)" alt="">
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
                <label>赞同 &nbsp; {{item.voteCount}}</label>
                <label>收藏 &nbsp;{{item.collectCount}}</label>
            </v-flex>
            </v-touch>
        </v-card>
        
        </v-container>

        
    </v-flex>
</v-app>
</template>

<script>
export default {
  data () {
    return {
        msg: '',
        Title:'我的收藏',
        imgSrc:"./static/img.jpg",
        user_name:'Davy',
        articles: [
            // {
            //     name:'开发机器学习应用的步骤',
            //     id:1,
            //     createdAt:'刚刚',
            //     username:'davy',
            //     voteCount:0,
            //     collectCount:0
            // }
        ]
    }
  },
  methods:{
      icon(item){
          return this.$code.getIcon(item.icon)
      },
      show(key){
          alert(key);
      },
      toBack(){
          this.$router.push('/article');
      },
      deleteItem(item){
          var self = this;
            confirm('你确定要删除这个文件吗?') &&  self.decollect(item);
      },
      decollect(item){
          var self = this;
            const index = this.articles.indexOf(item)
          this.articles.splice(index, 1);
           self.$axios({
                method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.collectArticleAPI+'/'+self.item.id,
            //   withCredentials: true
                data:{
                }
            }).then(res => {
                if(res.data.code == 1){
                    //已经
                    self.$toast.center('已取消收藏');
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
      downloadItem(){
        alert('download');
      },
      toArticle(_id){
          this.$router.push('/a/'+_id)
      },
      getCollect(){
          var self=this;
          self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.collectAPI+'?pageNum=1&pageSize=10',
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
      self.getCollect();
   
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
#inspire .white-text{
    color:#FFFFFF
}
#inspire {
    position:absolute;
    width:100%;
}
#inspire .speed-dial {
  position: fixed !important;
  text-align:center;
}

#inspire .speed-dial .icon {
  position:absolute;
  top:25%;
}
</style>
