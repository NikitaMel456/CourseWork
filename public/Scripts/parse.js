'use strict';
function post() {
    $(document).ready(function () {

        var id = getUrlParameter('id');
        $.getJSON("/api/posts/"+id, function (data, textStatus, jqXHR) {
            var out = "";
            for (let key in data) {
                if (key == 'Title' || key == 'content' || key == 'City' || key == 'Salary' || key == 'Author' || key == 'publishedOn') {
                    out += ( key + ": " + data[key] + "<br>");
                    $("div").html(out);
                }
            }
            document.writeln("<br>"+out);
        })

    });
}