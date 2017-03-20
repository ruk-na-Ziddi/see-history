// Refered to google's documetation to see how to read history.
function onSearchClick(){
  var latestHistoryItems = [];
  var entered_text = document.getElementById("user_input").value;

  var query = {
    'text' : entered_text,
    'maxResults' : 5
  }

  var listLatestHistoryItems = function(historyItems){
    for(var historyIndex = 0; historyIndex < historyItems.length; historyIndex++){
      let title = historyItems[historyIndex].title || "search results";
      let url = historyItems[historyIndex].url;
      latestHistoryItems.push({'title': title, 'url': url});
    }
    showLastSearches('history_container', latestHistoryItems);
  }

  chrome.history.search(query, listLatestHistoryItems);

}

function showLastSearches(divId, historyItems){
  var container = document.getElementById(divId);
  var htmlString = '';

  for(var itemIndex = 0; itemIndex < historyItems.length; itemIndex++){
    htmlString += "<p><a href=" + historyItems[itemIndex].url + " target=\"_blank\">"+ historyItems[itemIndex].title +"</a></p>"
  }

  container.innerHTML = htmlString;
}

document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById("search")
  searchButton.addEventListener("click", onSearchClick);
});
