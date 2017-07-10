var urlTool = require('url');
var dataBase=require('./DB_server');
function queryAccount(account){
    var result = false;
    var data = dataBase.users;
    for(var i = 0,length = data.length; i<length ; i++){
        if(account === data[i].account){
            result = true;
        }
    }
    return result;
}

function login(account,password){
    var result = false;
    var data = dataBase.users;
    for(var i = 0,length = data.length; i<length ; i++){
        if(account === data[i].account && password===data[i].password){
            result = true;
        }
    }
    return result;
}

 function  server(req,res,next){
    var method = req.method,
        urlObj = urlTool.parse(req.url,true),
        pathName = urlObj.pathname,
        getObj=urlObj.query;

      if(method === 'GET'){
          switch(pathName){
              case '/':
                  res.setHeader('content-type','text/html;charset="utf-8"');
                  res.write('home');
                  res.end();
                  break;
              case '/index':
                  res.setHeader('content-type','text/html;charset="utf-8"');
                  res.write('index');
                  res.end();
                  break;
              case '/me':
                  res.setHeader('content-type','application/json;charset="utf-8"');
                  res.write('me');
                  res.end();
                  break;
              default :
                  res.setHeader('content-type','text/html;charset="utf-8"');
                  res.write('404');
                  res.end();
          }

      }else if(method === 'POST'){
          var postData = '';

          req.on('data',function(chunk){
              postData+=chunk;
          })

          req.on('end',function(){

              var arr = postData.split('&');
              var params= {};
              for(var i=0; i<arr.length; i++){
                  var itemArr = arr[i].split('=');
                  params[itemArr[0]] = itemArr[1]
              }
              switch(pathName){
                  case '/login':
                      var exist = queryAccount(params.account);
                      if(exist){
                          var success = login(params.account,params.password)
                          if(success){
                              res.write('{"state":"1"}')
                          }else{
                              res.write('{"state":"0"}')
                          }
                      }else{
                          res.write('{"state":"-1"}')
                      }
                      res.end();
                  break;
                  case '/register':
                  break;
                  default :
              }
          })
      }
 }


 module.exports=server