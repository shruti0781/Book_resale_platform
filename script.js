let books = [
  {id:1, title:"C Programming", author:"Dennis Ritchie", stock:2},
  {id:2, title:"Data Structures", author:"Mark Weiss", stock:1},
  {id:3, title:"Operating System", author:"Galvin", stock:0}
];

function searchBook(){
  let query = document.getElementById("searchBox").value.toLowerCase();
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  let foundBooks = books.filter(b => b.title.toLowerCase().includes(query));

  if(foundBooks.length > 0){
    foundBooks.forEach(book => {
      resultDiv.innerHTML += `
        <div class="book-card" style="border:1px solid #ccc; padding:15px; margin:10px 0; border-radius:8px;">
          <h3>${book.title}</h3>
          <p><b>Author:</b> ${book.author}</p>
          <p><b>Stock:</b> ${book.stock > 0 ? book.stock : "Out of Stock"}</p>
          <a href="book.html?id=${book.id}" style="color:blue; text-decoration:underline;">📖 View Details</a>
          <button onclick="buyBook(${book.id})" ${book.stock === 0 ? "disabled" : ""}>
            ${book.stock > 0 ? "Buy Now" : "Not Available"}

          </button>
        </div>
      `;
    });
  } else {
    resultDiv.innerHTML = "<p>❌ Book not found!</p>";
  }
}

function buyBook(id){
  let book = books.find(b => b.id === id);
  if(book && book.stock > 0){
    book.stock--;
    alert(`✅ You bought "${book.title}"`);
    searchBook();
  }
}
