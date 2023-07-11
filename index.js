const TITLE_LENGTH_LIMIT = 30;
const MIN_TITLE_LENGTH_LIMIT = 0;

const inputNode = document.querySelector('.form__input');
const addBtnNode = document.querySelector('.movie__add-btn');
const moviesListNode = document.querySelector('.movies__list');

const movieList = [];
const localStorageNode = localStorage;

//-----------------------Функции-----------------------

const getMovieName = () => {
    const input = inputNode.value
    return input;
};

const clearInput = () => {
    inputNode.value = "";
};

inputNode.addEventListener('input', () => {
    validationInput();
});

validationInput = () => {
    const inputLen = inputNode.value.length;

    if (inputLen != 0 || inputLen > MIN_TITLE_LENGTH_LIMIT) {
        if (inputLen <= MIN_TITLE_LENGTH_LIMIT) {
            addBtnNode.disabled = true;
            return;
        }
        if (inputLen > TITLE_LENGTH_LIMIT) {
            addBtnNode.disabled = true;
            return;
        } else {
            addBtnNode.disabled = false;
        };
    } else {
        addBtnNode.disabled = true;
    };
};

//initMovieList = () => {
//    if (localStorage.getItem(localStorageNode)) {
//        movieList = JSON.parse(movieListStorage);
//    }
//};
//initMovieList();

saveMovieToStorage = () => {
    const movieListStorage = JSON.stringify(movieList);
    localStorageNode.setItem('movies list', movieListStorage);
};

const createMovie = (movieName) => {
    const movie = { title: movieName, id: `${Math.random()}` };
    movieList.push(movie);
    return movie;
};

const render = (movieList) => {
    moviesListNode.innerHTML = "";

    movieList.forEach((movie) => {
        const movieItem = document.createElement("li");
        const movieBox = document.createElement("div");
        const movieCheckbox = document.createElement("input");
        const movieLabel = document.createElement("label");
        const movieCloseBtn = document.createElement("button");

        movieItem.className = "movie__item";
        movieBox.className = "movie__box";
        movieCheckbox.className = "movie__checkbox";
        movieLabel.className = "movie__label";
        movieCloseBtn.className = "movie__close-btn";

        movieItem.innerText = "";
        movieLabel.innerText = movie.title;

        movieItem.dataset.id = movie.id;
        movieCheckbox.id = `${Math.random()}`;
        movieCheckbox.setAttribute("data-index", "");
        movieCheckbox.setAttribute("unchecked", "");
        movieCheckbox.setAttribute("type", "checkbox");
        movieLabel.setAttribute("for", `${movieCheckbox.id}`);
        movieCloseBtn.dataset.id = movie.id;

        moviesListNode.appendChild(movieItem);
        movieItem.appendChild(movieBox);
        movieBox.appendChild(movieCheckbox);
        movieBox.appendChild(movieLabel);
        movieItem.appendChild(movieCloseBtn);

        movieCloseBtn.addEventListener("click", () => {
        const id = movieItem.dataset.id;
        removeMovie(movieList, id);
        });
    });
};

//Удаление фильма
const removeMovie = (movieList, id) => {
    let newMoviesArr = movieList.filter(function (movie) {
        return id !== movie.id;
    });
    render(newMoviesArr);
};

//--------------------Обработчики----------------------

const addBtnHandler = () => {
    const movieName = getMovieName();
    clearInput();
    validationInput();
    createMovie(movieName);
    render(movieList);
    saveMovieToStorage();
    
};

//-----------------Слушатели событий-------------------
addBtnNode.addEventListener("click", addBtnHandler);