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
            <v-flex xs12 >
                    <v-container style="margin-top:50px;">
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
                        <!--<v-flex xs12>
                            <v-btn block @click="clear">clear</v-btn>
                        </v-flex>-->
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
            items: [
                { name: 'State 1' },
                { text: 'State 2' },
                { text: 'State 3' },
                { text: 'State 4' },
                { text: 'State 5' },
                { text: 'State 6' },
                { text: 'State 7' }
            ],
            chooseCom:null
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
                    alert('Created Room:'+ self.name);
                    self.toBack();
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
        }); 
    },
    getCom(){
        var self = this;
          self.$axios({
              method:'get',
              baseURL:self.$API.baseURL,
              url:self.$API.mainAPI + '?pageNum=1&pageSize=10'
            //   url:'/static/main.json'
          }).then(res => {
             if(res.data.code == 1){
                    console.log(res.data.payload.list)
                    self.items = new Array();
                    self.items = self.items.concat(res.data.payload.list)
                    console.log(self.communities);
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            });  
    }
  },
  mounted(){
      var self = this;
      this.room_id = this.$route.params.roomid;
      self.getCom();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.white-text{
    color:#FFFFFF
}
</style>
