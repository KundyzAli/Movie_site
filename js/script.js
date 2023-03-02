/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      poster = document.querySelector('.promo__bg'),
      genre = poster.querySelector('.promo__genre'),
      movieList = document.querySelector('.promo__interactive-list'),
      addForm = document.querySelector('form.add'),
      addInput = addForm.querySelector('.adding__input'),
      checkbox = addForm.querySelector('[type="checkbox"]');


//получение данных из инпута и добавлние в существующий список фильмов      
addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let newFilm = addInput.value; //получение значения инпута
    const favorite = checkbox.checked; //получение подтверждения об отметке чекбокса

    if (newFilm) {

        if (newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`;
        } //если кол-во символов в названии фильма составляет больше чем 21,
         // то после 22 символа ставим троеточие 

        if (favorite) {
            console.log('Добавляем любимый фильм')
        } 

        movieDB.movies.push(newFilm);
        sortArr(movieDB.movies);

        createMovieList(movieDB.movies, movieList);
    }

    

    event.target.reset();
});      


// удаление колонки с рекламой
const deleteAdv = (arr) => {
    arr.forEach(item => {
        item.remove();
    });
};


const makeChanges = () => {
    // изменение жанра кино
    genre.textContent = 'ДРАМА';

    // изменение постера
    // poster.style.cssText = 'background:url("../img/bg.jpg")';
    poster.style.backgroundImage = 'url("img/bg.jpg")';
};


const sortArr = (arr) => {
    // сортировка название фильмов по алфавиту
    arr.sort();
};

 

function createMovieList(films, parent) {
    // очиста списка кино
    parent.innerHTML = '';
    sortArr(films);
    // формирование списка кино из массива
    films.forEach((film, i) => {
        parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
         `;
    });

    // удаляем эл-ты на странице по нажатию на иконку
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);

            // заново перестраивается список при удалении
            createMovieList(films, parent);
        });
    });

}

deleteAdv(adv);
makeChanges();
createMovieList(movieDB.movies, movieList);

});