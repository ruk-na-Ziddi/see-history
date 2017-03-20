// Refered to google's documetation.
function onSearchClick(){
  clearResult('history_container');

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

function clearResult(divId){
  var container = document.getElementById(divId);
  container.innerHTML = '';
}

function showLastSearches(divId, historyItems){
  var container = document.getElementById(divId);

  for(var itemIndex = 0; itemIndex < historyItems.length; itemIndex++){
    var link = document.createElement('a');
    link.href = historyItems[itemIndex].url;
    link.innerHTML = historyItems[itemIndex].title;
    link.setAttribute('target', '_blank');

    var para = document.createElement('p');
    para.appendChild(link)

    container.appendChild(para);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById("search")
  searchButton.addEventListener("click", onSearchClick);
});
