<template>
    <v-app class="main-wrap" style="margin-top:0;">
            <v-flex xs12 style="text-align:left; margin-bottom:50px;">
                <v-card>
                    <v-container style="padding: 8px 20px;">
                        <v-avatar>
                            <img :src="imgSrc" alt="">
                        </v-avatar>
                        <label style="font-size:16px;vertical_align:middle;font-weight:bold;">{{username}}</label>
                        <v-menu absolute style="position:absolute;right:0;">
                            <v-btn icon slot="activator" >
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile @click="opLeave()">
                                <v-list-tile-title>返回</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile v-if="isme" @click="opSetting()">
                                <v-list-tile-title>修改文章</v-list-tile-title>
                                </v-list-tile>
                                <v-list-tile v-if="isme" @click="opDelete()">
                                <v-list-tile-title>删除文章</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                            </v-menu>
                        
                    </v-container>
                </v-card>
                <v-flex xs12 style="padding:10px 16px; font-size:22px; font-weight:bold;">
                    <label>{{Title}}</label>
                </v-flex>
                <v-flex id="hxh" style="padding:0 28px; font-size:18px;">
                    <div id="md"></div>
                </v-flex>
            </v-flex>
            <v-card id="inspire" style="position:fixed;bottom:0;height:60px;width:100%; background-color:#fff;">
                    <v-btn @click="clickVote()"
                    absolute outline :color="votecolor" :class="{ 'agree-btn': ifVote, 'disagree-btn': !ifVote }"
                    style="position:absolute;left:20px;bottom:10px;">
                        <v-icon>keyboard_arrow_up</v-icon>
                        赞同
                        {{voteCount}}
                    </v-btn>
                    <!--<v-btn id="anti" :color="devotecolor" @click="devote()"
                    absolute outline style="position:absolute;left:150px;bottom:10px;" >
                        <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>-->
                     <v-btn @click="toComment()"icon style="color:rgb(152, 137, 137);float:right;"
                    > <v-icon>chat_bubble</v-icon></v-btn>
                    <label style="color:rgb(152, 137, 137);position:absolute;right:0;bottom:4px;right:14px;font-size:8px;"
                    >评论</label>  
                    <v-btn @click="clickCollect()" :class="{'collect-btn':ifCollect}"
                    icon style="color:rgb(152, 137, 137);float:right;"
                    > 
                        <v-icon>favorite</v-icon>
                    </v-btn>
                    <label :class="{'collect-btn':ifCollect}" style="color:rgb(152, 137, 137);position:absolute;right:0;bottom:4px;right:65px;font-size:8px;"
                    >收藏&nbsp;{{collectCount}}</label>
                    
            </v-card>
    </v-app>
</template>

<script>
export default {
  data () {
    return {
        votecolor:'',
        devotecolor:'primary',
        msg: '',
        imgSrc:"./static/img.jpg",
        Title:'',
        username:'',
        myname:'',
        isme:true,
        voteCount:0,
        collectCount:0,
        article_id:1,
  
        //点赞相关
        ifVote:false,//1赞   false没有
        ifCollect:false,
        mdstr:"### 开发机器学习应用的步骤\n#### \n![alt text]('/static/img.jpg')\n"
    }
  },
  methods:{
        getMe(){
            var self = this;
            self.$code.getUser().then(res =>{
                console.log('res',res)
                self.myname = res.data.payload.username;
                 if(self.myname != self.username){
                     self.isme = false;
                } 
            }).catch(error =>{
                console.warn('fuck');
            });
        },
        show(){
            history.go(-1);
        },
        toBack(){
            this.$router.push('/article')
        },
        toComment(){
            var self = this;
            this.$router.push('/article-comment/'+ self.article_id)
        },
        opLeave(){
            this.toBack();
        },
        opSetting(){
            var self = this;
            self.$router.push('/article-setting/'+ self.article_id);
        },
        opDelete(){
            var self = this;
            confirm('你确定要删除这篇文章吗?') && self.deleteArticle();
        },
        deleteArticle(){
            var self = this;
            self.$axios({
                method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.articleAPI+'/'+ self.article_id,
                //   withCredentials: true
                // url:'/static/article.json'
            }).then(res => {
                if(res.data.code == 1){
                    alert('删除成功～');
                    self.toBack();
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error)
            });  
        },
        getArticle(){
            var self = this;
            self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.articleAPI+'/'+self.article_id,
            //   withCredentials: true
            //   url:'/static/article.json'
            }).then(res => {
                if(res.data.code == 1){
                        console.log(res.data.payload)
                        self.Title = res.data.payload.name;
                        self.mdstr = res.data.payload.content;
                        self.username = res.data.payload.username;
                        self.imgSrc = self.$code.getIcon(res.data.payload.icon);
                        self.voteCount = res.data.payload.voteCount;
                        self.collectCount = res.data.payload.collectCount;
                        self.markdownPaser(self.mdstr);
                    }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error)
            });  
        },
        markdownPaser(mdstr){
            var fuck = this.$markdown.markdown.toHTML(mdstr)
            var x = document.getElementById('md');
            x.innerHTML=fuck;
        },
        //点赞相关
        getIfVote(){
            var self = this;
            self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.articleAPI+'/'+self.article_id +'/vote',
            //   withCredentials: true
            }).then(res => {
                if(res.data.code == 1){
                    //点了赞or踩
                    if(res.data.payload){
                        self.ifVote = true;
                    }
                }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            });  
        },
        vote(){
            var self = this;
            self.$axios({
                 method:'post',
                baseURL:self.$API.baseURL,
                url:self.$API.articleAPI+'/'+self.article_id +'/vote',
            //   withCredentials: true
                data:{
                    "type":1
                }
            }).then(res => {
                if(res.data.code == 1){
                    if(res.data.payload){
                    //点了赞
                        self.$toast.center('点赞成功～');
                        self.voteCount = res.data.payload;
                        self.ifVote = true;
                    }
                }
                else {
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
        devote(){
            var self = this;
            self.$axios({
                method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.articleAPI+'/'+self.article_id +'/vote',
            //   withCredentials: true
                data:{
                }
            }).then(res => {
                if(res.data.code == 1){
                    //取消赞
                    self.$toast.center('点赞已收回～');
                    self.voteCount = res.data.payload;
                    self.ifVote = false;
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
        getIfCollect(){
            var self = this;
            self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.collectArticleAPI+'/'+self.article_id,
            //   withCredentials: true
            }).then(res => {
                if(res.data.code == 1){
                    //如果收藏了
                        if(res.data.payload){
                            self.ifCollect = true;
                        }
                    }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error)
            });  
        },
        collect(){
            var self = this;
            self.$axios({
                 method:'post',
                baseURL:self.$API.baseURL,
                url:self.$API.collectArticleAPI+'/'+self.article_id,
            //   withCredentials: true
                data:{
                }
            }).then(res => {
                if(res.data.code == 1){
                    //已经
                    self.$toast.center('收藏成功～');
                    self.collectCount = res.data.payload;
                    self.ifCollect = true;
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
        decollect(){
            var self = this;
            self.$axios({
                 method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.collectArticleAPI+'/'+self.article_id,
            //   withCredentials: true
                data:{
                }
            }).then(res => {
                if(res.data.code == 1){
                    //已经
                    self.$toast.center('已取消收藏');
                    self.collectCount = res.data.payload;
                    self.ifCollect = false;
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
            }); 
        },
         clickCollect(){
            var self = this;
            if(self.ifCollect){
                self.decollect();
            }
            else{
                self.collect();
            }
        },
        clickVote(){
            var self = this;
            if(self.ifVote){
                self.devote();
            }
            else{
                self.vote();
            }
        }

    },
    mounted(){
        var self = this;
        self.article_id = this.$route.params.articleid;
        self.markdownPaser(this.mdstr);
        self.getArticle();
        self.getIfVote();
        self.getIfCollect();
        self.getMe();
        // self.getNum();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrap{
}
#anti{
   min-width:46px !important;
}
#inspire .agree-btn {
    background-color:#1976d2 !important;
    color:#fff;
}
#inspire .disagree-btn {
    background-color:#fff !important;
    color:#000;
}
.collect-btn {
    color:#1976d2 !important;
}
#hxh #md{
    width:100% !important;
}
#hxh img{
    width:100% !important;
}

</style>
