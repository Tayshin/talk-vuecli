<template>    
    <v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark>
                <v-btn icon @click="toBack()">
                    <v-icon>close</v-icon>
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
                            label="Name"
                            v-model="name"
                            :rules="nameRules"
                            :counter="10"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Description"
                            v-model="description"
                        ></v-text-field>
                        
                        <v-flex xs12>
                            <v-btn
                                block
                                @click="submit"
                                :disabled="!valid"
                                color="primary"
                            >
                                submit
                            </v-btn>
                        </v-flex>
                        <v-divider light style="background-color:#fff"></v-divider>
                        <v-flex xs12>
                            <v-btn block @click="clear">clear</v-btn>
                        </v-flex>
                    </v-form>
                    </v-container>
            </v-flex>
            
    </v-app>
</template>

<script>
export default {
  data (){
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title:"Create Community",
            imgSrc:"./static/img.jpg",
            drawer: null,
            //菜单选项：
            menu: [
                { id: '1', title: 'All Conversations', icon: 'home', link:'/conversations' },
                { id: '2', title: 'People', icon: 'people',link:'/people' }
            ],
            communities: [
                { id: '1', title: 'webpack'}
            ],
            //验证部分
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            description: '',
            // descriptionRules: [
            //     v => !!v || 'E-mail is required',
            //     v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            // ],
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
    submit () {
        var self = this;
        if (this.$refs.form.validate()) {
            self.post();
        }
    },
    clear () {
      this.$refs.form.reset();
    },
    post(){
        var self = this;
        self.$axios({
            method:'post',
            baseURL:self.$API.baseURL,
            url:self.$API.homeAPI,
            data:{
                "name":self.name,
                "description":self.description
            }
        }).then(res =>{
            if(res.data.code == 1){
                    console.log(res.data)
                    alert('Create Community :'+ self.name);
                    self.toBack();
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
