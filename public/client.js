//Step 1: Define functions, objects and variables




//Step 2: Use functions, objects and variables(Triggers)
//when the page loads...
$(document).ready(function () {
    $('main').hide();
    $('.log-in-container').hide();
    $('.register-container').hide();
    $('.welcome-page').show();

});

//button triggers
$(document).on('click', '.show-login-container', function (event) {
    event.preventDefault();
    // alert("hi");
    $('main').hide();
    $('.register-container').hide();
    $('.log-in-container').show();
    $('.welcome-page').show();
});

$(document).on('click', '.show-registration-container', function (event) {
    event.preventDefault();
    // alert("hi");
    $('main').hide();
    $('.log-in-container').hide();
    $('.register-container').show();
    $('.welcome-page').show();
});

$(document).on('click', '.logout-button', function (event) {
    event.preventDefault();
    location.reload();
});

$(document).on('click', '.show-registration-container', function (event) {
    event.preventDefault();
    // alert("hi");
    $('main').hide();
    $('.log-in-container').hide();
    $('.register-container').show();
    $('.welcome-page').show();
});

$(document).on('click', '.about-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.about-page').show();
});

$(document).on('click', '.my-items-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.items-page .items-result').hide();
    $('.items-page .js-item-popup-list').hide();
    // $('main').hide();
    //$('main').hide();

    $('.items-page').show();
});

$(document).on('click', '.my-places-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.places-page').show();
});

$(document).on('click', '.my-areas-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.areas-page').show();
});

$(document).on('click', '.categories-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.categories-page').show();
});

$(document).on('click', '.items-page .create-new-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.popup').hide();
    $('.js-item-popup-list').show();
    $('.create-item-popup').show();
});

$(document).on('click', '.items-page .show-all-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-single-result-area').hide();
    $('.items-result').show();
    // $('.js-all-result-area').show();
});

//form trigger
$(document).submit('.login-form', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.about-page').show();

});









var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
