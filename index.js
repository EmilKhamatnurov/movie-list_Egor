const TITLE_LENGTH_LIMIT = 30;
const MIN_TITLE_LENGTH_LIMIT = 0;

const inputNode = document.querySelector('.form__input');//поле ввода
const addBtnNode = document.querySelector('.movie__add-btn');//кнопка добавить
const moviesListNode = document.querySelector('.movies__list');//список фильмов
const movieCheckboxNode = document.querySelector('.movie__checkbox');//input пункта
const movieLabelNode = document.querySelector('.movie__label');//пункт/фильм

let movieList = [];//массив с задачими
const storageNode = localStorage;

//Функции

const getMovieName = () => {//функция получения задачи
    const input = inputNode.value;
    return input;
};

const clearInput = () => {//функция очистки инпута
    inputNode.value = "";
};

inputNode.addEventListener('input', () => {//проверка колличества символов
    validationInput();
});

validationInput = () => {
    const inputLen = inputNode.value.trim().length;

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
        }
    } else {
        addBtnNode.disabled = true;//отключение кнопки добавления если поле ввода пустое
    };
};

const saveMoviesToStorage = () => {//сохранение в LocalStorage
    const movieListStorage = JSON.stringify(movieList);
    storageNode.setItem('moviesList', movieListStorage);
};
const loadMoviesFromStorage = () => {
    const movieListStorage = storageNode.getItem('moviesList');
    if (movieListStorage) {
        movieList = JSON.parse(movieListStorage);
        render(movieList);
    }
};
window.addEventListener('load', loadMoviesFromStorage);//вызов из localStorage при загрузки 

const createMovie = (movieName) => {//создание списка задач
    const movie = { 
        title: movieName,
        id: `${Math.random()}` 
    };
    movieList.push(movie);
    return movie;
};

const render = (movieList) => {
    moviesListNode.innerHTML = "";

    movieList.forEach((movie) => {//массив задач
        const movieItem = document.createElement("li");
        const movieBox = document.createElement("div");
        const movieCheckbox = document.createElement("input");
        const movieLabel = document.createElement("label");
        const movieCloseBtn = document.createElement("button");

        movieItem.className = "movie__item";//элемент
        movieBox.className = "movie__box";//контейнер
        movieCheckbox.className = "movie__checkbox";//чекбокс
        movieLabel.className = "movie__label";//название
        movieCloseBtn.className = "movie__close-btn";//кнопка удаления

        movieLabel.innerText = movie.title;

        movieItem.dataset.id = movie.id;
        movieCheckbox.id = `${Math.random()}`;
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
        CloseMovie(movieList, id);
        });
    });
};
//Удаление задачи
const CloseMovie = (movieList, id) => {
    let newMoviesArr = movieList.filter(function (movie) {
      return id !== movie.id;
    });
    render(newMoviesArr);
    saveMoviesToStorage();
  };
  
//Обработчик событий

const addBtnHandler = () => {
    const movieName = getMovieName();
    clearInput();
    validationInput();
    createMovie(movieName);
    render(movieList);
    saveMoviesToStorage();
};

const movieCheckboxHandler = (e) => {
    if (e.target.classList.contains("movie__checkbox")) {
        const movieElement = e.target.closest(movieList, id);
        const movieIndex = getFilmIndex(movieElement);
        movie[movieIndex].checked = e.target.checked;

        movieElement
          .querySelector(".movie__label")
          .classList.toggle("movie__label_checked");
        movieElement
          .querySelector(movieCloseBtn)
          .classList.toggle(movieCloseBtn);
        movieElement.classList.toggle(movieCloseBtn);
        saveToLocalStorage();
      }
    moviesListNode.classList.toggle('movie__checked');
};

//Слушатель событий
addBtnNode.addEventListener('click', addBtnHandler);
movieCheckboxNode.addEventListener('click', movieCheckboxHandler);