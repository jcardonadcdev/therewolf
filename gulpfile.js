var gulp = require("gulp");
var esrislurp = require("esrislurp");
var bower = require("gulp-bower");

gulp.task("download-esri-api", function(cb) {
  esrislurp("tests/libs/esri", "3.13", true, function(){
    console.log("Downloaded JS API")
  }, function(err){
    console.log("Error downloading JS API: ", err);
  });
});

gulp.task("bower", function(){
  bower();
});

gulp.task("setup", ["bower", "download-esri-api"]);
