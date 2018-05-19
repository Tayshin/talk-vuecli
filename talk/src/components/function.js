//包含所有公共方法
export default {
    getCode(_code){
        switch(_code){
            case 0:
                return '0 invalid name';
                break;
            case 1:
                return '1 success';
                break;
            case 2:
                return '2 empty';
                break;
            case 3:
                return '3 not authorized';
                break;
            case 4:
                return '4 upper level does not exit';
                break;
            case 500:
                return '500 error unknown';
                break;
            default:
                return 'the error was not recorded:' + _code;
        }
    }
}