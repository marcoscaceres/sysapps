(function() {
    'use strict';
    window.addEventListener('DOMContentLoaded', loadIssues);

    //load issues from Github using JSONP
    function loadIssues() {
        var org = 'sysapps',
            repo = '',
            callback = 'processResponse',
            url = '//api.github.com/repos/',
            script = document.createElement('script');
        url += org + '/' + repo + '/issues?state=open&amp;callback=' + method;
        script.src = url;
    }

    window.processResponse = function(obj) {
        var issue, issues = obj.data,
            issues_html = '<li>No issues are open. Yay!</li>',
            msg;
        if (issues.errors) {
            msg = 'There was a problem getting the issues from github: ';
            console.warn(msg, issues.message, issues.errors);
            return;
        }
        if (issues && issues.length > 0) {
            issues_html = '';
            for (var i = 0; i < issues.length; i++) {
                issue = issues[i];
                var labelcount = issue['labels'].length,
                    assigned = issue['assignee'] ? "<b class='meta'><span>Assigned:</span> <a href='" + issue['assignee'].url + "'>" + issue['assignee'].login + '</a></b>' : '',
                    labels = [];
                if (labelcount !== 0) {
                    for (var j = 0; j < labelcount; j++) {
                        labels.push("[ <b style='color: #" + issue['labels'][j].color + "'>" + issue['labels'][j].name + '</b> ]');
                    }
                }
                issues_html += '<li><a href="' + issue['html_url'] + '">Issue ' + issue['number'] + '</a> - ' + issue['title'] + assigned + (labelcount ? "<b class='meta'><span>Labels:</span> " + labels.join(' ') + '</b>' : '') + '</li>';
            }
        }
        issues_html = '<ul>' + issues_html + '</ul>';
        document.getElementById('open-issues-xhr').innerHTML = issues_html;
    };
}());
