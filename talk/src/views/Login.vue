<template>
<v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark>
                <v-btn icon @click="toBack()">
                    <v-icon>adb</v-icon>
                </v-btn>
            <v-toolbar-title class="white-text">{{Title}}</v-toolbar-title>
            </v-toolbar> 
            </v-card>
        </v-flex>
        </v-layout>
            <v-flex xs12>
                    <v-container style="margin-top:50px;">
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                            label="用户名"
                            v-model="name"
                            :rules="nameRules"
                            :counter="32"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="密码"
                            type="password"
                            v-model="pwd"
                        ></v-text-field>
                        
                        <v-flex xs12>
                            <v-btn
                                block
                                @click="submit()"
                                :disabled="!valid"
                                color="primary"
                            >
                                登录
                            </v-btn>
                        </v-flex>
                        <v-divider light style="background-color:#fff"></v-divider>
                        <v-flex xs12>
                            <v-btn color="green" block @click="signUp()" dark>前往注册</v-btn>
                        </v-flex>
                    </v-form>
                    </v-container>
            </v-flex>
    </v-app>

</template>

<script>
export default {
//   <form action="http://192.168.1.116:8888/test/login" method="post">
//     账号：<input type="text" name="username"/>
//     密码：<input type="password" name="password"/>
//     <input type="submit" value="登录">
// </form>
  name: 'HelloWorld',
  data () {
    return {
      imgSrc:"./static/img.jpg",
      //验证部分
      valid: true,
      Title: '程序员交流社区',
      msg: '',
      name:'',
      pwd:'',
      nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 32) || 'Name must be less than 10 characters'
            ],
    }
  },
  methods:{
        toBack(){
            // history.go(-1);
            this.$router.push('/menu')
        },
        submit(){
          var self = this;
          console.log('fuck');
          const params = new URLSearchParams();
          params.append('username', self.name);
          params.append('password', self.pwd);
          // const data = { 'username': 'hxh','password':'123'};
            this.$axios({
                method:'post',
                // data: self.$qs.stringify(data),
                data:params,
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                baseURL:self.$API.baseURL,
                url:'/test/login',
                withCredentials: true
            }).then(res =>{
                console.log(res);
                if(res.data.code == 1){
                    self.$toast.center('欢迎您，'+ res.data.payload.username)
                    setTimeout(self.toBack,2500);
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn(error);
                // self.$router.push('/main/conversations');
                // self.$toast.center('欢迎您，'+ 'davy')
                // setTimeout(self.toMenu,2500);
            });
        },
        signUp(){
            this.$router.push('/sign-up');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
