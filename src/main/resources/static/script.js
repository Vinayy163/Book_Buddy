console.log("✅ script.js is loaded");

fetch("/books")
  .then(res => res.json())
  .then(data => {
    console.log("Data fetched from backend:", data);
    renderBooks(data);
  })
  .catch(err => console.error("Fetch failed!", err));

function renderBooks(data) {
  const list = document.getElementById("bookList");
  const search = document.getElementById("search");
  const genrebtns=document.querySelectorAll(".genre-btn");
  const openBtn = document.getElementById("open-sidebar");
  const closeBtn = document.getElementById("close-sidebar");
  const sidebar = document.getElementById("genre-sidebar");

  let currentGenre="All";
  let opened=true;

  function showBooks(filtered) {
    list.innerHTML = "";
    if(filtered.length==0){
      innerHTML="<p> No Books Found -_- <p>";
      return;
    }
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

  openBtn.addEventListener("click",()=>{
    sidebar.classList.add("open");
    opened=!opened;
    if(opened){
      sidebar.classList.remove("open");
    }
  });

  closeBtn.addEventListener("click",()=>{
    sidebar.classList.remove("open");
    opened=!opened;
  });

  function filterBooks(){
    const query = search.value.toLowerCase();
    const filtered = data.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    
    if(currentGenre!="All"){
      filtered=filtered.filter(book=>book.genre===currentGenre);
    }
    showBooks(filtered);
  }

  genrebtns.forEach(btn =>{
    btn.addEventListener("click",() =>{
      document.querySelector(".genre-btn.active").classList.remove("active");
      btn.classList.add("active");
      currentGenre=btn.dataset.genre;
      const genre = btn.getAttribute("data-genre");
      if(genre==="All"){
        showBooks(data);
      }else{
        const filteredBooks = data.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
        showBooks(filteredBooks);
      }
    });
  });

  search.addEventListener("input", filterBooks);
  

  showBooks(data);
}
