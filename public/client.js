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
    $('main').hide();
    $('.places-page .places-result').hide();
    $('.places-page .js-place-popup-list').hide();

    //alert("hi");
    $('.places-page').show();
});

$(document).on('click', '.my-areas-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.areas-result').hide();
    $('.js-areas-popup-list').hide();
    $('.areas-page').show();
});

$(document).on('click', '.categories-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('main').hide();
    $('.categories-result').hide();
    $('.js-categories-popup-list').hide();
    $('.categories-page').show();
});

$(document).on('click', '.items-page .create-new-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.popup').hide();
    $('.items-result').hide();
    $('.js-item-popup-list').show();
    $('.create-item-popup').show();
});

$(document).on('click', '.items-page .show-all-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-item-popup-list').hide();
    $('.js-single-result-area').hide();
    $('.items-result').show();
    $('.js-all-result-area').show();
});

$(document).on('click', '.move-item-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    $('.create-item-popup').hide();
    $('.delete-item-popup').hide();
    $('.js-item-popup-list').show();
    $('.move-item-popup').show();
});

$(document).on('click', '.delete-item-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    $('.create-item-popup').hide();
    $('.move-item-popup').hide();
    $('.js-item-popup-list').show();
    $('.delete-item-popup').show();
});

$(document).on('click', '.places-menu .create-new-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.popup').hide();
    $('.places-result').hide();
    $('.js-place-popup-list').show();
    $('.create-place-popup').show();
});

$(document).on('click', '.places-menu .show-all-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-place-popup-list').hide();
    $('.js-single-place-result').hide();
    $('.places-result').show();
    $('.js-all-places-result').show();
});

$(document).on('click', '.places-result .move-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.create-place-popup').hide();
    $('.delete-place-popup').hide();
    $('.show-items-popup').hide();
    $('.js-place-popup-list').show();
    $('.move-place-popup').show();
});

$(document).on('click', '.places-result .all-items-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.create-place-popup').hide();
    $('.delete-place-popup').hide();
    $('.move-place-popup').hide();
    $('.js-place-popup-list').show();
    $('.show-items-popup').show();
});

$(document).on('click', '.places-result .delete-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.create-place-popup').hide();
    $('.show-items-popup').hide();
    $('.move-place-popup').hide();
    $('.js-place-popup-list').show();
    $('.delete-place-popup').show();
});

$(document).on('click', '.areas-menu .create-new-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.popup').hide();
    $('.areas-result').hide();
    $('.js-areas-popup-list').show();
    $('.create-area-popup').show();
});

$(document).on('click', '.areas-menu .show-all-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-areas-popup-list').hide();
    $('.areas-result').show();
});

$(document).on('click', '.areas-result .all-places-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-place-popup-list').hide();
    $('.create-area-popup').hide();
    $('.delete-area-popup').hide();
    $('.js-areas-popup-list').show();
    $('.show-places-popup').show();
});

$(document).on('click', '.areas-result .delete-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-place-popup-list').hide();
    $('.create-area-popup').hide();
    $('.show-places-popup').hide();
    $('.js-areas-popup-list').show();
    $('.delete-area-popup').show();
});

$(document).on('click', '.categories-menu .create-new-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.popup').hide();
    $('.categories-result').hide();
    $('.js-categories-popup-list').show();
    $('.create-category-popup').show();
});

$(document).on('click', '.categories-menu .show-all-button', function (event) {
    event.preventDefault();
    // alert("hi");
    $('.js-categories-popup-list').hide();
    $('.categories-result').show();
});

$(document).on('click', '.categories-result .all-items-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-categories-popup-list').hide();
    $('.create-category-popup').hide();
    $('.delete-category-popup').hide();
    $('.js-categories-popup-list').show();
    $('.show-items-popup').show();
});

$(document).on('click', '.categories-result .delete-button', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-categories-popup-list').hide();
    $('.create-category-popup').hide();
    $('.show-items-popup').hide();
    $('.js-categories-popup-list').show();
    $('.delete-category-popup').show();
});

//form trigger
$('.login-form').submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const username = $("#loginUserName").val();
    const password = $("#loginPassword").val();

    //validate the input
    if (username == "") {
        alert('Please input user name');
    } else if (password == "") {
        alert('Please input password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const loginUserObject = {
            username: username,
            password: password
        };
        console.log(loginUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/login',
                dataType: 'json',
                data: JSON.stringify(loginUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('main').hide();
                $('.about-page').show();
                /* $('section').hide();
                 $('.navbar').show();
                 $('#user-dashboard').show();
                 populateUserDashboardDate(result.username);*/
                $('.username').text(result.username);
                $('#loggedInUserId').val(result._id);

            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                alert('Incorrect Username or Password');
            });
    };

});

$('.register-form').submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const email = $("#registerEmail").val();
    const username = $("#registerUserName").val();
    const password = $("#registerPassword").val();

    //validate the input
    if (email == "") {
        alert('Please add an email');
    } else if (username == "") {
        alert('Please add a user name');
    } else if (password == "") {
        alert('Please add a password');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newUserObject = {
            email: email,
            username: username,
            password: password
        };
        // console.log(newUserObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/users/create',
                dataType: 'json',
                data: JSON.stringify(newUserObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                $('main').hide();
                $('.about-page').show();
                /*$('#loggedInName').text(result.name);
                $('#loggedInUserName').val(result.username);
                $('section').hide();
                $('.navbar').show();
                $('#user-dashboard').show();
                populateUserDashboardDate(result.username);*/
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

$('#itemsLookupForm').submit(function (event) {
    event.preventDefault();
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    $('.items-result').show();
    $('.js-single-result-area').show();
});

$('#placesLookupForm').submit(function (event) {
    event.preventDefault();
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.places-result').show();
    $('.js-single-place-result').show();
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
