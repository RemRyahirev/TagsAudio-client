/**
 * Created by Rem on 06.02.2015.
 */

global.$ = $;

var path = require('path');
var gui = require('nw.gui');
var shell = gui.Shell;
/** @type {Sync} */
var sync = require('process_tags')(['E:\\Music\\5nizza']);

function renderDirectories() {
    var list = $('#pathList');
    var html = [];

    sync.dirs.forEach(function(item) {
        html.push('<li class="list-group-item">' + item + '</li>');
    });

    list.find('li').remove().end().html(html.join(''));
}

function exitApplication() {
    gui.App.quit();
}

$(document).ready(function() {
    renderDirectories();

    $('.btn-file :file').on('dirselect', function(event, dirPath) {
        var input = $(this).parents('.input-group').find(':text');

        input.val(dirPath);
    });

    $('#addDirectory').on('hidden.bs.modal', function(e) {
        var input = $(this).find(':text');
        $('#addDirectoryPath').attr('nwworkingdir', input.val());
        input.val('');
    });

    $('#btnAddDirectory').on('click', function(event) {
        var modal = $('#addDirectory'),
            dirPath = modal.find(':text').val();

        sync.dirs.push(dirPath);
        renderDirectories();
        modal.modal('hide');
    });

    $('#btnSynchronize').on('click', function(event) {
        var btn = $(this);
        btn.addClass('disabled').find('i').addClass('fa-spin');
        var pb = $('#progressRow').removeClass('hide').find('.progress-bar');

        sync.process(function(task, percent) {
            percent = parseInt(percent);
            $('#progressRow').find('h4').html(task + '...');
            pb.attr('aria-valuenow', percent).css('width', percent + '%').html(percent + '%');
        }, function() {
            btn.removeClass('disabled').find('i').removeClass('fa-spin');
            $('#progressRow').addClass('hide').find('h4').html('Initing...');
        });
    });
});

$(document).on('change', '.btn-file input', function() {
    var input = $(this),
        dirPath = input.get(0).files[0].path;

    input.trigger('dirselect', [dirPath]);
});