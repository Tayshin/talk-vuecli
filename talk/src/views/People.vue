<template>
    <v-app >
        <v-btn color="primary" dark @click="show()">施工中，点击返回</v-btn>
    </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
        show(){
            history.go(-1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
