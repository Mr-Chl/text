

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var server = require('./server');


var option = {
	port:8000,
	middleware:function(req,res,next){
       server(req,res,next)
	}
};


gulp.task('data',function(){
    gulp.src('gulp')
         .pipe(webserver(option))
})


gulp.task('default',['data'])

