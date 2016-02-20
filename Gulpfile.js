////////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////////
'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');
var rimraf = require('gulp-rimraf');
var eslint = require('gulp-eslint');
var spawn = require('child_process').spawn;
var browserify = require('gulp-browserify');
var deploy = require("gulp-gh-pages");
var cp = require('child_process');
var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var node;

////////////////////////////////////////////////////////////////////////////////////
// Tasks
////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-js', function() {
	return gulp.src(['src/javascript/**/*.js', '!src/javascript/conf/config.js'])
	.pipe(babel())
	.pipe(gulp.dest('build'));
});

gulp.task('build-sources', function(callback) {
	runSequence('build-js', callback);
});

gulp.task('copy-assets', function() {
  return gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest('build/public/'));
});

gulp.task('clean-build', function() {
	return gulp.src('build', {read: false})
	.pipe(rimraf());
});

gulp.task('clean-scripts', function() {
	return gulp.src('build/**/*.js', {read: false})
	.pipe(rimraf());
});

// default gulp task
gulp.task('default', function(callback) {
	runSequence('build', callback);
});

gulp.task('eslint', function() {
  return gulp.src(['**/*.js', '!node_modules/**', '!build/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('exec', function() {
	if (node) node.kill()
		node = spawn('node', ['build/main.js'], {stdio: 'inherit'})
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});

gulp.task('browserify', function() {
	return gulp.src(['build/exports.js'])
		.pipe(browserify({
		  insertGlobals: true,
		  debug: !gulp.env.production
		}))
		.pipe(gulp.dest('./build/public/js/'))
});

gulp.task('build', ['clean-build'], function(callback) {
	runSequence('build-sources', 'copy-assets', 'browserify', callback);
});

/**
 * Tests
 */

gulp.task('copy-test-data', function() {
	return gulp.src('test/data/**/*')
	.pipe(gulp.dest('build/test/data'));
});

gulp.task('build-tests', ['copy-test-data'], function() {
	return gulp.src('test/**/*.js')
	.pipe(babel())
	.pipe(gulp.dest('build/test'));
});

gulp.task('mocha-tests', ['build-tests'], function() {
	return gulp.src(['build/test/*Test.js'])
	.pipe(mocha({timeout: 5000}))
	.once('error', function(err) {
		process.exit(1);
	})
	.once('end', function() {
		process.exit(0);
	});
});

gulp.task('launch-tests', function(callback) {
	runSequence('build', 'build-tests', 'mocha-tests', callback);
});


/**
 * Watch
 */

gulp.task('watch', ['build'], function(callback) {
	runSequence('exec', callback);

  	//build my sources
  	gulp.watch(['src/javascript/**/*.js'], ['build-sources']);

  	// Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at
  	// ChildProcess.spawn`
  	gulp.watch('build/main.js', function() {
  		runSequence('exec', callback);
  	});
});

/**
 * Build the Jekyll Site
 */

gulp.task('jekyll-build', function (done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./build/public/**/*")
        .pipe(deploy());
});
