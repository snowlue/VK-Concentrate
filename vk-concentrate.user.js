// ==UserScript==
// @name         VK Concentrate
// @namespace    http://tampermonkey.net/
// @description  Нажмите Alt+A на любой странице ВКонтакте и сконцентрируйтесь на важном
// @version      1.5
// @author       PaveTranquil
// @match        https://*.vk.com/*
// @copyright    2021, PaveTranquil (https://vk.com/pavetranquil)
// @license      MIT
// @grant        none
// ==/UserScript==


window.addEventListener("keydown", function(e){
    // Проверяем Alt+A
    if(!e.altKey || e.keyCode !== 65) return;

    // Проверяем, включен ли аддон
    if (!is_enabled) {
        // Если отключён, создаём CSS-стили и включаем переключатель
        var style_elem = document.createElement("style");
        style_elem.className = "content_fullscreen";
        document.head.appendChild(style_elem).innerHTML = style;
        document.getElementById("chat_onl_wrap").style = "display: none"; // Отключаем мини-чат

        is_enabled = true;
        console.log("VK Concentrate is enabled.");
    }
    else {
        // Если включён, разрушаем тег CSS-стилей и отключаем переключатель
        var style_elem = document.head.getElementsByClassName("content_fullscreen");
        style_elem[0].parentNode.removeChild(style_elem[0]);
        document.getElementById("chat_onl_wrap").style = "display: block"; // Включаем мини-чат

        is_enabled = false;
        console.log("VK Concentrate is disabled.");
    }
});

var is_enabled = false; // Переключатель состояния аддона

var style =
    // Скрываем сайдбар и сдвигаем основной блок на центр
    ".side_bar {display: none;}" +
    "[dir] #page_body {padding-right: 82px;}" +

    // Скрываем из хедера поиск, колокол и лишние подписи
    "[dir=ltr] .HeaderNav__item--gap {display: none;}" +
    ".top_notify_btn {display: none;}" +
    ".TopNavBtn__profileArrow {display: none;}" +
    ".TopNavBtn__profileName {display: none;}" +
    "[dir] .HeaderNav__item:first-child {padding: 3px;}" +
    "[dir=ltr] .TopNavBtn__profileLink {padding-left: 0px;}" +

    // В плеере ставим центровку и отключаем разворачивание плейлиста
    ".HeaderNav__item--player {flex-grow: 0; margin-right: auto;}" +
    ".eltt_bottom {left: -361.7375px !important;}" +
    ".HeaderNav__btns {margin-left: auto;}" +
    ".TopHomeLink {width: auto;}";


if (document.location.href.indexOf("vk.com/bug") + 1) { // Проверяем, не находимся ли мы на vk.com/bugs или vk.com/bug123
    style = style + "[dir] #page_body {padding-right: 123px;}" +
                    ".narrow_column_wrap {display: none;}" // Если находимся, то подключаем спец.стили
}
