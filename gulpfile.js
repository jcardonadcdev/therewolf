var gulp = require("gulp");
var jshint = require("gulp-jshint");
var esrislurp = require("esrislurp");
var bower = require("gulp-bower");

var paths = {
  scripts: [
    "therewolf.js",
    "tests/*.js"
  ]
};

//Lint task
gulp.task("lint", function(){
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
});

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
gulp.task("default", ["lint"]);
