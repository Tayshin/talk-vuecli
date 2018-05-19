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
        <v-flex xs12>
          <v-list subheader>
            <v-list-tile avatar v-for="item in solution" :key="item.id" @click="toRoom(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
             
            </v-list-tile>
          </v-list>
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
            solution: [
                   {
               name:'JavaScript交流',
               id:123
             }          
            ]
      }
  },
  methods:{
        show(key){
            alert(key);
        },
        toBack(){
            var self = this;
            this.$router.push('/main/conversations');
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
        toRoom(_item){
            this.$router.push('/r/'+_item.id);
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
