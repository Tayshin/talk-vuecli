//配置文件，包含所有接口信息
export default {
    //baseURL 服务器根目录
    //searchAPI 搜索房间接口
    //mainAPI 查看社区列表
    //获取历史房间
    baseURL:'http://localhost:8080',
    // baseURL:'http://192.168.1.116:8888',
    searchAPI:'/room',
    mainAPI:'/home',
    conversationAPI:'/historyRooms',
    communityAPI:'/home',
    deleteAPI:'/room',
    settingAPI:'room',
    homeAPI:'/home',
    roomAPI:'/room',
    sourceAPI:'/source',
    downloadAPI:'/source/download',
    columnAPI:'/column',
    articleAPI:'/article',
    articlesAPI:'/articles',
    collectAPI:'/collectedArticles'
}