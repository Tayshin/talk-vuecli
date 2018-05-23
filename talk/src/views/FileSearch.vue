<template>    
    <v-app id="inspire">
        <v-layout row>
        <v-flex xs12>
            <v-card>
            <v-toolbar color="primary" dark>
                <v-btn icon @click="toBack()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>
                <v-text-field
                    style="flex-basis: 75%;"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
                    @change="searching(search)"
                ></v-text-field>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar> 
            </v-card>
        </v-flex>
        
        </v-layout>
        <v-flex xs12>
          <!--<v-list subheader>
            <v-list-tile avatar v-for="item in solution" :key="item.id" @click="toDetail(item)">
              <v-list-tile-content>
                <v-list-tile-title v-html="item.name"></v-list-tile-title>
              </v-list-tile-content>
             
            </v-list-tile>
          </v-list>-->
          <div>
            <v-data-table
                :headers="headers"
                :items="desserts"
                :pagination.sync="pagination"
                hide-actions
                class="elevation-1"
            >
                <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                    <span slot="activator">
                    {{ props.header.text }}
                    </span>
                    <span>
                    {{ props.header.text }}
                    </span>
                </v-tooltip>
                </template>
                <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.username }}</td>
                <td class="text-xs-left" style="padding:0 10px;">{{ props.item.createdAt }}</td>
                <td class="justify-center layout">
                    <v-btn icon class="mx-0" @click="downloadItem(props.item)">
                    <v-icon color="teal">file_download</v-icon>
                    </v-btn>
                </td>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
            </div>
        </div>
      </v-flex>
    </v-app>
</template>

<script>
export default {
  data (){
      return {
            //当前标题，可选conversation， people， 对应社区名
            Title:"",
            imgSrc:"./static/img.jpg",
            drawer: null,
            search:'',
            solution: [
                {
                    name:'1',
                    id:1
                }  
            ],
            pagination: {},
            selected: [],
            headers: [
            {
                text: '文件名',
                align: 'left',
                sortable: false,
                value: 'name'
            },
            { text: '所有者', value: 'username' ,sortable: false},
            { text: '上传时间', value: 'createdAt' },
            { text: '操作', value: 'name',sortable: false },
            
            ],
            desserts: [
            // {
            //     name: 'format',
            //     username: 'hxh',
            //     createdAt:'2018-5-10',
            //     description:'fuckyou',
            //     id:1
            // }
            ]
      }
  },
  methods:{
        show(key){
            alert(key);
        },
        toBack(){
            var self = this;
            this.$router.push('/file');
        },
        toDetail(_item){
            this.$router.push('/f/'+_item.id);
        },
        downloadItem(_item){
            var self = this;
            // self.$axios({
            //     method:'get',
            //     baseURL:self.$API.baseURL,
            //     url:self.$API.downloadAPI + '/' +item.id,
            // }).then(res => {
            //         alert('即将开始下载');
            // }).catch(error => {
            //     console.warn('catch :');
            //     console.log(error)
            // }); 
            window.open(self.$API.baseURL+self.$API.downloadAPI + '/'+_item.id,)
        },
        searching(_info){
            var self = this;
            self.$axios({
                method:'get',
                baseURL: self.$API.baseURL,
                url:self.$API.sourceAPI + '?info=' + _info + '&pageNum=1&pageSize=10'
                // url: '/static/search.json'
            }).then(res => {
                if(res.data.code == 1){
                    console.log(res.data.payload.list)
                    self.desserts = new Array();
                    self.desserts = self.desserts.concat(res.data.payload.list)
                    //还是concat比较好
                    // for(var item in res.data.payload.list){
                    //     // self.solution.push(res.data.payload.list[item]);
                    // }
                    console.log(self.desserts)
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
   computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
  
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
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
