function getSearch(searchTerm) {
    $.ajax({
      url:
        "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" +
        searchTerm,
      dataType: "jsonp",
      type: "GET",
      success: function(data) {
        parseApi(data);
      }
    });
  }
  
//This function will iterate through the api JSON
function parseApi(data) {
    var combinedHtml = "";
    $.each(data.query.pages, function(key, value) {
        $(
        "<a class='col-8' id='results' href='" +
            "https://en.wikipedia.org/?curid=" +
            value.pageid +
            "'><div><h3>" +
            value.title +
            "</h3><p>" +
            value.extract +
            "</p></div></a>"
        ).appendTo("#allResults");
    });
}
  
function createContents() {
    document.getElementById("allResults").innerHTML = "";
    var contents = $("#theForm").val();
    getSearch(contents);
}
  
$(document).ready(function() {
    document.getElementById("getWiki").onclick = function() {
        createContents();
    };

    document.getElementById("clearContents").onclick = function() {
        document.getElementById("allResults").innerHTML = "";
    };

    $("#theForm").keypress(function(e) {
        if (e.which == 13) {
        createContents();
        }
    });
});