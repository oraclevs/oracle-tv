const MobilehambugerBtn = document.getElementById("nav-mobile-hambuger-icon");
const MobileNavbarBody = document.getElementById("mobileNavBarid");
const UserAuthbtn = document.getElementById("UserAuthbtn");
const userAuthBtnsShowModal = document.getElementById("userAuthBtnsShowModal");
const UserAuthbtn_mobile = document.getElementById("UserAuthbtn_mobile");
const mobileNavBar_close_icon = document.getElementById(
  "mobileNavBar_close_icon"
);


UserAuthbtn.addEventListener("click", () => {
  userAuthBtnsShowModal.classList.toggle("userAuthBtns-active");
  setTimeout(() => {
    userAuthBtnsShowModal.classList.remove("userAuthBtns-active");
  }, 3000);
});
UserAuthbtn_mobile.addEventListener("click", () => {
  userAuthBtnsShowModal.classList.toggle("userAuthBtns-active");
  MobileNavbarBody.classList.remove("mobileNavBar");
  setTimeout(() => {
    userAuthBtnsShowModal.classList.remove("userAuthBtns-active");
  }, 5000);
});

function userAuthBtnsShowModalStartUp() {
  userAuthBtnsShowModal.classList.add("userAuthBtns-active");
  setTimeout(() => {
    userAuthBtnsShowModal.classList.remove("userAuthBtns-active");
  }, 4000);
}
// userAuthBtnsShowModalStartUp();
MobilehambugerBtn.addEventListener("click", () => {
  MobileNavbarBody.classList.toggle("mobileNavBar");
  console.log("mobile nav bar");
  setTimeout(() => {
    MobileNavbarBody.classList.remove("mobileNavBar");
    MobileNavbarBody.removeEventListener("click", () => MobilehambugerBtn);
  }, 10000);
});

mobileNavBar_close_icon.addEventListener("click", () => {
  MobileNavbarBody.classList.remove("mobileNavBar");
  MobileNavbarBody.removeEventListener("click", () => MobilehambugerBtn);
});



const nav_search_icon_mobile = document.getElementById("nav_search_icon_mobile");
const nav_search_icon = document.getElementById("nav-search-icon"); 
const modal_cont = document.getElementById("modal_cont");

nav_search_icon.addEventListener("click", () => {
  modal_cont.classList.toggle("modalcont");
   MobileNavbarBody.classList.remove("mobileNavBar");
  console.log("nav clicked");
});
nav_search_icon_mobile.addEventListener("click", () => {
  modal_cont.classList.toggle("modalcont");
   MobileNavbarBody.classList.remove("mobileNavBar");
  console.log("nav clicked");
});

window.onclick = function (event) {
  if (event.target == modal_cont) {
    modal_cont.classList.remove("modalcont");
  }
};

//* search map function
function mapSearch(MovieCard_continer, MovieDataName) {
  return (MovieCard_continer.innerHTML = MovieDataName.map((x) => {
    let { _id, image_source_potrate_url, name } = x;
    return `
     <li class="li_list_cont" id="A${_id}">
                    <div class="Search_img_holder">
                        <img src="https://i.postimg.cc${image_source_potrate_url}" alt="" id="search_Img_src">
                    </div>
                    <div class="search_name_holder">
                        <h2 id="Search_movie_name">${name}</h2>
                    </div>
                </li>
      `;
  }).join(""));
}

 Movieinput.addEventListener("change", (e) => {
   console.log(Movieinput.value);
   const MoviesSearchByName = async () => {
     Ul_movie_list_cont.innerHTML = ` <li class="li_list_cont"><h2> LOADING... </h2></li>`;
     const SearchString = Movieinput.value;
     let SearchUrl = `movies/v1/?limit=20&name=${SearchString}`;
     try {
       const response = await fetch(SearchUrl);
       if (!response.ok) {
         throw new Error("Not Found");
       }
       const searchResult = await response.json();
       console.log(searchResult);
       if (searchResult.allmovies.length === 0) {
         console.log("zero movies");
         throw new Error(
           `No movies found <i class="bi bi-exclamation-circle"></i> `
         );
       }
       mapSearch(Ul_movie_list_cont, searchResult.allmovies);
       const clickLi = () => {
         for (let i = 0; i < searchResult.allmovies.length; i++) {
           let LIcard = document.getElementById(
             `A${searchResult.allmovies[i]._id}`
           );
           LIcard.addEventListener("click", () => {
             location.href = `detailes_movies.html?id=${searchResult.allmovies[i]._id}`;
           });
         }
       };
       clickLi();
     } catch (error) {
       console.log(error);
       Ul_movie_list_cont.innerHTML = ` <li class="li_list_cont"><h2> ${error.message} </h2></li>`;
     }
   };
   MoviesSearchByName();
 });