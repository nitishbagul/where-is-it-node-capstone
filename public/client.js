//Step 1: Define functions, objects and variables


/*

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


//form trigger
$(document).submit('.login-form', function (event) {
    event.preventDefault();
    alert("hi");
    $('main').hide();
    $('.items-page').show();

});

*/







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
