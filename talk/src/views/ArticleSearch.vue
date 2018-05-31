<template>    
    <v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark>
                <v-btn icon @click="toBack()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-text-field
                    style="flex-basis: 75%;"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
                    @change="searching(search)"
                ></v-text-field>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar> 
            </v-card>
        </v-flex>
        
        </v-layout>
        <v-flex xs12 style="">
        <v-container grid-list-lg >
        <v-card v-for="item in articles" :key="item.title"
        style="background-color:#fff;width:100%;min-height:100px;padding:10px 16px 10px 16px;" >
            <div @click="toArticle(item)">
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
                <label>{{item.date}}</label>
            </v-flex>
            </div>
        </v-card>
        </v-container>

        
    </v-flex>
    </v-app>
</template>

<script>
export default {
  data (){
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title:"",
            imgSrc:"./static/img.jpg",
            drawer: null,
            search:'',
            articles: [
            // {
            //     name:'Webpack环境配置',
            //     id:1,
            //     date:'刚刚',
            //     username:"Davy",
            //     icon:4
            // },
            // {
            //     name:'Webpack环境配置',
            //     id:1,
            //     date:'刚刚',
            //     username:"Davy",
            //     icon:4
            // },
            ]
      }
  },
  methods:{
        icon(item){
            var self = this;
            return self.$code.getIcon(item.icon);
        },
        show(key){
            alert(key);
        },
        toBack(){
            var self = this;
            this.$router.push('/article');
        },
        searching(_info){
            var self = this;
            self.$axios({
                method:'get',
                baseURL: self.$API.baseURL,
                url:self.$API.searchAPI + '?info=' + _info + '&pageNum=1&pageSize=10'
                // url: '/static/search.json'
            }).then(res => {
                if(res.data.code == 1){
                    console.log(res.data.payload.list)
                    self.solution = new Array();
                    self.solution = self.solution.concat(res.data.payload.list)
                    //还是concat比较好
                    // for(var item in res.data.payload.list){
                    //     // self.solution.push(res.data.payload.list[item]);
                    // }
                    console.log(self.solution)
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            });           
        },
        toArticle(_item){
            this.$router.push('/a/'+_item.id);
        },
        searching(_info){
            var self = this;
            self.$axios({
                method:'get',
                baseURL: self.$API.baseURL,
                url:self.$API.articleAPI + '?info=' + _info + '&pageNum=1&pageSize=10'
                // url: '/static/search.json'
            }).then(res => {
                if(res.data.code == 1){
                    console.log(res.data.payload.list)
                    self.articles = new Array();
                    self.articles = self.articles.concat(res.data.payload.list)
                    //还是concat比较好
                    // for(var item in res.data.payload.list){
                    //     // self.solution.push(res.data.payload.list[item]);
                    // }
                    console.log(self.articles)
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            });           
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white-text{
    color:#FFFFFF
}
</style>
