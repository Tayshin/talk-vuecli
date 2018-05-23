<template>
<v-app id="inspire">
    <v-layout row>
    <v-flex xs12>
        <v-toolbar color="primary" dark fixed>
            <v-btn icon @click="toBack()">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>修改文章</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn icon :disabled="!valid" @click="submit()">
                  <v-icon>send</v-icon>
              </v-btn>
             
        </v-toolbar>
    </v-flex>
    </v-layout>
    <v-container style="margin-top:50px;padding:0 10px;">
      <v-layout row wrap style="height:100%;">
        <v-flex xs12>
          <v-text-field
            :rules="textRules"
            box
            v-model="texting"
            label="标题"
            hint="请输入文章标题"
            persistent-hint
          ></v-text-field>
        </v-flex>
        <v-flex xs12 class="text-place" style="height:100%;">
             <v-text-field
                  name="input-1"
                  label="文章内容"
                  v-model="content"
                  textarea
                ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
</v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        msg: '',
        imgSrc:'./static/img.jpg',
        //文章标题
        texting:'',
        textRules:[
                    v => !!v || 'required'
        ],
        valid: true,
        //文章内容
        content:''
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toBack(){
          var self = this;
          this.$router.push('/article');
      },
      submit(){
          var self = this;
          if(self.texting == ""){
              self.$toast.center('文章名称不能为空～');
          } else if(self.content == ""){
              self.$toast.center('文章内容不能为空～');
          } else {
              self.post();
          }
      },
      post(){
          var self = this;
          console.log(self.texting,self.content);
          self.$axios({
              method:'put',
              baseURL:self.$API.baseURL,
              url:self.$API.articleAPI + '/' + self.article_id,
              data:{
                  "name":self.texting,
                  "description":'',
                  "tags":[],
                  "columnId":1,
                  "content":self.content,
                  "parseType":1
              }
              // withCredentials: true
              // url:'/static/conversation.json'
          }).then(res => {
             if(res.data.code == 1){
                    self.$toast.center('修改成功～,3秒后返回列表');
                    setTimeout(self.toBack,3000);                    
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                self.$toast.center('网络故障');
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
                    self.texting = res.data.payload.name;
                    self.content = res.data.payload.content;
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
      this.article_id = this.$route.params.articleid;
      this.getArticle();
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
.text-place .primary--text{
    min-height:125%;
}
</style>
