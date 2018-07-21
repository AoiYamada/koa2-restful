var gulp = require('gulp'),
    apidoc = require('gulp-apidoc');

gulp.task('apidoc', function(done){
          apidoc({
            src: "app/",
            dest: "doc/"
          },done);
});