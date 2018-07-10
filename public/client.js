//Step 1: Define functions, objects and variables

//Execute Collpsible
function executeCollapsible() {
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
}

//Delete Item
function deleteItem(itemId) {
    event.preventDefault();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/item/${itemId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            alert("deleted item");
            $(`div[data-itementry='${itemId}']`).hide();
            $(".delete-item-popup").hide();

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//Delete Item
function deleteArea(areaId) {
    console.log(areaId);
    event.preventDefault();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/area/${areaId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            alert("Area deleted succesfully");
            $(`li[data-areaentry='${areaId}']`).hide();
            $(".delete-area-popup").hide();

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


//Catch item id and dynamically generate item heading
function showDeleteItemPopup(itemId) {
    //create the payload object (what data we send to the api call)
    const UserObject = {
        item: itemId
    };
    $.ajax({
            type: 'GET',
            url: `/item/${itemId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            /*if (result.entriesOutput.length === 0) {
                        $('#no-entry').show();
                    } else {
                        $('#no-entry').hide();
                    }

                    //empty the user-list container before populating it dynamically
                    $('#user-list').html("");
                    htmlUserDashboard(result);*/
            let buildTheHtmlOutput = "";

            buildTheHtmlOutput += `<h4 class="delete-item-heading">Deleting Item: ${result.itemName}</h4>`;
            buildTheHtmlOutput += `<fieldset name="delete-info" class="delete-info">
<button role="button" type="submit" class="delete-button" data-itemid=${result._id}>Delete</button>
<button role="button" type="submit" class="cancel-button" data-itemid=${result._id}>Cancel</button>
</fieldset>`;
            //console.log(buildTheHtmlOutput);

            //use the HTML output to show it in all items table
            $(".items-page .delete-item-form").html(buildTheHtmlOutput);
            $('.delete-item-form').data('itemid', result._id);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//Catch item id and dynamically generate item heading
function showDeleteAreaPopup(areaId, areaName) {
    let buildTheHtmlOutput = "";

    buildTheHtmlOutput += `<h4>Deleting Area: ${areaName}</h4>`;
    buildTheHtmlOutput += `<fieldset name="delete-info" class="delete-info">
<button role="button" type="submit" class="delete-button" data-areaid=${areaId}>Delete</button>
<button role="button" type="submit" class="cancel-button" data-areaid=${areaId}>Cancel</button>
</fieldset>`;
    //console.log(buildTheHtmlOutput);

    //use the HTML output to show it in all items table
    $(".areas-page .delete-area-form").html(buildTheHtmlOutput);
    $('.delete-area-form').data('areaid', areaId);

}

function populateAreasList() {
    //alert("hi");
    var username = $('.items-page .username').text();
    if ((username == "") || (username == undefined) || (username == null)) {
        alert("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: username
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/areas/${username}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            //console.log(result);
            /*if (result.entriesOutput.length === 0) {
                    $('#no-entry').show();
                } else {
                    $('#no-entry').hide();
                }

                //empty the user-list container before populating it dynamically
                $('#user-list').html("");
                htmlUserDashboard(result);*/
            let buildTheHtmlOutput = "<option>Select..</option>";

            $.each(result.areasOutput, function (resultKey, resultValue) {
                //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
                buildTheHtmlOutput += `<option>${resultValue.areaName}</option>`;
            });
            //use the HTML output to show it in all items table
            $(".items-page .area-select-container #create-area-selection").html(buildTheHtmlOutput);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}

function populateAreas() {
    //alert("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        alert("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/areas/get/all/${userId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.areasOutput.length === 0) {
                alert("No Areas found")
            } else {

                let buildTheHtmlOutput = ``;

                $.each(result.areasOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li data-areaentry=${resultValue._id}>`;
                    buildTheHtmlOutput += `<button class="collapsible">${resultValue.areaName}</button>`;
                    buildTheHtmlOutput += `<div class="collapse-content">
<button role="button" class="all-places-button" data-areaid=${resultValue._id}>Show Places</button>
<button role="button" class="delete-button" data-areaid=${resultValue._id}>Delete</button>
</div>`;
                    buildTheHtmlOutput += `</li>`;
                });
                //use the HTML output to show it in all items table
                $(".areas-page .areas-list-all").html(buildTheHtmlOutput);
                executeCollapsible();
            }

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}


function populateAllItems() {
    //alert("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        alert("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/items/get/all/${userId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            //console.log(result);
            /*if (result.entriesOutput.length === 0) {
                    $('#no-entry').show();
                } else {
                    $('#no-entry').hide();
                }

                //empty the user-list container before populating it dynamically
                $('#user-list').html("");
                htmlUserDashboard(result);*/
            let buildTheHtmlOutput = `<tr>
<th>Name</th>
<th>Place</th>
<th>Area</th>
<th>Category</th>
</tr>`;

            $.each(result.itemsOutput, function (resultKey, resultValue) {
                //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
                buildTheHtmlOutput += `<tr>`;
                buildTheHtmlOutput += `<td data-th="Name">${resultValue.itemName}</td>`;
                buildTheHtmlOutput += `<td data-th="Place">${resultValue.placeName}</td>`;
                buildTheHtmlOutput += `<td data-th="Area">${resultValue.areaName}</td>`;
                buildTheHtmlOutput += `<td data-th="Category">${resultValue.categoryName}</td>`;
                buildTheHtmlOutput += `</tr>`;
            });
            //use the HTML output to show it in all items table
            $(".js-all-result-area .all-items-table").html(buildTheHtmlOutput);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function populateSearchedItem(itemName) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        alert("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/items-search/${itemName}/${userId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            // console.log(result);
            /*if (result.entriesOutput.length === 0) {
                        $('#no-entry').show();
                    } else {
                        $('#no-entry').hide();
                    }

                    //empty the user-list container before populating it dynamically
                    $('#user-list').html("");
                    htmlUserDashboard(result);*/

            let buildTheHtmlOutput = ``;


            $.each(result.itemsOutput, function (resultKey, resultValue) {
                buildTheHtmlOutput += `<div data-itementry=${resultValue._id}>`;
                buildTheHtmlOutput += `<table class="all-items-table">
<tr>
<th>Name</th>
<th>Place</th>
<th>Area</th>
<th>Category</th>
</tr>`;

                buildTheHtmlOutput += `<tr>`;
                buildTheHtmlOutput += `<td data-th="Name">${resultValue.itemName}</td>`;
                buildTheHtmlOutput += `<td data-th="Place">${resultValue.placeName}</td>`;
                buildTheHtmlOutput += `<td data-th="Area">${resultValue.areaName}</td>`;
                buildTheHtmlOutput += `<td data-th="Category">${resultValue.categoryName}</td>`;
                buildTheHtmlOutput += `</tr>`;
                buildTheHtmlOutput += `</table>`;
                buildTheHtmlOutput += `<div class="item-options-container">
<button class="move-item-button" data-itemid=${resultValue._id}>Move</button>
<button class="delete-item-button" data-itemid=${resultValue._id}>Delete</button>
</div>`;
                buildTheHtmlOutput += '</div>';
            });
            //use the HTML output to show it in all items table
            $(".js-single-result-area .single-item-container").html(buildTheHtmlOutput);


        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


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
    populateAllItems();
    // alert("hi");
    $('.js-item-popup-list').hide();
    $('.js-single-result-area').hide();
    // console.log(username);
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
    let itemId = $(this).data('itemid');
    // alert("hi");
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    $('.create-item-popup').hide();
    $('.move-item-popup').hide();
    showDeleteItemPopup(itemId);
    $('.js-item-popup-list').show();
    $('.delete-item-popup').show();
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
    populateAreas();
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
    let areaId = $(this).data('areaid');
    let areaName = $(this).closest('li').find('.collapsible').text();
    //alert("hi");
    $('.js-place-popup-list').hide();
    $('.create-area-popup').hide();
    $('.show-places-popup').hide();
    showDeleteAreaPopup(areaId, areaName);
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

/*$(document).on('click', '.create-area-selection', function (event) {
    event.preventDefault();
    //alert("hi");
    $('.js-categories-popup-list').hide();
    $('.create-category-popup').hide();
    $('.show-items-popup').hide();
    $('.js-categories-popup-list').show();
    $('.delete-category-popup').show();
});*/



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
        //console.log(loginUserObject);

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
                // console.log(result);
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
                //console.log(result);
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
    let itemSearchText = $('.items-content #itemSearchField').val();
    //console.log(itemSearchText);
    event.preventDefault();
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    populateSearchedItem(itemSearchText);
    $('.items-result').show();
    $('.js-single-result-area').show();
});

$('.delete-item-form').submit(function (event) {

    event.preventDefault();
    let itemId = $(this).data('itemid');
    //console.log(itemId);
    deleteItem(itemId);
    $('.items-result').show();
    $('.js-single-result-area').show();
});

$('.delete-area-form').submit(function (event) {

    event.preventDefault();
    let areaId = $(this).data('areaid');
    console.log(areaId);
    deleteArea(areaId);
    //$('.items-result').show();
    //$('.js-single-result-area').show();
});

$('#placesLookupForm').submit(function (event) {
    event.preventDefault();
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.places-result').show();
    $('.js-single-place-result').show();
});

$('.create-item-form').submit(function (event) {
    event.preventDefault();
    //take the input from the user
    const itemName = $("#item_name").val();
    const areaName = $("#create-area-selection option:selected").text();
    const placeName = $("#create-place-selection option:selected").text();
    const categoryName = $("#create-category-selection option:selected").text();
    const loggedInUserName = $('.items-page .username').text();
    const loggedInUserId = $('#loggedInUserId').val();
    // console.log(itemName + areaName + placeName + categoryName);

    //validate the input
    if (itemName == "") {
        alert('Please add an item');
    } else if (areaName == "Select..") {
        alert('Please add an Area');
    } else if (placeName == "Select..") {
        alert('Please add a Place');
    } else if (categoryName == "Select..") {
        alert('Please add a Place');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newItemObject = {
            itemName: itemName,
            areaName: areaName,
            placeName: placeName,
            categoryName: categoryName,
            loggedInUserName: loggedInUserName,
            loggedInUserId: loggedInUserId
        };
        //console.log(newItemObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/items/create',
                dataType: 'json',
                data: JSON.stringify(newItemObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                //console.log(result);
                $('.create-item-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

$('.create-area-form').submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const areaName = $('#area_name').val();
    const loggedInUserName = $('.areas-page .username').text();
    const loggedInUserId = $('#loggedInUserId').val();
    // console.log(itemName + areaName + placeName + categoryName);

    //validate the input
    if (areaName == "") {
        alert('Please add an item');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newItemObject = {
            areaName: areaName,
            loggedInUserName: loggedInUserName,
            loggedInUserId: loggedInUserId
        };
        //console.log(newItemObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/areas/create',
                dataType: 'json',
                data: JSON.stringify(newItemObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                //console.log(result);
                $('#area_name').val('');
                $('.create-area-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

$(document).on('change', '.create-item-form #create-area-selection', function (event) {
    populatePlacesList();

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
