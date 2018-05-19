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
                                <v-list-tile v-for="item in options" :key="item.title" @click="option(item.id)">
                                <v-list-tile-title>{{ item.title}}</v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                            </v-menu>
                        
                    </v-container>
                </v-card>
                <v-flex xs12 style="padding:10px 16px; font-size:22px; font-weight:bold;">
                    <label>{{Title}}</label>
                </v-flex>
                <v-flex style="padding:0 16px; font-size:18px;">
                    <div id="md"></div>
                </v-flex>
            </v-flex>
            <v-card style="position:fixed;bottom:0;height:60px;width:100%; background-color:#fff;">
                    <v-btn absolute outline style="position:absolute;left:20px;bottom:10px;">
                        <v-icon>keyboard_arrow_up</v-icon>
                        赞同
                        {{num}}
                    </v-btn>
                    <v-btn id="anti" absolute outline style="position:absolute;left:150px;bottom:10px;" >
                        <v-icon>keyboard_arrow_down</v-icon>
                    </v-btn>
                    <v-btn icon style="color:rgb(152, 137, 137);position:absolute;right:50px;"
                    
                    > 
                        <v-icon>favorite</v-icon>
                    </v-btn>
                    <label style="color:rgb(152, 137, 137);position:absolute;right:0;bottom:4px;right:65px;font-size:8px;"
                    >收藏</label>
                    <v-btn @click="toComment()"icon style="color:rgb(152, 137, 137);position:absolute;right:0;"
                    > <v-icon>chat_bubble</v-icon></v-btn>
                    <label style="color:rgb(152, 137, 137);position:absolute;right:0;bottom:4px;right:14px;font-size:8px;"
                    >评论</label>   
            </v-card>
    </v-app>
</template>

<script>
export default {
  data () {
    return {
        msg: '',
        imgSrc:"./static/img.jpg",
        Title:'开发机器学习应用的步骤',
        username:'',
        num:0,
        article_id:1,
         options:[
        {   id:1,
            title: '返回' 
        },
        { 
            id:2,
            title: '删除文章' 
        },          
        { 
            id:3,
            title: '编辑文章' 
        }
      ],
        mdstr:'### 开发机器学习应用的步骤\n#### 1. 收集数据（Collect data）\n网络、API、各种方法收集数据\n\n#### 2. 准备输入数据（Prepare the input data）\n基于算法，语言对数据进行格式化\n\n#### 3. 分析输入数据（Analyze the input data）\n数据预处理，确保前两部的数据有效\n非空判断\n一些明显异常的数据处理\n\n#### 4. 人为的介入(可无)（human involvement）\n人工的调整\n确保没有垃圾数据(don’t have garbage coming in)\n\n#### 5. 训练算法（Train the algorithm）\n机器学习开始\n给算法提供干净良好的数据，来提取信息\n\n#### 6. 测试算法（Test the algorithm）\n对算法进行评估\n对监督学习：可以跟一些公认、已知的值进行比较\n对非监督学习：其他指标\n如果不满意可以回到步骤4对算法进行调整\n\n#### 7. 使用(Use it)\n投入使用\n可能会遇到新数据，需要重新调整算法\n'
    }
  },
  methods:{
        show(){
            history.go(-1);
        },
        toBack(){
            this.$router.push('/article')
        },
        toComment(){
            this.$router.push('/article-comment')
        },
        opLeave(){
            this.toBack();
        },
        opSetting(){
            var self = this;
            self.$router.push('/article-setting')
        },
        opDelete(){
        },
        option(_id){
        var self = this;
            switch(_id){
                    case 1:
                        self.opLeave();
                    break;
                    case 2:
                        self.opDelete();
                    break;
                    case 3:
                        self.opSetting();
                    break;
            }
        },
        getArticle(){
            var self = this;
            self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.articleAPI+self.article_id,
            //   withCredentials: true
              url:'/static/article.json'
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data.payload)
                    self.Title = res.data.payload.name;
                    self.mdstr = res.data.payload.content;
                    self.username = res.data.payload.username;
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
        }
    },
    mounted(){
        var self = this;
        self.article_id = this.$route.params.articleid;
        // self.markdownPaser(this.mdstr);
        self.getArticle();
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
</style>
