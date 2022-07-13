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
  movies: [
    {
      id: 1,
      title: "Breaking Bad",
      poster:
        "https://imgs.search.brave.com/gbkr-YYDT2urWDnBP2y5GWxPGMtzMR38bHyFr906xYM/rs:fit:1200:630:1/g:ce/aHR0cHM6Ly9saDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tLy0y/NUFSQmc4SnJRRS9Z/QlJVR3FCM1ctSS9B/QUFBQUFBQWcySS9w/RmVjVXFHSUtvY0sw/NDZYeGFGUmJpWlZO/cFhkUnJOSndDTmNC/R0FzWUhRL3cxMjAw/LWg2MzAtcC1rLW5v/LW51L0JyZWFraW5n/X0JhZC5qcGVn",
      description: `A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.`,
      comments: ["I love this movie", "I hate this movie"],
    },

    {
      id: 1,
      title: "LA CASA DE PAPEL",
      poster:
        "https://imgs.search.brave.com/mC2w1gUXGx9nVw-vT2zzlwaP2b3AnYDEMLabtSSWGWo/rs:fit:960:533:1/g:ce/aHR0cHM6Ly9zcGVj/aWFscy1pbWFnZXMu/Zm9yYmVzaW1nLmNv/bS9pbWFnZXNlcnZl/LzVkZWQ1N2JkYjI2/OWU5MDAwNzVkYWRk/Mi85NjB4MC5qcGc_/Zml0PXNjYWxl",
      description: `An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain`,
      comments: ["I love this movie", "I hate this movie"],
    },

    {
      id: 1,
      title: "VIKINGS",
      poster:
        "https://imgs.search.brave.com/ftNgom9Xh0O1vas9mymLjgRiJsSR0kkTTdLkmlOfZe0/rs:fit:1200:921:1/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy8xNDAwLzMwMjE0/NDI0NTAyMzAxLjU2/MzM1NDVlZDViMjgu/anBn",
      description: `Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore--and raid--the distant shores across the ocean.`,
      comments: ["I love this movie", "I hate this movie"],
    },

    {
      id: 1,
      title: "MODERN TIMES",
      poster:
        "https://imgs.search.brave.com/naXlcMM7cghNbT0zrd-O3JEohPpXYHy-5sO4ae6zIaA/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly9pLnl0/aW1nLmNvbS92aS9H/TGVEZHpHVVRxMC9t/YXhyZXNkZWZhdWx0/LmpwZw",
      description: `Modern Times is a 1936 American silent comedy film written and directed by Charlie Chaplin in which his iconic Little Tramp character struggles to survive in the modern, industrialized world.`,
      comments: ["I love this movie", "I hate this movie"],
    },
  ],
};

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
    for (let movie of state.movies) {
      let filmDetailsEl = document.createElement("div");
      filmDetailsEl.className = "film_details";
      mainEl.append(filmDetailsEl);
      filmDetailsEl.addEventListener("click", () => {
        state.selectedMovie = movie;
        render();
      });

      let movieImgEl = document.createElement("img");
      movieImgEl.src = movie.poster;
      movieImgEl.className = "movie_img";
      movieImgEl.alt = movie.title;
      filmDetailsEl.append(movieImgEl);

      let movieNameEl = document.createElement("h3");
      movieNameEl.className = "movie_name";
      movieNameEl.textContent = movie.title;
      filmDetailsEl.append(movieNameEl);
    }
  } else {
    let movieDetailsEl = document.createElement("div");
    movieDetailsEl.className = "film_details";
    mainEl.append(movieDetailsEl);

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
      state.selectedMovie.comments.push(movieCommentEl.value);
      render();
    });
  }
}
render();
