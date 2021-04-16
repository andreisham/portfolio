//слайдер
let slider = document.querySelector('.slider');
let scroller = slider.querySelector('.slider_scroller');
let nextBtn = slider.querySelector('.next');
let prevBtn = slider.querySelector('.previous');
let itemWidth = slider.querySelector('.item').clientWidth;
const cards = slider.querySelectorAll('.card');

const mediaDesktopQuery = window.matchMedia("(min-width: 991.99px)");
const mediaTabletQuery = window.matchMedia("(min-width: 767.99px) and (max-width: 991.98px)");
const mediaMobileQuery = window.matchMedia("(max-width: 767.98px");

/**
 * Функция удаляет все слайды
 */
function removeSlides() {
    while (scroller.firstChild) {
        scroller.removeChild(scroller.firstChild)
    }
}
/**
 * Функция создает заданное в num количество слайдов
 * @param num количество слайдов
 * @returns slides массив созданных слайдов
 */
function createSlides(num) {
    let slides = [];
    for (let i = 0; i < num; i++) {
        let newSlide = document.createElement('div');
        newSlide.className = 'item';
        slides.push(newSlide);
        scroller.append(slides[i]);
    }
    return slides;
}
/**
 * Функция расположения по 3 карточки на слайд
 * @param mediaQuery Выражение для медиа запроса
 */
function desktopChange(mediaQuery) {
    if (mediaQuery.matches) {
        removeSlides();
        let slides = createSlides(2);
        for (let i = 0; i < cards.length; i++) {
            if (0 <= i && i <= 2) {
                slides[0].append(cards[i]);
            } else {
                slides[1].append(cards[i]);
            }
        }
    }
}
/**
 * Функция перемещения последней карточки первого слайда во второй для планшета (делаем по 2 карточки на слайд)
 * @param mediaQuery Выражение для медиа запроса
 */
function tabletChange(mediaQuery) {
    if (mediaQuery.matches) {
        removeSlides();
        let slides = createSlides(3);
        for (let i = 0; i < cards.length; i++) {
            if (0 <= i && i <= 1) {
                slides[0].append(cards[i]);
            } else if (2 <= i && i <= 3) {
                slides[1].append(cards[i]);
            } else {
                slides[2].append(cards[i]);
            }
        }
    }
}
/**
 * Функция размещения карточек по одной на слайд
 * @param mediaQuery Выражение для медиа запроса
 */
function mobileChange(mediaQuery) {
    if (mediaQuery.matches) {
        removeSlides()
        for (const card of cards) {
            let newSlide = document.createElement('div');
            newSlide.className = 'item';
            scroller.append(newSlide);
            newSlide.append(card);
        }
    }
}

mediaDesktopQuery.addEventListener('change', desktopChange)
desktopChange(mediaDesktopQuery)

mediaTabletQuery.addEventListener('change', tabletChange)
tabletChange(mediaTabletQuery)

mediaMobileQuery.addEventListener('change', mobileChange)
mobileChange(mediaMobileQuery)

// скроллер для слайдов
nextBtn.addEventListener('click', scrollToNextItem);
prevBtn.addEventListener('click', scrollToPrevItem);
// TODO описание функций
function scrollToNextItem() {
    if(scroller.scrollLeft < (scroller.scrollWidth - itemWidth))
        // Позиция прокрутки расположена не в начале последнего элемента
        scroller.scrollBy({left: itemWidth, top: 0, behavior:'smooth'});
    else
        // Достигнут последний элемент. Возвращаемся к первому элементу, установив для позиции прокрутки 0
        scroller.scrollTo({left: 0, top: 0, behavior:'smooth'});
}
// TODO описание функций
function scrollToPrevItem() {
    if(scroller.scrollLeft != 0)
        // Позиция прокрутки расположена не в начале последнего элемента
        scroller.scrollBy({left: -itemWidth, top: 0, behavior:'smooth'});
    else
        // Это первый элемент. Переходим к последнему элементу, установив для позиции прокрутки ширину скроллера
        scroller.scrollTo({left: scroller.scrollWidth, top: 0, behavior:'smooth'});
}

//бургер
let burger = document.querySelector('.header_burger');
let menu = document.querySelector('.header_menu');
let body = document.querySelector("body");
let sectionTopAbout = document.querySelector(".section-top_about");
let langDiv = document.querySelector('.lang');

// TODO описание функций
function toggleBurger(){
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock'); //запрет скрола при открытом бургере
    langDiv.classList.toggle('in_burger');
    langDiv.classList.toggle('visible')
}

burger.addEventListener('click',function (){
    toggleBurger();
    if (langDiv.classList.contains('in_burger')) {
        menu.append(langDiv);
    } else {
        sectionTopAbout.append(langDiv);
    }
});
// смена языка
let ruBtn = langDiv.querySelector('#ru');
let enBtn = langDiv.querySelector('#en');
let ru_content = document.querySelectorAll('.ru_content');
let en_content = document.querySelectorAll('.en_content');
let content = [];
content.push.apply(content, ru_content);
content.push.apply(content, en_content);

ruBtn.addEventListener('click', function (){
    content.forEach(function (item){
        item.classList.remove('hide')
    })
    for (let item of en_content) {
        item.classList.add('hide')
    }
});
enBtn.addEventListener('click', function (){
    content.forEach(function (item){
        item.classList.remove('hide')
    })
    for (let item of ru_content) {
        item.classList.add('hide')
    }
});

// прокрутка по якорям
const anchors = document.querySelectorAll('.menu_link');
for (let anchor of anchors) {
    anchor.addEventListener('click', function (elem) {
        elem.preventDefault()
        // удаляем класс active у остальных элементов
        anchors.forEach(function (item){
            item.classList.remove('menu_link-active')
        })
        // добавляем класс active к элементу списка к которому скроллим
        anchor.classList.add('menu_link-active')
        //id блока к которому скроллим
        const blockID = anchor.getAttribute('href')
        // собственно скролл
        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
        toggleBurger();
    })
}

