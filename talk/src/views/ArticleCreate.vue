<template>
<v-app id="inspire" style="background-color:#fff;" class="special">
    <v-layout row>
    <v-flex xs12>
        <v-toolbar color="primary" dark fixed>
            <v-btn icon @click="toBack()">
                <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>撰写文章</v-toolbar-title>
            <v-spacer></v-spacer>


            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-btn icon slot="activator" @click="checkAlook()"color="primary" dark><v-icon>bookmark_outline</v-icon></v-btn>
                <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click.native="dialog = false">
                        <v-icon >close</v-icon>
                    </v-btn>
                    <v-toolbar-title>预览</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-flex xs12 style="padding:10px 16px; font-size:22px; font-weight:bold;">
                    <label>{{texting}}</label>
                </v-flex>
                <v-flex id="hxh"style="padding:0 16px; font-size:18px;">
                    <div id="md"></div>
                </v-flex>
                </v-card>
            </v-dialog>


              <v-btn icon :disabled="!valid" @click="submit()">
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
        <v-flex xs12 style="background-color:#fff;">
         <v-select 
                id="the-key"
                label="关键字"
                chips
                outline="true"
                tags
                solo
                append-icon=""
                clearable
                v-model="chips"
                style="background-color:#fff;border-radius:0;box-shadow:0 0 0 #fafafa"
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
            </v-flex>
        <v-flex xs12 class="text-place" style="height:100%;">
        
             <v-text-field
                  name="input-1"
                  label="文章内容"
                  v-model="content"
                  textarea
                ></v-text-field>
        </v-flex>
        
      </v-layout>
    </v-container>
    <v-btn
        fixed
        dark
        fab
        bottom
        right
        color="pink"
        @click="clickPic()"
        >
                <v-icon>dashboard</v-icon>
    </v-btn>
    <v-dialog v-model="dialog2" max-width="290">
        <v-card>
        <v-card-title class="headline">选择上传的图片</v-card-title>
        <v-container>
        <input type="file" class="file" id="file" ref="file"/>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="addPic()">添加</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</v-app>
</template>

<script>
export default {
  data () {
    return {
        msg: '',
        imgSrc:'./static/img.jpg',
        //文章标题
        texting:'',
        textRules:[
                    v => !!v || 'required'
        ],
        valid: true,
        //文章内容
        content:'',
        chips:[],
        dialog:false,
        dialog2:false,
        //返回的文章id
        idx:1
    }
  },
  methods:{
        guid(){
            var self = this;
            return self.s4() + self.s4() + '-' + self.s4() + '-' + self.s4() + '-' + self.s4() + '-' + self.s4() + self.s4() + self.s4();
        },
        s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        },
      show(key){
          alert(key);
      },
      toBack(){
          var self = this;
          this.$router.push('/article');
      },
      toBack2(){
          var self = this;
          this.$router.push('/a/'+self.idx);
      },
      submit(){
          var self = this;
          if(self.texting == ""){
              self.$toast.center('文章名称不能为空～');
          } else if(self.content == ""){
              self.$toast.center('文章内容不能为空～');
          } else {
              self.post();
          }
      },
      post(){
          var self = this;
          console.log(self.texting,self.content);
          self.$axios({
              method:'post',
              baseURL:self.$API.baseURL,
              url:self.$API.articleAPI,
              data:{
                  "name":self.texting,
                  "description":'',
                  "tags":self.chips,
                  "content":self.content,
                  "parseType":1
              }
              // withCredentials: true
              // url:'/static/conversation.json'
          }).then(res => {
             if(res.data.code == 1){
                    self.$toast.center('发表成功～');
                    self.idx = res.data.payload.id;
                    setTimeout(self.toBack2,3000);                    
                }
                else{
                    self.$toast.center(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error);
          }); 
      },
      checkAlook(){
          var self = this;
            var fuck = this.$markdown.markdown.toHTML(self.content)
            var x = document.getElementById('md');
            x.innerHTML=fuck;
      },
      clickPic(){
          var self = this;
          self.dialog2 = true;
      },
      addPic(){
          var self = this;
          var self = this;
          var str = '';
            var form = new FormData();
            var file = self.$refs.file.files[0];
            console.log(file);
            if(file){
                form.append("name",self.guid());
                form.append("type",1);
                form.append("description",'');
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
                            str = "\n![img](upload/" + res.data.payload.addr + ")";
                            self.content = self.content + str;
                            self.dialog2 = false;
                        }
                        else{
                            alert(self.$code.getCode(res.data.code));
                        }
                    }).catch(error => {
                        console.warn('catch :');
                        console.log(error)
                }); 
            }
            else{
                self.$toast.center('请先选择图片');
                
            }
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
    width:100%;
}
.text-place{
    padding:7px 0 0;

}
.text-place .primary--text{
    min-height:125%;
    background-color: #fff !important;
}
#the-key{

}
#inspire .input-group__input{
    background-color: #fff !important;
}
#inspire .speed-dial {
    position: fixed !important;
    text-align:center;
}
#inspire .btn__content .icon {
    position:absolute !important;
    top:25% !important;
}
#hxh img{
    width: 100%;
}
</style>
