function search() {
   var searchQuery = document.getElementById("searchInput").value;
   var searchUrl = "suche.html?q=" + encodeURIComponent(searchQuery);
   window.location.href = searchUrl;
}