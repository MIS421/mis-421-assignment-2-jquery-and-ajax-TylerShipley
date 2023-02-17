var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "ef741bb0bc3b49ba912b39ae6721c091");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}

$(document).ready(function () {
    $('#h1').click(function () {
        $('body').css('background-image', 'url(https://images.unsplash.com/photo-1537063302812-87f3e0d7a6fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)');
    });

    $('#searchButton').click(function () {
        apiSearch();
    });

    $('#timeButton').click(function () {
        var current = new Date();
        var hour = current.getHours()
        var minute = current.getMinutes()
        var currentTime = hour+":"+minute;
        $('#time').html(currentTime);
        $("#time").dialog();
    });
});