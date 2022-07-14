import "./style.css";

type Movie = {
  id: number;
  title: string;
  poster: string;
  description: string;
  comments: string[];
};

type State = {
  selectedMovie: null | Movie;
  movies: Movie[];
};

let state: State = {
  selectedMovie: null,
  movies: [],
};

fetch("http://localhost:3001/movies")
.then(resp => resp.json())
.then(dataFromServer => { state.movies = dataFromServer
  console.log(state.movies) 
  render ()
 } )





function render() {
  let appEl = document.querySelector("#app");
  if (appEl === null) return;
  appEl.textContent = "";

  let headerEl = document.createElement("header");
  appEl.append(headerEl);

  let h1El = document.createElement("h1");
  h1El.className = "web_title";
  h1El.textContent = "NETFLOX";
  headerEl.append(h1El);

  let mainEl = document.createElement("main");
  appEl.append(mainEl);

  if (state.selectedMovie === null) {
    renderMovies (mainEl)
  } else {
    renderMovieDetails(mainEl)
  }
}

function renderMovies (mainEl: HTMLElement){
  for (let movie of state.movies) {
    let filmDetailsEl = document.createElement("div");
    filmDetailsEl.className = "film_details";
    mainEl.append(filmDetailsEl);
    filmDetailsEl.addEventListener("click", () => {
      state.selectedMovie = movie;
      render();
    });

    let movieImgEl = document.createElement("img");
    movieImgEl.src =  movie.poster;
    movieImgEl.className = "movie_img";
    movieImgEl.alt = movie.title;
    filmDetailsEl.append(movieImgEl);

    let movieNameEl = document.createElement("h3");
    movieNameEl.className = "movie_name";
    movieNameEl.textContent = movie.title;
    filmDetailsEl.append(movieNameEl);
  }
}
function renderMovieDetails(mainEl: HTMLElement) {
  if (state.selectedMovie === null ) return

  let movieDetailsEl = document.createElement("div");
  movieDetailsEl.className = "film_details";
  mainEl.append(movieDetailsEl);

  let goBackEl = document.createElement("button");
  goBackEl.className = "go_back";
  goBackEl.textContent = "Go back";
  movieDetailsEl.append(goBackEl);
  goBackEl.addEventListener("click", function () {
    state.selectedMovie = null;
    render();
  });

  let movieImgEl = document.createElement("img");
  movieImgEl.src = state.selectedMovie.poster;
  movieImgEl.className = "movie_img";
  movieImgEl.alt = state.selectedMovie.title;
  movieDetailsEl.append(movieImgEl);

  let movieNameEl = document.createElement("h3");
  movieNameEl.className = "movie_name";
  movieNameEl.textContent = state.selectedMovie.title;
  movieDetailsEl.append(movieNameEl);

  let movieDescriptionEl = document.createElement("p");
  movieDescriptionEl.className = "movie_description";
  movieDescriptionEl.textContent = state.selectedMovie.description;
  movieDetailsEl.append(movieDescriptionEl);

  let movieCommentsEl = document.createElement("ul");
  movieCommentsEl.className = "movie_comments";
  movieDetailsEl.append(movieCommentsEl);

  for (let comment of state.selectedMovie.comments) {
    let commentEl = document.createElement("li");
    commentEl.textContent = comment;
    movieCommentsEl.append(commentEl);
  }

  let movieCommentEl = document.createElement("input");
  movieCommentEl.className = "movie_comment";
  movieCommentEl.type = "text";
  movieDetailsEl.append(movieCommentEl);

  let movieCommentButtonEl = document.createElement("button");
  movieCommentButtonEl.className = "movie_comment_button";
  movieCommentButtonEl.textContent = "Add comment";
  movieDetailsEl.append(movieCommentButtonEl);

  movieCommentButtonEl.addEventListener("click", () => {
    if (state.selectedMovie === null) return
    state.selectedMovie.comments.push(movieCommentEl.value);
    render();
  });
}

render();


