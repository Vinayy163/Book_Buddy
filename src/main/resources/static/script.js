console.log("✅ script.js is loaded");

fetch("/books")
  .then(res => res.json())
  .then(data => {
    console.log("📘 Data fetched from backend:", data);
    renderBooks(data);
  })
  .catch(err => console.error("Fetch failed!", err));

function renderBooks(data) {
  const list = document.getElementById("bookList");
  const search = document.getElementById("search");

  function showBooks(filtered) {
    list.innerHTML = "";
    filtered.forEach(book => {
      list.innerHTML += `
        <div class="book-card">
          <img src="${book.cover_url}" class="book-cover" alt="${book.title}">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <a href="${book.download_url}" target="_blank" class="download-btn">📥 Download</a>
        </div>
      `;
    });
  }

  search.addEventListener("input", () => {
    const query = search.value.toLowerCase();
    const filtered = data.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    showBooks(filtered);
  });

  showBooks(data);
}
