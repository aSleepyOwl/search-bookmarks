document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');

    searchInput.focus();

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        results.innerHTML = '';

        if (query) {
            chrome.bookmarks.search(query, function (bookmarks) {
                bookmarks.forEach(function (bookmark) {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = bookmark.url;
                    a.target = '_blank';
                    a.innerHTML = highlightMatch(bookmark.title, query);
                    li.appendChild(a);
                    results.appendChild(li);
                });
            });
        }
    });

    function highlightMatch(text, query) {
        const index = text.toLowerCase().indexOf(query);
        if (index >= 0) {
            return text.slice(0, index) + '<span class="highlight">' + text.slice(index, index + query.length) + '</span>' + text.slice(index + query.length);
        }
        return text;
    }
});
