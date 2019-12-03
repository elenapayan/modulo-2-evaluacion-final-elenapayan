'use strict';

const btn = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const ulList = document.querySelector(".js-right-list");
const ulFavorites = document.querySelector(".js-left-list");
let favoriteList = [];
let data = [];
let list = "";
let favoriteObject;

function getMovies() {
    fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (serverData) {
            data = serverData;
            paintMovies();
            activateToggle();
        })
}
function paintMovies() {
    list = "";
    ulList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].show.image === null) {
            data[i].show.image = {
                medium: "http://via.placeholder.com/210x295"
            }
        };

        let favClass = '';
        const favIndex = getFavIndex(data[i].show.id);
        if (favIndex !== -1) {
            favClass = "change-color";
        };

        list += `<li class="js-content right-list-container ${favClass}" id="${data[i].show.id}">`
        list += `<img class="js-image image" src="${data[i].show.image.medium}" alt="Foto ${data[i].show.name}"/>`
        list += `<h4 class="title">${data[i].show.name}</h4>`
        list += '</li>'
    }
    ulList.innerHTML += list;
}

function getResults(event) {
    event.preventDefault();
    getMovies();
}
btn.addEventListener("click", getResults);

function activateToggle() {
    const content = document.querySelectorAll(".js-content");
    for (let i = 0; i < content.length; i++) {
        content[i].addEventListener("click", addFavorites);
    }
}

function paintFavs() {
    list = "";
    ulFavorites.innerHTML = "";
    for (let i = 0; i < favoriteList.length; i++) {
        list += `<li class="js-content left-list-container" id="${favoriteList[i].id}">`
        list += `<img class="js-image image" src="${favoriteList[i].image}" alt="Foto ${favoriteList[i].name}"/>`
        list += `<h4 class="title">${favoriteList[i].name}</h4>`
        list += '</li>'
    }
    ulFavorites.innerHTML += list;
}

function addFavorites(event) {

    let favoriteName = event.currentTarget.querySelector(".title");
    let favoriteImage = event.currentTarget.querySelector(".js-image");

    favoriteObject = {
        id: event.currentTarget.id,
        name: favoriteName.textContent,
        image: favoriteImage.src,
    };

    let favIndex = getFavIndex(favoriteObject.id);

    if (favIndex === -1) {
        favoriteList.push(favoriteObject);
    } else {
        favoriteList.splice(favIndex, 1);
    }

    localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    paintFavs();
    paintMovies();
    activateToggle();
};

function getFavIndex(id) {
    for (let i = 0; i < favoriteList.length; i++) {
        if (parseInt(favoriteList[i].id) === parseInt(id)) {
            return i;
        }
    }
    return -1;
}

function getLocalStorage() {
    const localStorageFavoriteListJSON = localStorage.getItem("favoriteList");
    const localStorageFavoriteList = JSON.parse(localStorageFavoriteListJSON);
    if (localStorageFavoriteList !== null) {
        favoriteList = localStorageFavoriteList;
        paintFavs();
    }
}

getLocalStorage();