var AWS = require('aws-sdk');
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;
var mime = require('mime-types');
var zopfli = require('node-zopfli');
var minimist = require('minimist');
var options = minimist(process.argv);
/**
 * building the bundle
 */

var bucketName = 'www.tcdl.io';
var bucketfolder = 'utils/tracey';

gulp.task('deploy', function () {
  return deploy();
});

function deploy () {
  return exec('npm run build:prod', function (error, stdout, stderr) {
    if (error === null) {
      var s3 = new AWS.S3({region: 'eu-west-1'});
      var filesToUpload = fs.readdirSync(__dirname + '/dist');

      console.log('>>>>>>>>> Files:', filesToUpload);
      console.log('>>>>>>>>> Bucket folder', bucketfolder);

      filesToUpload.forEach(function (filename) {
        var ContentType = mime.contentType(filename);
        var params = {
          Bucket: bucketName,
          Key: bucketfolder + '/' + filename,
          Body: zopfli.gzipSync(fs.readFileSync(__dirname + '/dist/' + filename), {
            numiterations: 15,
            blocksplitting: true
          }),
          ContentType,
          ContentEncoding: 'gzip'
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!', err);
          else console.log('Object ' + params.Key + ' was created!');
        });
      });
    }
  });
}
