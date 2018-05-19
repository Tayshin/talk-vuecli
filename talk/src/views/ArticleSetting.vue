<template>
<v-app id="inspire">
    <v-layout row>
    <v-flex xs12>
        <v-toolbar color="primary" dark fixed>
            <v-btn icon @click="toBack()">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>编辑文章</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn icon :disabled="!valid">
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
      texting:'',
      textRules:[
                v => !!v || 'required'
        ],
        valid: true,
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toBack(){
          var self = this;
          this.$router.push('/article');
      }
  },
  mounted(){
      this.room_id = this.$route.params.roomid;
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
