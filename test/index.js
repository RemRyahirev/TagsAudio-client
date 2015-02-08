/**
 * Created by Rem on 08.02.2015.
 */

var util = require('util');

var sync = require('../node_modules/process_tags')(['E:\\Music\\']);
//var sync = require('../node_modules/process_tags')(['E:\\Music\\5nizza']);
//var sync = require('../node_modules/process_tags')(['E:\\Music\\5nizza\\2005 - O5\\']);
//var sync = require('../node_modules/process_tags')(['c:\\Node\\tagsaudio-client\\test\\']);

var startTimer = Date.now();
var timer = function() {
    var now = Date.now();
    var msec = now - startTimer;
    var sec = parseInt(msec / 1000); msec -= sec * 1000;
    var min = parseInt(sec / 60); sec -= min * 60;
    var hr = parseInt(min / 60); min -= hr * 60;

    return '' + ('0' + hr).slice(-2) + ':' + ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2) + '.' + ('00' + msec).slice(-3) + ' ';
};


console.log(timer() + '********** START **********');
console.log('');

sync.process(function(task, percent) {
    console.log(timer() + ' *** PROGRESS *** task - ' + task +  ' : ' + parseInt(percent) + '%');
}, function(err, results) {
    console.log('');
    console.log(timer() + '********** DONE **********');

    console.log('');
    if (err) {
        console.log('error = ');
        console.log(err);
    } else {
        //for (var filename in results.process) {
        //    if (!results.process.hasOwnProperty(filename)) {
        //        continue;
        //    }
        //    var res = results.process[filename];
        //
        //    console.log(filename + ' => ' + res.author + ': ' + res.year + ' - ' + res.album + ': ' + res.trackNumber + ' - ' + res.title);
        //}

        //util.puts("\nResults:\n-----\n" + util.inspect(results, {
        //    depth  : 5,
        //    colors : true
        //}));

        //console.log('results = ');
        //console.log(results);
    }
});