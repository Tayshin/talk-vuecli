<template>    
    <v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark fixed>
                <v-btn icon @click="toBack()">
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
                            label="Name"
                            v-model="name"
                            :disabled="submittable"
                            :rules="nameRules"
                            :counter="64"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Description"
                            v-model="description"
                        ></v-text-field>
                        <v-flex xs12>
                            <v-btn
                                block
                                color="green"
                                style="color:#fff;"
                                @click="dialog = true"
                            >
                                选择文件
                            </v-btn>
                        </v-flex>
                        <v-dialog v-model="dialog" max-width="290">
                            <v-card>
                            <v-card-title class="headline">选择上传的文件</v-card-title>
                            <v-container>
                            <input type="file" class="file" id="file" ref="file" @change="changeFileName()" />
                            </v-container>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat="flat" @click="finish()">完成</v-btn>
                            </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-divider light style="background-color:#fff"></v-divider>
                        <v-flex xs12>
                            <v-btn
                                block
                                @click="submit"
                                :disabled="!valid"
                                color="primary"
                            >
                                上传
                            </v-btn>
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
            Title:"上传资源",
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
            valid: false,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 64) || 'Name must be less than 10 characters'
            ],
            description: '',
            // descriptionRules: [
            //     v => !!v || 'E-mail is required',
            //     v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            // ],
            fileName:'',
            dialog: false,
            submittable: true
      }
  },
  methods:{
    finish(){
        this.dialog = false;
        console.log(this.$refs.file.files[0]);
    },
    show(key){
        alert(key);
    },
    toBack(){
        var self = this;
        this.$router.push('/file');
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
        var form = new FormData();
        var file = self.$refs.file.files[0];
        form.append("name",file.name);
        form.append("type",1);
        form.append("description",self.description);
        form.append("file",file,file.name);

        self.$axios({
            method:'post',
            baseURL:self.$API.baseURL,
            url:self.$API.sourceAPI,
            data:form,
            // headers:{
            //     'content-type': 'application/x-www-form-urlencoded'
            // }
        }).then(res =>{
            if(res.data.code == 1){
                    console.log(res.data)
                    alert('上传完成');
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
        }); 
    },
    changeFileName(){
        this.name = this.$refs.file.files[0].name;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white-text{
    color:#FFFFFF
},
#inspire .file-fake{
}
</style>
