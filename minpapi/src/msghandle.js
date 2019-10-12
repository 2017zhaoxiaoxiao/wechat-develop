const formatMsg =require('./fmtwxmsg');
function help(){
    //字符串形式返回信息
    //还可以以读取文件的形式来返回
    return `你好，这是一个测试号，目前会返回用户输入的信息，暂不支持`
}
//接收参数
// @param{object}wxmsg 解析XML消息的对象
// @param{object}retmsg 要返回的数据对象
function userMsg(wxmsg,retmsg){
    if(wxmsg.MsgType=='text'){
        switch(wxmsg.Content){
            case '帮助':
            case 'help':
            case '?':
                retmsg.msg=help();
                retmsg.msgtype='text';
                return formatMsg(retmsg);
            case 'about':
                retmsg.msgtype='text';
                retmsg.msg='我是这个测试好的开发者';
                return formatMsg(retmsg);
            case 'who':
                retmsg.msgtype='text';
                retmsg.msg='学号：2017011901;姓名：赵肖肖;班级：2017级5班';
                return formatMsg(retmsg);

            default:
                    retmsg.msgtype=wxmsg.MsgType;
                    retmsg.msg=text.Content;
                    return formatMsg(retmsg);

        }
    }
    //处理其他类型
    switch(wxmsg.MsgType){
        case 'image':
        case 'voice':
                retmsg.msgtype=wxmsg.MsgType;
                retmsg.msg=wxmsg.MediaId;
                return formatMsg(retmsg);
        default:
            //retmsg.msgtype 类型为空
            //格式化数据会返回default处的数据
            //提示该用户该类型不被支持
            retmsg.msg = '不支持的类型';
    }
    return formatMsg(retmsg);
}
exports.help=help;
exports.userMsg=userMsg;

exports.msgDispatch = function msgDispatch(wxmsg,retmsg){
    return userMsg(wxmsg,retmsg);
}