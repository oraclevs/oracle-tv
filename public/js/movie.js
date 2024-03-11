


let New_movieCard_continer = document.getElementById("New_movieCard_continer");
let Action_MoviesCard_continer = document.getElementById(
  "Action_MoviesCard_continer"
);

let movie_list_see_more_btn = document.getElementById(
  "movie_list_see_more_btn"
);
let MoreMovie_message = document.getElementById("MoreMovie_message");
let NewMovie_message = document.getElementById("NewMovie_message");

//* Movie Card Map  Function
function mapCards(MovieCard_continer, MovieDataName) {
  return (MovieCard_continer.innerHTML = MovieDataName.map((x) => {
    let { _id, image_source_potrate_url, name } = x;
    return `
     <div class="card" id="${_id}">
      <div class="Moviecardimgholder">
      <img src="https://i.postimg.cc${image_source_potrate_url}" alt="">
      </div>
            <div class="movieName">
               <h3>${name}</h3>
            </div>
      </div>
      `;
  }).join(""));
}



//* Movie Details function
function MoviedetailCard(moviedatax) {
  for (let i = 0; i < moviedatax.length; i++) {
    let card = document.getElementById(`${moviedatax[i]._id}`);
    card.addEventListener("click", () => {
      window.scrollTo(0, 0);
      location.href = `detailes_movies.html?id=${moviedatax[i]._id}`;
      console.log(`${moviedatax[i].name}`);
    });
  }
}

let winwit = window.innerWidth;

//* Newmovies fetch
let NewMovie_url = `/movies/v1/?sort=-createdAt&limit=7`;
let moremovies = `/movies/v1/?sort=-createdAt&limit=21`;

let Fetch_new_movies = async () => {
  try {
    New_movieCard_continer.innerHTML = "";
    NewMovie_message.innerHTML = ` <div class="loader-cont">
                <ul>
                    <li style="--delay: 0s">L</li>
                    <li style="--delay: 0.2s">O</li>
                    <li style="--delay: 0.4s">A</li>
                    <li style="--delay: 0.6s">D</li>
                    <li style="--delay: 0.8s">I</li>
                    <li style="--delay: 1s">N</li>
                    <li style="--delay: 1.2s">G</li>
                </ul>
            </div>`;
    const response = await fetch(NewMovie_url);
    if (!response.ok) {
      throw new Error("Not Found");
    }
    const New_movies_json = await response.json();
    console.log(response);
    NewMovie_message.innerHTML = "";
    mapCards(New_movieCard_continer, New_movies_json.allmovies);
    MoviedetailCard(New_movies_json.allmovies);
  } catch (error) {
      MoreMovie_message.innerHTML = `<h1>${error.message}</h1>`;
      if (error.message === "Not Found") {
        setTimeout(() => {
         Fetch_new_movies();
        }, 5000);
      }
  }
};

Fetch_new_movies();

let fetch_More_movies = async () => {
  if (window.innerWidth <= 767) {
    try {
      let moremovies = "/movies/v1/?sort=-createdAt&limit=8";
      Action_MoviesCard_continer.innerHTML = "";
      MoreMovie_message.innerHTML = ` <div class="loader-cont">
                <ul>
                    <li style="--delay: 0s">L</li>
                    <li style="--delay: 0.2s">O</li>
                    <li style="--delay: 0.4s">A</li>
                    <li style="--delay: 0.6s">D</li>
                    <li style="--delay: 0.8s">I</li>
                    <li style="--delay: 1s">N</li>
                    <li style="--delay: 1.2s">G</li>
                </ul>
            </div>`;
      const response = await fetch(moremovies);
      if (!response.ok) {
        throw new Error("Not found");
      }
      const New_movies_json = await response.json();
      MoreMovie_message.innerHTML = "";
      mapCards(Action_MoviesCard_continer, New_movies_json.allmovies);
      MoviedetailCard(New_movies_json.allmovies);
    } catch (error) {
       MoreMovie_message.innerHTML = `<h1>${error.message}</h1>`;
       if (error.message === "Not Found") {
         setTimeout(() => {
           fetch_More_movies();
         }, 5000);
       }
    }
  } else {
    try {
      Action_MoviesCard_continer.innerHTML = "";
      MoreMovie_message.innerHTML = ` <div class="loader-cont">
                <ul>
                    <li style="--delay: 0s">L</li>
                    <li style="--delay: 0.2s">O</li>
                    <li style="--delay: 0.4s">A</li>
                    <li style="--delay: 0.6s">D</li>
                    <li style="--delay: 0.8s">I</li>
                    <li style="--delay: 1s">N</li>
                    <li style="--delay: 1.2s">G</li>
                </ul>
            </div>`;
      const response = await fetch(moremovies);
      if (!response.ok) {
        throw new Error("Not found");
      }
      const New_movies_json = await response.json();
      MoreMovie_message.innerHTML = "";
      mapCards(Action_MoviesCard_continer, New_movies_json.allmovies);
      MoviedetailCard(New_movies_json.allmovies);
    } catch (error) {
       MoreMovie_message.innerHTML = `<h1>${error.message}</h1>`;
      if (error.message === "Not Found") {
           setTimeout(() => { 
             fetch_More_movies();
           }, 5000);
      }
      console.log(error);
    }
  }
};

fetch_More_movies();
let page = 1;

function pagecountup() {
  page++;
  console.log(page);
}

movie_list_see_more_btn.addEventListener("click", () => {
  pagecountup();
  window.scrollTo(0, 500);
  location.href = `#more_moves_sec`;
  movie_list_see_more_btn.innerHTML = `At Page ${page}: See More`;
  const fetchMore = async () => {
    if (window.innerWidth <= 767) {
      window.scrollTo(0, 500);
      document.scrollingElement.scrollTop
      try {
        let moremovies = `/movies/v1/?sort=-createdAt&limit=8&page=${page}`;
        Action_MoviesCard_continer.innerHTML = "";
        movie_list_see_more_btn.disabled = true;
        MoreMovie_message.innerHTML = ` <div class="loader-cont">
                <ul>
                    <li style="--delay: 0s">L</li>
                    <li style="--delay: 0.2s">O</li>
                    <li style="--delay: 0.4s">A</li>
                    <li style="--delay: 0.6s">D</li>
                    <li style="--delay: 0.8s">I</li>
                    <li style="--delay: 1s">N</li>
                    <li style="--delay: 1.2s">G</li>
                </ul>
            </div>`;
        const response = await fetch(moremovies);
        if (!response.ok) {
          throw new Error("Error: Not found");
        }
        const New_movies_json = await response.json();
        console.log(New_movies_json);
        if (New_movies_json.allmovies.length === 0) {
          throw new Error("No More Movies Available");
        }
        MoreMovie_message.innerHTML = "";
        mapCards(Action_MoviesCard_continer, New_movies_json.allmovies);
        MoviedetailCard(New_movies_json.allmovies);
        movie_list_see_more_btn.disabled = false;
      } catch (error) {
        if (error.message === "No More Movies Available") {
          movie_list_see_more_btn.disabled = true;
          movie_list_see_more_btn.innerHTML = `At last page`;
          MoreMovie_message.innerHTML = `<h1>No More Movies Available</h1>`;
          setTimeout(() => {
            page = 1;
            MoreMovie_message.innerHTML = "";
            fetch_More_movies();
            movie_list_see_more_btn.innerHTML = `See More`;
            movie_list_see_more_btn.disabled = false;
          }, 5000);
        } else {
          MoreMovie_message.innerHTML = `<h1>${error.message}</h1>`;
        }
        console.log(error);
      }
    } else {
      try {
        let moremovies = `/movies/v1/?sort=-createdAt&limit=21&page=${page}`;
        Action_MoviesCard_continer.innerHTML = "";
        movie_list_see_more_btn.disabled = true;
        MoreMovie_message.innerHTML = ` <div class="loader-cont">
                <ul>
                    <li style="--delay: 0s">L</li>
                    <li style="--delay: 0.2s">O</li>
                    <li style="--delay: 0.4s">A</li>
                    <li style="--delay: 0.6s">D</li>
                    <li style="--delay: 0.8s">I</li>
                    <li style="--delay: 1s">N</li>
                    <li style="--delay: 1.2s">G</li>
                </ul>
            </div>`;
        const response = await fetch(moremovies);

        if (!response.ok) {
          throw new Error("Not found");
        }
        const New_movies_json = await response.json();
        console.log(New_movies_json);
        if (New_movies_json.allmovies.length === 0) {
          throw new Error("No More Movies Available");
        }
        MoreMovie_message.innerHTML = "";
        mapCards(Action_MoviesCard_continer, New_movies_json.allmovies);
        MoviedetailCard(New_movies_json.allmovies);
        movie_list_see_more_btn.disabled = false;
      } catch (error) {
        if (error.message === "No More Movies Available") {
          movie_list_see_more_btn.disabled = true;
          movie_list_see_more_btn.innerHTML = `At last page`;
          MoreMovie_message.innerHTML = `<h1>No More Movies Available</h1>`;
          setTimeout(() => {
            page = 1;
            MoreMovie_message.innerHTML = "";
            fetch_More_movies();
            movie_list_see_more_btn.innerHTML = `See More`;
            movie_list_see_more_btn.disabled = false;
          }, 5000);
        } else {
          MoreMovie_message.innerHTML = `<h1>${error.message}</h1>`;
        }
        console.log(error);
      }
    }
  };
  fetchMore();
});

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
//* Movie Search funtion
let Movieinput = document.getElementById("Movieinput");
let search_Img_src = document.getElementById("search_Img_src");
let Search_movie_name = document.getElementById("Search_movie_name");
let Ul_movie_list_cont = document.getElementById("Ul_movie_list_cont");
let form = document.getElementById("form_input_holder");
let nav_search_icon = document.getElementById("nav_search_icon");
let nav_search_icon_mobile = document.getElementById("nav_search_icon_mobile");
let modal_cont = document.getElementById("modal_cont");
const MobileNavbarBody = document.getElementById("mobileNavBarid");
//* Search Modal
nav_search_icon.addEventListener("click", () => {
  MobileNavbarBody.classList.remove("mobileNavBar");
  modal_cont.classList.toggle("modalcont");
  console.log("nav clicked");
});
nav_search_icon_mobile.addEventListener("click", () => {
  MobileNavbarBody.classList.remove("mobileNavBar");
  modal_cont.classList.toggle("modalcont");
  console.log("nav clicked");
});

window.onclick = function (event) {
  if (event.target == modal_cont) {
    modal_cont.classList.remove("modalcont");
  }
};

//*️
 Movieinput.addEventListener("change", (e) => {
   console.log(Movieinput.value);
   const MoviesSearchByName = async () => {
     Ul_movie_list_cont.innerHTML = ` <li class="li_list_cont"> <div class="loader-cont">
                <ul>
                    <li style="--delay: 0s">L</li>
                    <li style="--delay: 0.2s">O</li>
                    <li style="--delay: 0.4s">A</li>
                    <li style="--delay: 0.6s">D</li>
                    <li style="--delay: 0.8s">I</li>
                    <li style="--delay: 1s">N</li>
                    <li style="--delay: 1.2s">G</li>
                </ul>
            </div></li>`;
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



