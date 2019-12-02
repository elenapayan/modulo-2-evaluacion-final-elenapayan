'use strict';

const btn = document.querySelector(".js-btn");
const input = document.querySelector(".js-input");
const ulFavorites = document.querySelector(".js-left-list");
let favoriteList = [];


function getMovies() {
    fetch(`http://api.tvmaze.com/search/shows?q=${input.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            paintMovies(data);
        })
}

function paintMovies(data) {
    let list = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i].show.image === null) {
            data[i].show.image = {
                medium: "http://via.placeholder.com/210x295"
            }
        };
        list += '<li class="container">'
        list += `<img class="js-image" src="${data[i].show.image.medium}" alt="Foto ${data[i].show.name}"/>`
        list += `<h4 class="title">${data[i].show.name}</h4>`
        list += '</li>'
    }
    const ulList = document.querySelector(".js-right-list");
    ulList.innerHTML = list;
}

function getResults(event) {
    event.preventDefault();
    getMovies();
}
btn.addEventListener("click", getResults);