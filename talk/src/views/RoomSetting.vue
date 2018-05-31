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

        <div style=" width:100%;margin-top:80px;" class="avatars">
        <div class="the-avatar" v-for="item in users">
            <v-avatar>
                <img :src="getIcon(item)" alt="John">
            </v-avatar>
            <label>{{item.username}}</label>
        </div>
        </div>

            <v-flex xs12 >
                    <v-container style="padding-top:0;">
                    <v-form v-model="valid" ref="form" lazy-validation>
                        <v-text-field
                            label="Name"
                            v-model="name"
                            :rules="nameRules"
                            :counter="32"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="Description"
                            v-model="description"
                        ></v-text-field>
                        <!--<v-select
                            :items="items"
                            item-text="name"
                            v-model="chooseCom"
                            label="Community"
                            single-line
                        ></v-select>-->
                        <v-select
                            label="Keywords for your room"
                            chips
                            outline="true"
                            tags
                            solo
                            append-icon=""
                            clearable
                            v-model="chips"
                            style="background-color:#fafafa;border-radius:0;box-shadow:0 0 0 #fafafa"
                        >
                            <template slot="selection" slot-scope="data">
                                <v-chip
                                close
                                @input="remove(data.item)"
                                :selected="data.selected"
                                >
                                <strong>{{ data.item }}</strong>&nbsp;
                                </v-chip>
                            </template>
                        </v-select>
                        <v-divider light style="background-color:#fff"></v-divider>
                        <v-flex xs12>
                            <v-btn
                                block
                                @click="submit()"
                                :disabled="!valid"
                                color="primary"
                            >
                                提交修改
                            </v-btn>
                        </v-flex>
                        <v-divider light style="background-color:#fff"></v-divider>
                        <v-flex xs12>
                            <v-btn block v-if="isme"@click="clickDelete()" color='error'dark>删除该群</v-btn>
                        </v-flex>
                    </v-form>
                    </v-container>
            </v-flex>
            <v-flex xs12>
            </v-flex>
    </v-app>
</template>

<script>
export default {
  data (){
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title: "房间设置",
            imgSrc:"./static/img.jpg",
            drawer: null,
            room_id:1,

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
                v => (v && v.length <= 32) || 'Name must be less than 10 characters'
            ],
            description: '',
            // descriptionRules: [
            //     v => !!v || 'E-mail is required',
            //     v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            // ],
            chips: [],
            chooseCom:null,
            users:[
                // {
                //     id:'1212',
                //     icon:1,
                //     username:'fuck'
                // },
                // {
                //     id:'1212',
                //     icon:1,
                //     username:'fuck'
                // },
                // {
                //     id:'1212',
                //     icon:1,
                //     username:'fuck'
                // },
                // {
                //     id:'1212',
                //     icon:1,
                //     username:'fuck'
                // },
                // {
                //     id:'1212',
                //     icon:1,
                //     username:'fuck'
                // },
                // {
                //     id:'1212',
                //     icon:1,
                //     username:'fuck'
                // }
                
            ],
            isme:true,
            owner:'',
            myname:''

      }

  },
  methods:{
      getMe(){
           var self = this;
            self.$code.getUser().then(res =>{
                console.log('res',res)
                self.myname = res.data.payload.username;
                 if(self.myname != self.owner){
                     self.isme = false;
                } 
            }).catch(error =>{
                console.warn('fuck');
            });
      },
      getAll(){
          var self = this;
          self.$axios({
                method:'get',
                baseURL:self.$API.baseURL,
                url:self.$API.roomAPI + '/' + self.room_id +'/onlineUsers'
            }).then(res => {
                if(res.data.code == 1){
                    self.users = res.data.payload;
                    }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error)
            }); 
      },
      getRoomInfo(){
            var self = this;
            self.$axios({
                method:'get',
                baseURL:self.$API.baseURL,
                url:self.$API.roomAPI + '/' + self.room_id
            }).then(res => {
                if(res.data.code == 1){
                    self.name = res.data.payload.name;
                    self.description = res.data.payload.description;
                    self.chips = res.data.payload.tags;
                    self.owner = res.data.payload.username;
                    }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error)
            }); 
        },
        getIcon(item){
            var self = this;
            return self.$code.getIcon(item.icon);
        },
      deleteRoom(){
          var self = this;
            self.$axios({
                method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.deleteAPI + '/' + self.room_id,
                data:{}
            }).then(res => {
                if(res.data.code == 1){
                        self.$toast.center('删除成功～');
                        setTimeout(self.toBack2,2000);
                    }
                    else{
                        alert(self.$code.getCode(res.data.code));
                    }
                }).catch(error => {
                    console.warn('catch :');
                    console.log(error);
            }); 
      },
      clickDelete(){
           confirm('确定要删除该聊天室吗？删除后将不可恢复！')&& this.deleteRoom();
      },
    show(key){
        alert(key);
    },
    toBack(){
        var self = this;
        this.$router.push('/r/'+self.room_id);
    },
    toBack2(){
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
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    post(){
        var self = this;
        console.log(
            {
                "name":self.name,
                "description":self.description,
                "tags":self.chips
            }
        );
        self.$axios({
            method:'put',
            baseURL:self.$API.baseURL,
            url:self.$API.roomAPI+'/'+self.room_id,
            data:{
                "name":self.name,
                "description":self.description,
                "tags":self.chips
            }
        }).then(res =>{
            if(res.data.code == 1){
                    console.log(res.data)
                   self.$toast.center('修改房间 '+self.name +'信息成功～') 
                    setTimeout(self.toBack,2500);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
        }); 
    },
   
    opLeave(){
          var self = this;
          self.$axios({
              method:'delete',
              baseURL:self.$API.baseURL,
              url:self.$API.deleteAPI + '/' + self.room_id
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data)
                    self.$toast.center('离开房间 '+self.name +'成功～') 
                    setTimeout(self.toBack,2500);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
          }); 
      },
  },
  mounted(){
      var self = this;
      this.room_id = this.$route.params.roomid;
      self.getRoomInfo();
      self.getAll();
      self.getMe();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white-text{
    color:#FFFFFF
}
.avatars{
    padding:0 10px;
    float:left;:
    width:100%;
}
.the-avatar{
    float:left;
    width:25%;
    height:90px;
    text-align:center;
}
</style>
