//包含所有公共方法
import axios from 'axios';
export default {
    getCode(_code){
        switch(_code){
            case 0:
                return '重复的名称（0）';
                break;
            case 1:
                return '成功（1）';
                break;
            case 2:
                return '查询结果为空（2）';
                break;
            case 3:
                return '没有权限操作（3）';
                break;
            case 4:
                return '依赖的上一级不存在（4）';
                break;
            case 5:
                return '重复操作（5）';
            break;
            case 6:
                return '重复邮箱（6）';
            break;
            case 7:
                return '未激活（7）';
            break;
            case 8:
                return '邮箱或密码错误（8）';
            break;
            case 500:
                return '未知错误（500）';
                break;
            default:
                return '未记录的错误码 ：' + _code;
        }
    },
    getIcon(icon){
        switch(icon){
            case 1:
                return './static/img/1.jpg';
            break;
            case 2:
                return './static/img/2.jpg';
            break;
            case 3:
                return './static/img/3.jpg';
            break;
            case 4:
                return './static/img/4.jpg';
            break;
            case '1':
                return './static/img/1.jpg';
            break;
            case '2':
                return './static/img/2.jpg';
            break;
            case '3':
                return './static/img/3.jpg';
            break;
            case '4':
                return './static/img/4.jpg';
            break;
           
            default:
                return './static/img.jpg';
        }
    },
    getUser(){
        return axios({
            method:'get',
            // baseURL:'',
            url:'/currentUser',
            withCredentials: true,
            // url:'/static/article.json'
        });
    }
}