function new_api() {
    $.getJSON("https://talaikis.com/api/quotes/random/", function(a) {
      $("#quoteBody").html(
        "<p>" + a.quote + "</p>" + "<p align='right'>&mdash; " + a.author + "</p>"
      );
      var b = document.getElementById("postTweet");
      b.href = "http://twitter.com/home/?status=" + a.quote;
    });
}
  
function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
    document.body.style.color = bgColor;
    document.getElementById("newQuote").style.backgroundColor = bgColor;
}

$(document).ready(function() {
    new_api();
    random_bg_color();
    $(".btn").click(function() {
        new_api();
        random_bg_color();
    });
});
  