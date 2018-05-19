<template>
  <v-app id="inspire">
      <v-toolbar color="primary" fixed dark>
        <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn icon slot="activator">
                <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-card>
          <v-card-title class="headline">你想要切换账号吗？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="dialog = false">取消</v-btn>
            <v-btn color="green darken-1" flat @click="toBack()">是的</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        <v-toolbar-title class="white--text">主菜单</v-toolbar-title>
        <v-spacer></v-spacer>
        
      </v-toolbar>
      <div id="menu-card">
        <v-container
          fluid
          style="min-height: 0;"
          grid-list-lg
        >
          <v-layout row wrap >
            <v-flex xs12 @click="toChat()">
              <v-card color="primary" class="white--text" @click="show()">
              <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs12>
                      <div>
                        <div class="headline">聊天室</div>
                        <div>和开发者们在线交流</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>

              </v-card>
            </v-flex>
            <v-flex xs12 @click="show(2)">
              <v-card color="cyan darken-2" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs12>
                      <div>
                        <div class="headline">文章区</div>
                        <div>分享你的知识和简介</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
            <v-flex xs12 @click="show(3)">
              <v-card color="green" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs12>
                      <div>
                        <div class="headline">资源区</div>
                        <div>分享是发展的原动力</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>

            <!-- <v-flex xs12>
              <v-card color="green" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="headline">更多功能...</div>
                        <div>敬请期待</div>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex> -->
          </v-layout>
        </v-container>
      </div>
  </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        msg: '',
        dialog: false
    }
  },
  methods:{
        show(_id){
            var self = this;
            switch(_id){
                case 1:
                    self.$router.push('/main/conversations');
                break;
                case 2:
                    self.$router.push('/article');
                break;
                case 3:
                    self.$router.push('/file');
                break;
                default: 

            }
        },
        toBack(){
            this.$router.push('/login');
        },
        toChat(){
            this.$router.push('/main/conversations');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#menu-card {
    margin-top:56px;
}
</style>
