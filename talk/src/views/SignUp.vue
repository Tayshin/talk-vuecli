<template>
<v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar @click="toLogin()" color="primary" dark>
                <v-btn icon>
                    <v-icon>arrow_back</v-icon>
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
                            label="邮箱"
                            v-model="email"
                            :rules="emailRules"
                            :counter="32"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="用户名"
                            v-model="name"
                            :rules="nameRules"
                            :counter="32"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="密码"
                            v-model="pwd"
                        ></v-text-field>
                        <v-flex xs12>
                            <v-btn
                                block
                                @click="submit()"
                                :disabled="!valid"
                                color="primary"
                            >
                                注册
                            </v-btn>
                        </v-flex>
                        <v-divider light style="background-color:#fff"></v-divider>
                        
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
        //验证部分
        valid: true,
        Title: '注册',
        msg: '',
        name:'',
        pwd:'',
        email:'',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 32) || 'Name must be less than 10 characters'
        ],
        emailRules: [
            v => !!v || 'email is required',
            v => (v && v.length <= 32) || 'Name must be less than 10 characters'
        ],
    }
  },
  methods:{
        toMenu(){
            this.$router.push('/menu')            
        },
        toLogin(){
            this.$router.push('/login')            
        },
        submit(){
          var self = this;
          const params = new URLSearchParams();
          params.append('username', self.name);
          params.append('password', self.pwd);
          // const data = { 'username': 'hxh','password':'123'};
            self.$axios({
                method:'post',
                // data: self.$qs.stringify(data),
                // data:params,
                // headers: {
                //   'content-type': 'application/x-www-form-urlencoded'
                // },
                baseURL:self.$API.baseURL,
                url:'/user/register',
                data:{
                    "username":self.name,
                    "email":self.email,
                    "password":self.pwd
                }
                // url:'/test/register',
                // withCredentials: true
            }).then(res =>{
                console.log(res);
                if(res.data.code == 1){
                    self.$toast.center('注册成功～，3s后返回登录界面～')
                    setTimeout(toLogin,2500);
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn(error);
                
                self.$toast.center('注册成功～，3s后返回登录界面～')
                    setTimeout(self.toLogin,2500);
            });
        },
        signUp(){
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
