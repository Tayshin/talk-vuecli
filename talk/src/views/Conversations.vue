<template>    
  <v-app id="inspire" fixed> 
    <v-layout row>
        <v-flex xs12>
          <v-card>
          <v-list subheader>
            <v-subheader>My Rooms</v-subheader>
            <v-list-tile avatar v-for="item in myrooms" :key="item.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list subheader>
            <v-subheader>Suggested Rooms</v-subheader>
            <v-list-tile avatar v-for="item in suggest" :key="item.title" @click="">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
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
        myrooms: [
            {
                title:'webpack'
            },
            {
                title:'react'
            },
            {
                title:'vue'
            }               
        ],
        suggest: [
            {
                title:'java'
            },
            {
                title:'spring'
            },
            {
                title:'j2ee'
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
          this.$router.push('/main');
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white-text{
    color:#FFFFFF
}
#inspire {
    position:absolute;
    top:56px;
    width:100%;
}
</style>
