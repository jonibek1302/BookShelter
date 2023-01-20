const userId = localStorage.getItem("token");
if (!userId) location.replace("./login.html");
let ellogaut = document.querySelector("#logaut");
let bmarkes = document.querySelector("#bmarkes");
let bookCards = document.querySelector(".book-cards");
let navInput = document.querySelector(".nav-input");
let elData = JSON.parse(localStorage.getItem("data"));

ellogaut.addEventListener("click",()=>{
    if (confirm("Are you sure to logout?")) {
      localStorage.removeItem("token");
      location.replace("./login.html");
    }
});

let book = '' ;

let form = document.querySelector(".form");
form.addEventListener("keyup", (e) => {
  e.preventDefault();
  let inputValue = navInput.value;
 book = inputValue;
 renderFetch(inputValue);
  
   inputValue = ''  ;
});

async function renderFetch(a) {
  let resolve = await fetch(
    `
https://www.googleapis.com/books/v1/volumes?q=${a}&startIndex=10&maxResults=6&orderBy=newest
    `
  );
  let data = await resolve.json();
  renderBook(data.items);
  console.log(data.items);
}
function renderBook(arr) {
  bookCards.innerHTML = "";

  arr.forEach((el) => {

    bookCards.innerHTML += `
<div class="card ">
    <img src="${el.volumeInfo.imageLinks.smallThumbnail}" alt="book">
    <h4>${el.volumeInfo.title}</h4>
    <p class="m-1">${el.volumeInfo.authors}</p>
    <p class="m-1">${el.volumeInfo.publishedDate}</p>
    <div class="d-flex">
    <button data-book-id=${el.id} class=" btnmark btn-card m-1  btn-card  btn btn-warning" type="button">Bookmark</button>
    <button data-book-id=${el.id} class="btn-bookmarks btn-card text-info more-info m-1 btn-card  btn " type="button">More Info</button>
    </div>
    <button data-book-id=${el.volumeInfo.previewLink} class=" read-btn bg-secondary  btn-card text-light  m-1 btn-card  btn " type="button">Read</button>
</div>
`;
  });
}

bookCards.addEventListener("click", (evt) => {
  if (evt.target.matches(".btnmark")) {
    let elbookId = evt.target.dataset.bookId;
    console.log(elbookId);
    (async function () {
      let resolve = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${elbookId}`
      );
      let data = await resolve.json();

      localStorage.setItem("data", JSON.stringify(data));
    
      console.log(data);

    })();

   



  }
});

let rightmen = document.querySelector(".rigth-menu");
let menuitem = document.querySelector(".menu-item");
let btnext = document.querySelector("#btn-exit");
let elInfo = JSON.parse(localStorage.getItem('info'));

rightmen.style.display = "none";

bookCards.addEventListener("click", (evt) => {
  if (evt.target.matches(".more-info")) {
    let elbookId = evt.target.dataset.bookId;
    console.log(elbookId);
    (async function () {
      let resolve = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${elbookId}`
      );
      let data = await resolve.json();

      localStorage.setItem("info", JSON.stringify(data));

      console.log(data);

    })();

    rightmen.style.display = "block";
   menuitem.innerHTML = `  <div>
  <img src="${elInfo.volumeInfo.imageLinks.thumbnail}" alt="book">
  <p>${elInfo.volumeInfo.description}</p>

  <ul>
   <li>  Author : <a class="kuk link-info" href="#">${elInfo.volumeInfo.authors}</a></li>
   <li>  Published :   <a class="kuk link-info" href="#">${elInfo.volumeInfo.publishedDate}</a></li>
   <li>  Publishers:  <a class="kuk link-info" href="#">${elInfo.volumeInfo.publisher}</a></li>
   <li>  Categories:  <a class="kuk link-info" href="#">${elInfo.volumeInfo.categories}</a></li>
   <li>  Pages Count:  <a class="kuk link-info" href="#">${elInfo.volumeInfo.pageCount}</a></li>   
  </ul>
  </div>`; 
  }

});
// btnext.addEventListener("click " , ()=>{
//        rightmen.style.display = "none";
//         console.log("exit");  
// });

  
bookCards.addEventListener("click", (evt) => {
  if (evt.target.matches(".read-btn")) {
    let elbookId = evt.target.dataset.bookId;
    console.log(elbookId);
    

location.replace(elbookId);
console.log("read ishladi ");

  }
});
