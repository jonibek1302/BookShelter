let input = document.querySelector(".user");
let btn = document.querySelector(".btn");
let elform = document.querySelector("#form");
let elpass = document.querySelector(".password");
let elforgot = document.querySelector(".forgot");

elform.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputval = input.value;
  const passval = elpass.value;

  fetch("https://reqres.in/api/login", {
    method: `POST`,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: inputval,
      password: passval,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token' , data.token);
        window.location.replace('./index.html')
      }
      else{
        alert("Iltimos to'g'ri email yoki parol kiriting !!!")
      }
    });

  console.log(inputval);
  console.log(passval);
});

