let MovieDownloadBtn = document.getElementById("movie_download_btn");
let NewDownloadWindow;
let URL = "https://www.geeksforgeeks.org";

let detailsh1 = document.getElementById("detailsh1");
let movedescription = document.getElementById("allvideodescription");
let allmovieMain_cont = document.getElementById("movieSection");
let MovieDetails_sec = document.getElementById("movieDetails");
let allmovieIMG = document.getElementById("allmovieIMG");
let storyline = document.getElementById("storyline");
let year_of_realease = document.getElementById("year_of_realease");
let cast = document.getElementById("cast");
let genre = document.getElementById("genre");
let Writers = document.getElementById("Writers");
let iframe = document.getElementById("iframe");
let AllvideoRating = document.getElementById("AllvideoRating");
let AllvideoReview = document.getElementById("AllvideoReview");
let videoplayersection = document.getElementById("videoplayersection");
let Allmovie_VideoPlayer = document.getElementById("Allmovie-VideoPlayer");
let WAtching_AXmovieNAme = document.getElementById("WAtching_AXmovieNAme");
let suggestion_Card_cont = document.getElementById("suggestion_Card_cont");
const searchParams = new URLSearchParams(window.location.search);
let MovieId = searchParams.get("id");
const loadin_det_cont = document.getElementById("loadin_det_cont");

//* Movie Suggestions map Function
function suggestion__cardMapFunction(MovieCard_continer, MovieDataName) {
  return (MovieCard_continer.innerHTML = MovieDataName.map((x) => {
    let { _id, image_source_potrate_url, name } = x;
    return `
         <div class="suggestion_card" id="${_id}">
             <div class="suggestion_card_img_holder">
                <img src="https://i.postimg.cc${image_source_potrate_url}" alt="">
              </div>
                <div class="suggestion_card_text">
                   <h3>${name}</h3>
                 </div>
        </div>
      `;
  }).join(""));
}
//*
//* movie rating function
function movieRatingFunction(movegenre, movieinnerhtml) {
  if (`${movegenre}` == 1) {
    movieinnerhtml.innerHTML = `
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star"></i>
       <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
      `;
  }
  if (`${movegenre}` == 2) {
    movieinnerhtml.innerHTML = `
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star"></i>
       <i class="bi bi-star"></i>
      <i class="bi bi-star"></i>
      
      `;
  }
  if (`${movegenre}` == 3) {
    movieinnerhtml.innerHTML = `
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star"></i>
       <i class="bi bi-star"></i>
      
      `;
  }
  if (`${movegenre}` == 4) {
    movieinnerhtml.innerHTML = `
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
       <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      <i class="bi bi-star"></i>
      
      `;
  }
  if (`${movegenre}` == 5) {
    movieinnerhtml.innerHTML = `
      <i class="bi bi-star-fill"></i>
       <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
       <i class="bi bi-star-fill"></i>
      <i class="bi bi-star-fill"></i>
      
      `;
  }
}

const getsinglemoviedetails = async () => {
  let singlemovieUrl = `movies/v1/${MovieId}`;
  try {
    loadin_det_cont.style.display ="block"
    const response = await fetch(singlemovieUrl);
    if (!response.ok) {
      throw new Error("Error: Not Found");
    }
    const single_Movie = await response.json();
loadin_det_cont.style.display = "none";
    const Single_movie_Data_load = () => {
      detailsh1.innerHTML = single_Movie.movielistApi.name;
      movedescription.innerHTML = single_Movie.movielistApi.description;
      storyline.innerHTML = single_Movie.movielistApi.Storyline;
      year_of_realease.innerHTML = single_Movie.movielistApi.Year_of_Release;
      cast.innerHTML = single_Movie.movielistApi.Cast;
      genre.innerHTML = single_Movie.movielistApi.genre;
      allmovieIMG.src =
        `https://i.postimg.cc` +
        single_Movie.movielistApi.image_source_potrate_url;
      Writers.innerHTML = single_Movie.movielistApi.Writers;
      AllvideoReview.innerHTML = single_Movie.movielistApi.review;
      iframe.src =
        single_Movie.movielistApi.movie_thriller_youtube_iframe_src_url;
      MovieDownloadBtn.addEventListener("click", () => {
        let Nurl = single_Movie.movielistApi.video_Download_Link;
        NewDownloadWindow = window.open(Nurl);
        setTimeout(() => {
          NewDownloadWindow.close();
        }, 12000);
      });
      movieRatingFunction(single_Movie.movielistApi.rating, AllvideoRating);
    };
    Single_movie_Data_load();

    let namex = detailsh1.innerHTML;
    let Su_search_name = namex.split(" ");
    let Suggestion_search_name = Su_search_name[0].charAt(0);

    const A_Movie_suggestions = async () => {
      let sugURL = `movies/v1/?limit=6&name=${Suggestion_search_name}`;
         loadin_det_cont.style.display = "block";
      try {
        const response = await fetch(sugURL);
        if (!response.ok) {
          throw new Error("Error: Not Found ");
        }
        const suggestions_Movie = await response.json();
           loadin_det_cont.style.display = "none";
        suggestion__cardMapFunction(
          suggestion_Card_cont,
          suggestions_Movie.allmovies
        );
        const clickLi = () => {
          for (let i = 0; i < suggestions_Movie.allmovies.length; i++) {
            let SUGcard = document.getElementById(
              `${suggestions_Movie.allmovies[i]._id}`
            );
            SUGcard.addEventListener("click", () => {
              location.href = `detailes_movies.html?id=${suggestions_Movie.allmovies[i]._id}`;
            });
          }
        };
        clickLi();
      } catch (error) {
        console.log(error);
        loadin_det_cont.innerHTML = `<h1>${error.message}</h1>`
        setTimeout(() => {
            location.href = `index.html`;
        },5000)
      }
    };

    A_Movie_suggestions();
    console.log(single_Movie.movielistApi);
  } catch (error) {
    console.log(error);
    loadin_det_cont.innerHTML = `<h1>${error.message}</h1>`;
     setTimeout(() => {
       location.href = `index.html`;
     }, 5000);
  }
};
getsinglemoviedetails();
