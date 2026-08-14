const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleBookRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  book.toggleRead();
  displayBooks();
}

function displayBooks() {
  const library = document.getElementById("library");
  library.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.dataset.id = book.id;

    const info = document.createElement("p");
    info.textContent = `${book.title} by ${book.author}, ${book.pages} pages`;
    card.appendChild(info);

    const readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Read" : "Not read yet";
    readBtn.dataset.action = "toggle";
    card.appendChild(readBtn);

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.dataset.action = "remove";
    card.appendChild(removeBtn);

    library.appendChild(card);
  });
}

const newBookBtn = document.getElementById("newBookBtn");
const bookDialog = document.getElementById("bookDialog");
const bookForm = document.getElementById("bookForm");
const library = document.getElementById("library");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  bookDialog.close();
  displayBooks();
});

library.addEventListener("click", (event) => {
  const card = event.target.closest("[data-id]");
  if (!card) return;

  const id = card.dataset.id;
  const action = event.target.dataset.action;

  if (action === "remove") {
    removeBook(id);
  } else if (action === "toggle") {
    toggleBookRead(id);
  }
});



displayBooks();