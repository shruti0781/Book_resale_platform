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
// new
// === AI Description Generator ===
const generateBtn = document.getElementById("generateDescBtn");
const bookTitleInput = document.getElementById("bookTitleInput");
const bookDescOutput = document.getElementById("bookDescOutput");

generateBtn.addEventListener("click", async () => {
  const title = bookTitleInput.value.trim();
  if (!title) {
    alert("Please enter a book title!");
    return;
  }

  // 🔑 Replace this with your own API key
  const API_KEY = "YOUR_OPENAI_API_KEY";

  bookDescOutput.value = "✨ Generating AI description... Please wait...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a short, attractive description for a book titled "${title}".`
          }
        ],
        max_tokens: 120
      })
    });

    const data = await response.json();
    bookDescOutput.value = data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    bookDescOutput.value = "⚠️ Error generating description.";
  }
});
// new
