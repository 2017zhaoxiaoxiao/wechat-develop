const titbit = require('titbit');
const crypto = require('crypto');
const wxmsg = require('./msghandle');
const parsexml=require ('xml2js').parseString;
var app =new titbit();

app.router.post('/wx/msg',async c=>{
    try{
        let data =await new Promise((rv,rj)=>{
            parsexml(c.body,{explicitArray:false},
            (err,result)=>{
                if(err){rj(err);}
                else{rv(result.xml);}
            });
        });
        let retmsg={
            touser:data.FromUserName,
            fromuser:data.ToUserName,
            msgtype:'',//为空，在处理
            msgtime:parseInt(Date.now()/1000),
            msg:data.Content
        };
        //交给信息派发函数处理
        //把解析的消息和要返回的数据对象传递下去
        c.res.body=wxmsg.msgDispatch(data,retmsg);

    }catch(err){
        console.log(err);
    }
});

app.run(8005, 'localhost');


