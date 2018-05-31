<template>
<v-app id="inspire" class="special">
    <v-layout row>
    <v-flex xs12>
        <v-card>
        <v-toolbar color="primary" dark>
        
            <v-btn icon @click="toBack()">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{Title}}</v-toolbar-title>
            <v-spacer></v-spacer>
              <v-btn icon @click="toSearch()">
                  <v-icon>search</v-icon>
              </v-btn>
        </v-toolbar>

        </v-card>
    </v-flex>
    
    </v-layout>
        <v-flex xs12 >
           <div style="height:100%;">
            <v-data-table
                :headers="headers"
                :items="desserts"
                :pagination.sync="pagination"
                hide-actions
                class="elevation-1"
                style=""
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
                    <v-btn icon class="mx-0" @click="deleteItem(props.item)">
                    <v-icon color="red">delete</v-icon>
                    </v-btn>
                </td>
                </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
                <v-pagination v-model="pagination.page" :length="pages" circle></v-pagination>
            </div>
        </div>
      </v-flex>
    <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <v-btn
          slot="activator"
          color="primary"
          dark
          fab
          hover
          v-model="fab"
        >
          <v-icon>add</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="primary darken-2"
          @click="toFileUp()"
        >
          <v-icon>cloud_upload</v-icon>
        </v-btn>
      </v-speed-dial>
</v-app>
</template>

<script>
export default {
  data () {
    return {
        msg: '',
        Title:'资源区',
        direction: 'top',
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: false,
        right: true,
        bottom: true,
        left: false,
        transition: 'slide-y-reverse-transition',
        pagination: {
            page:1
        },
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
            {
                name: 'format',
                username: 'hxh',
                createdAt:'2018-5-10',
                description:'fuckyou',
                id:1
            }
            
            ]
    }
  },
  methods:{
      show(key){
          alert(key);
      },
      toBack(){
          this.$router.push('/menu');
      },
      toSearch(){
          this.$router.push('/file-search');
      },
      toFileUp(){
          this.$router.push('/file-up')
      },
      deleteItem(item){
          var self = this;
            const index = this.desserts.indexOf(item)
            confirm('你确定要删除这个文件吗?') && this.desserts.splice(index, 1);
            self.$axios({
                method:'delete',
                baseURL:self.$API.baseURL,
                url:self.$API.sourceAPI + '/' + item.id
            }).then(res => {
                if(res.data.code == 1){
                    console.log('delete success');
                }
                else{
                    alert(self.$code.getCode(res.data.code));
                }
            }).catch(error => {
                console.warn('catch :');
                console.log(error)
            }); 
      },
      downloadItem(_item){
          var self = this;
        //   self.$axios({
        //         method:'get',
        //         baseURL:self.$API.baseURL,
        //         url:self.$API.downloadAPI + '/'+_item.id,
        //     }).then(res => {
        //             alert('即将开始下载');
        //     }).catch(error => {
        //         console.warn('catch :');
        //         console.log(error)
        //     }); 
        window.open(self.$API.baseURL+self.$API.downloadAPI + '/'+_item.id,)
      },
      getMyFiles(){
            var self = this;
            self.$axios({
                method:'get',
                baseURL:self.$API.baseURL,
                url:'mySources?pageNum=1&pageSize=10',
                // url:'/static/source.json'
            }).then(res => {
                if(res.data.code == 1){
                    console.log(res.data.payload)
                    self.desserts = new Array();
                    self.desserts = self.desserts.concat(res.data.payload.list)
                    console.log(self.desserts);
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
      self.getMyFiles();
   
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
#inspire .white-text{
    color:#FFFFFF
}
#inspire {
    position:absolute;
    width:100%;
}
#inspire .speed-dial {
  position: fixed !important;
  text-align:center;
}

#inspire .speed-dial .icon {
  position:absolute;
  top:25%;
}
</style>
