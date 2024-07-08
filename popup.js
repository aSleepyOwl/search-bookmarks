document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');

    // 聚焦搜索输入框
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
                    a.textContent = bookmark.title;
                    a.target = '_blank';
                    li.appendChild(a);
                    results.appendChild(li);
                });
            });
        }
    });
});
