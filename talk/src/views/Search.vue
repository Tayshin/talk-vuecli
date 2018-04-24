<template>    
    <v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark>
                <v-btn icon @click="toBack()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                style="flex-basis: 75%;"
                append-icon="search"
                label="Search"
                single-line
                hide-details
                v-model="search"
            ></v-text-field>
            </v-toolbar>
            
            </v-card>
        </v-flex>
        </v-layout>
    </v-app>
</template>

<script>
export default {
  name: 'AppHeader',
  data (){
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title:"",
            imgSrc:"./static/img.jpg",
            drawer: null,
            //菜单选项：
            menu: [
                { id: '1', title: 'All Conversations', icon: 'home', link:'/conversations' },
                { id: '2', title: 'People', icon: 'people',link:'/people' }
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
      toBack(){
          var self = this;
          this.$router.push('/main/conversations');
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
