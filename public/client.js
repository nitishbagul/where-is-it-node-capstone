//Step 1: Define functions, objects and variables

function displayError(message) {
    $("#messageBox span").html(message);
    $("#messageBox").fadeIn();
    $("#messageBox").fadeOut(10000);
};

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

function deleteItemElements({
    itemId,
    categoryId,
    areaId,
    placeId
} = {}) {
    /*let itemId = $(this).data('itemid');
    let placeId = $(".move-item-form #move-place-selection option:selected").data('itemid');
    let placeName = $(".move-item-form #move-place-selection option:selected").text();
    let areaId = $(".move-item-form #move-area-selection option:selected").data('areaid');
    let areaName = $(".move-item-form #move-area-selection option:selected").text();
*/
    //displayError("hi");
    let updatedCategoryId;
    let updatedCategoryName;
    let updatedAreaId;
    let updatedAreaName;
    let updatedPlaceId;
    let updatedPlaceName;
    //validate the input
    if (categoryId !== undefined) {
        updatedCategoryId = "";
        updatedCategoryName = "";
    }
    if (areaId !== undefined) {
        updatedAreaId = "";
        updatedAreaName = "";
    }
    if (placeId !== undefined) {
        updatedPlaceId = "";
        updatedPlaceName = "";
    }
    if (itemId == undefined) {
        displayError("Cannot delete item fields");
    }

    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newItemObject = {
            id: itemId,
            categoryId: updatedCategoryId,
            categoryName: updatedCategoryName,
            placeId: updatedPlaceId,
            placeName: updatedPlaceName,
            areaId: updatedAreaId,
            areaName: updatedAreaName
        };
        console.log(newItemObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/items/remove/${itemId}`,
                dataType: 'json',
                data: JSON.stringify(newItemObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                //displayError("Item moved to a new place");
                console.log(result);
                //$('.move-item-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

}

//Delete Item
function deleteItem(itemId) {
    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/item/${itemId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            displayError("deleted item");
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

//Delete Place
function deletePlace(placeId) {
    event.preventDefault();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/place/${placeId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            displayError("deleted place");
            $(`div[data-placeentry='${placeId}']`).hide();
            $(".delete-place-popup").hide();

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            displayError("Unable to delete place");
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}



//Delete Area
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
            displayError("Area deleted succesfully");
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

//Delete Category
function deleteCategory(categoryId) {
    //console.log(categoryId);
    event.preventDefault();

    //make the api call using the payload above
    $.ajax({
            type: 'DELETE',
            url: `/category/${categoryId}`,
            dataType: 'json',
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            displayError("Category deleted succesfully");
            $(`li[data-categoryentry='${categoryId}']`).hide();
            $(".delete-category-popup").hide();
            removeItemsByCategory(categoryId);

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
<button role="button" class="cancel-button" data-itemid=${result._id}>Cancel</button>
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
<button role="button" class="cancel-button" data-areaid=${areaId}>Cancel</button>
</fieldset>`;
    //console.log(buildTheHtmlOutput);

    //use the HTML output to show it in all items table
    $(".areas-page .delete-area-form").html(buildTheHtmlOutput);
    $('.delete-area-form').data('areaid', areaId);

}

//Catch place id and dynamically generate item heading
function showDeletePlacePopup(placeId, placeName) {
    let buildTheHtmlOutput = "";

    buildTheHtmlOutput += `<h4>Deleting Place: ${placeName}</h4>`;
    buildTheHtmlOutput += `<fieldset name="delete-info" class="delete-info">
<button role="button" type="submit" class="delete-button" data-placeid=${placeId}>Delete</button>
<button role="button" class="cancel-button" data-placeid=${placeId}>Cancel</button>
</fieldset>`;
    //console.log(buildTheHtmlOutput);

    //use the HTML output to show it in all items table
    $(".places-page .delete-place-form").html(buildTheHtmlOutput);
    $('.delete-place-form').data('placeid', placeId);

}

function showMovePlacePopup(placeId, placeName) {
    //console.log(placeId, placeName);
    //console.log(buildTheHtmlOutput);
    $(".places-page .move-place-form h4").text(`Moving Place: ${placeName}`);
    $(".places-page .move-place-form .move-button").data('placeid', placeId);
    $('.move-place-form').data('placeid', placeId);
    populateAreasList();
}

function showMoveItemPopup(itemId, itemName) {
    //console.log(itemId, itemName);
    //console.log(buildTheHtmlOutput);
    $(".items-page .move-item-form h4").text(`Moving Item: ${itemName}`);
    $(".items-page .move-item-form .move-button").data('itemid', itemId);
    $('.move-item-form').data('itemid', itemId);
    populateAreasList();
}

function showDeleteCategoryPopup(categoryId, categoryName) {
    let buildTheHtmlOutput = "";

    buildTheHtmlOutput += `<h4>Deleting Category: ${categoryName}</h4>`;
    buildTheHtmlOutput += `<fieldset name="delete-info" class="delete-info">
<button role="button" type="submit" class="delete-button" data-categoryid=${categoryId}>Delete</button>
<button role="button" class="cancel-button" data-categoryid=${categoryId}>Cancel</button>
</fieldset>`;
    //console.log(buildTheHtmlOutput);

    //use the HTML output to show it in all items table
    $(".categories-page .delete-category-form").html(buildTheHtmlOutput);
    $('.delete-category-form').data('categoryid', categoryId);

}

function populateAreasList() {
    //displayError("hi");
    var username = $('.items-page .username').text();
    if ((username == "") || (username == undefined) || (username == null)) {
        displayError("Cannot find the user");
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
                buildTheHtmlOutput += `<option data-areaid=${resultValue._id}>${resultValue.areaName}</option>`;
            });
            //use the HTML output to show it in all items table
            $(".items-page .area-select-container #create-area-selection").html(buildTheHtmlOutput);
            $(".places-page .area-select-container #create-area-selection").html(buildTheHtmlOutput);
            $(".places-page .area-select-container #move-area-selection").html(buildTheHtmlOutput);
            $(".items-page .area-select-container #move-area-selection").html(buildTheHtmlOutput);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}

function populateCategoriesList() {
    //displayError("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/categories/get/all/${userId}`,
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
            let buildTheHtmlOutput = `<option>Select..</option>`;

            $.each(result.categoriesOutput, function (resultKey, resultValue) {
                buildTheHtmlOutput += `<option data-categoryid=${resultValue._id}>${resultValue.categoryName}</option>`;
            });
            //use the HTML output to show it in all items table
            $(".items-page .category-select-container #create-category-selection").html(buildTheHtmlOutput);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}

function populatePlacesList(areaId) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId,
        area: areaId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/places/get/all/${userId}/${areaId}`,
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

            let buildTheHtmlOutput = ``;

            $.each(result.placesOutput, function (resultKey, resultValue) {
                buildTheHtmlOutput += `<option data-placeid=${resultValue._id}>${resultValue.placeName}</option>`;
            });
            //use the HTML output to show it in all items table
            $(".items-page .place-select-container #create-place-selection").html(buildTheHtmlOutput);
            $(".items-page .move-item-form .place-select-container #move-place-selection").html(buildTheHtmlOutput);

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });

}

function populateAreas() {
    //displayError("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
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
            //console.log(result);
            if (result.areasOutput.length === 0) {
                displayError("No Areas found")
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

function populateCategories() {
    //displayError("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/categories/get/all/${userId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            //console.log(result);
            if (result.categoriesOutput.length === 0) {
                displayError("No Categories found")
            } else {

                let buildTheHtmlOutput = ``;

                $.each(result.categoriesOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li data-categoryentry=${resultValue._id}>`;
                    buildTheHtmlOutput += `<button class="collapsible">${resultValue.categoryName}</button>`;
                    buildTheHtmlOutput += `<div class="collapse-content">
<button role="button" class="all-items-button" data-categoryid=${resultValue._id}>Show Items</button>
<button role="button" class="delete-button" data-categoryid=${resultValue._id}>Delete</button>
</div>`;
                    buildTheHtmlOutput += `</li>`;
                });
                //use the HTML output to show it in all items table
                $(".categories-page .categories-list-all").html(buildTheHtmlOutput);
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

function populatePlaces() {
    //displayError("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/places/get/all/${userId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.placesOutput.length === 0) {
                displayError("No Places found")
            } else {

                let buildTheHtmlOutput = ``;

                $.each(result.placesOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li data-placeentry=${resultValue._id}>`;
                    buildTheHtmlOutput += `<button class="collapsible">${resultValue.placeName}</button>`;
                    buildTheHtmlOutput += `<div class="collapse-content">
<p>Current Area: ${resultValue.areaName}</p>
<button role="button" class="move-button" data-placeid=${resultValue._id}>Move</button>
<button role="button" class="all-items-button" data-placeid=${resultValue._id}>Show Items</button>
<button role="button" class="delete-button" data-placeid=${resultValue._id}>Delete</button>
</div>`;
                    buildTheHtmlOutput += `</li>`;
                });
                //use the HTML output to show it in all items table
                $(".places-page .js-all-places-result .places-list-all").html(buildTheHtmlOutput);
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
    //displayError("hi");
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
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
        displayError("Cannot find the user");
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

function populateSearchedPlace(placeName) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/places-search/${placeName}/${userId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            // console.log(result);
            if (result.placesOutput.length === 0) {
                displayError("No places found, please refine the search.")
            } else {
                let buildTheHtmlOutput = ``;

                $.each(result.placesOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li data-placeentry=${resultValue._id}>`;
                    buildTheHtmlOutput += `<button class="collapsible">${resultValue.placeName}</button>`;
                    buildTheHtmlOutput += `<div class="collapse-content">
<p>Current Area: ${resultValue.areaName}</p>
<button role="button" class="move-button" data-placeid=${resultValue._id}>Move</button>
<button role="button" class="all-items-button" data-placeid=${resultValue._id}>Show Items</button>
<button role="button" class="delete-button" data-placeid=${resultValue._id}>Delete</button>
</div>`;
                    buildTheHtmlOutput += `</li>`;
                });
                //use the HTML output to show it in all items table
                $(".places-page .js-single-place-result .places-list-all").html(buildTheHtmlOutput);
                $('.places-result').show();
                $('.js-single-place-result').show();
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

function showPlacesByArea(areaId) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId,
        area: areaId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/places/get/all/${userId}/${areaId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.placesOutput.length === 0) {
                $('.show-places-popup').hide();
                displayError("No Places found");
            } else {
                let buildTheHtmlOutput = `<h4>Showing Places - ${result.placesOutput[0].areaName}</h4>
<hr>
<ul>`;

                $.each(result.placesOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li>${resultValue.placeName}</li>`;
                });
                buildTheHtmlOutput += `</ul>`;
                //use the HTML output to show it in all items table
                $(".areas-page .js-areas-popup-list .show-places-popup").html(buildTheHtmlOutput);
                $('.js-areas-popup-list').show();
                $('.show-places-popup').show();

            }

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function showItemsByCategory(categoryId) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId,
        category: categoryId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/items/get/all/${userId}/${categoryId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.itemsOutput.length === 0) {
                displayError("No Items found");
                $(".categories-page .js-categories-popup-list .show-items-popup").hide();

            } else {


                let buildTheHtmlOutput = `<h4>Showing Items - ${result.itemsOutput[0].categoryName}</h4>
<hr>
<ul>`;

                $.each(result.itemsOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li>${resultValue.itemName}</li>`;
                });
                buildTheHtmlOutput += `</ul>`;
                //use the HTML output to show it in all items table
                $(".categories-page .js-categories-popup-list .show-items-popup").html(buildTheHtmlOutput);
                $('.js-categories-popup-list').show();
                $('.show-items-popup').show();
            }

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function removeItemsByCategory(categoryId) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId,
        category: categoryId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/items/get/all/${userId}/${categoryId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.itemsOutput.length === 0) {
                displayError("No Items found");
            } else {

                $.each(result.itemsOutput, function (resultKey, resultValue) {
                    deleteItemElements({
                        itemId: resultValue._id,
                        categoryId: categoryId
                    });
                });

            }

        })
        //if the call is failing
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

function showItemsByPlace(placeId) {
    var userId = $('#loggedInUserId').val();
    if ((userId == "") || (userId == undefined) || (userId == null)) {
        displayError("Cannot find the user");
    }
    //create the payload object (what data we send to the api call)
    const UserObject = {
        user: userId,
        place: placeId
    };
    //console.log(UserObject);
    //make the api call using the payload above
    $.ajax({
            type: 'GET',
            url: `/items/get/all/by/place/${userId}/${placeId}`,
            dataType: 'json',
            data: JSON.stringify(UserObject),
            contentType: 'application/json'
        })
        //if call is succefull
        .done(function (result) {
            console.log(result);
            if (result.itemsOutput.length === 0) {
                displayError("No Items found");
                $(".places-page .js-place-popup-list .show-items-popup").hide();

            } else {


                let buildTheHtmlOutput = `<h4>Showing Items - ${result.itemsOutput[0].placeName}</h4>
<hr>
<ul>`;

                $.each(result.itemsOutput, function (resultKey, resultValue) {
                    buildTheHtmlOutput += `<li>${resultValue.itemName}</li>`;
                });
                buildTheHtmlOutput += `</ul>`;
                //use the HTML output to show it in all items table
                $(".places-page .js-place-popup-list .show-items-popup").html(buildTheHtmlOutput);
                $('.js-place-popup-list').show();
                $('.show-items-popup').show();
            }

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
    $("#messageBox").hide();
    $('main').hide();
    $('.log-in-container').hide();
    $('.register-container').hide();
    $('.welcome-page').show();
});

//button triggers
$(document).on('click', '.show-login-container', function (event) {
    event.preventDefault();
    // displayError("hi");
    $('main').hide();
    $('.register-container').hide();
    $('.log-in-container').show();
    $('.welcome-page').show();
});

$(document).on('click', '.show-registration-container', function (event) {
    event.preventDefault();
    // displayError("hi");
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
    // displayError("hi");
    $('main').hide();
    $('.log-in-container').hide();
    $('.register-container').show();
    $('.welcome-page').show();
});

$(document).on('click', '.about-button', function (event) {
    event.preventDefault();
    this.style.backgroundColor = "#AD8424";
    //displayError("hi");
    $('main').hide();
    $('.about-page').show();
});

$(document).on('click', '.my-items-button', function (event) {
    event.preventDefault();
    this.style.backgroundColor = "#AD8424";
    //displayError("hi");
    $('main').hide();
    $('.items-page .items-result').hide();
    $('.items-page .js-item-popup-list').hide();
    // $('main').hide();
    //$('main').hide();

    $('.items-page').show();
});

$(document).on('click', '.my-places-button', function (event) {
    event.preventDefault();
    this.style.backgroundColor = "#AD8424";
    $('main').hide();
    $('.places-page .places-result').hide();
    $('.places-page .js-place-popup-list').hide();

    //displayError("hi");
    $('.places-page').show();
});

$(document).on('click', '.my-areas-button', function (event) {
    event.preventDefault();
    this.style.backgroundColor = "#AD8424";
    //displayError("hi");
    $('main').hide();
    $('.areas-result').hide();
    $('.js-areas-popup-list').hide();
    $('.areas-page').show();
});

$(document).on('click', '.categories-button', function (event) {
    event.preventDefault();
    this.style.backgroundColor = "#AD8424";
    //displayError("hi");
    $('main').hide();
    $('.categories-result').hide();
    $('.js-categories-popup-list').hide();
    $('.categories-page').show();
});

$(document).on('click', '.items-page .create-new-button', function (event) {
    event.preventDefault();
    // displayError("hi");
    $('.popup').hide();
    $('.items-result').hide();
    populateAreasList();
    populateCategoriesList();
    $('.js-item-popup-list').show();
    $('.create-item-popup').show();
});

$(document).on('click', '.items-page .show-all-button', function (event) {
    event.preventDefault();
    populateAllItems();
    // displayError("hi");
    $('.js-item-popup-list').hide();
    $('.js-single-result-area').hide();
    // console.log(username);
    $('.items-result').show();
    $('.js-all-result-area').show();
});

$(document).on('click', '.move-item-button', function (event) {
    event.preventDefault();
    let itemId = $(this).data('itemid');
    let itemName = $(this).closest('.item-options-container').prev('table').find('tbody tr:nth-of-type(2) td:nth-of-type(1)').text();
    console.log(itemId, itemName);
    // displayError("hi");
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    $('.create-item-popup').hide();
    $('.delete-item-popup').hide();
    showMoveItemPopup(itemId, itemName);
    $('.js-item-popup-list').show();
    $('.move-item-popup').show();
});

$(document).on('click', '.delete-item-button', function (event) {
    event.preventDefault();
    let itemId = $(this).data('itemid');
    // displayError("hi");
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
    // displayError("hi");
    $('.js-item-popup-list').hide();
    $('.js-all-result-area').hide();
    $('.create-item-popup').hide();
    $('.move-item-popup').hide();
    $('.js-item-popup-list').show();
    $('.delete-item-popup').show();
});

$(document).on('click', '.places-menu .create-new-button', function (event) {
    event.preventDefault();
    //displayError("hi");
    $('.popup').hide();
    $('.places-result').hide();
    populateAreasList();
    $('.js-place-popup-list').show();
    $('.create-place-popup').show();
});

$(document).on('click', '.places-menu .show-all-button', function (event) {
    event.preventDefault();
    // displayError("hi");
    $('.js-place-popup-list').hide();
    $('.js-single-place-result').hide();
    populatePlaces();
    $('.places-result').show();
    $('.js-all-places-result').show();
});

$(document).on('click', '.places-result .move-button', function (event) {
    event.preventDefault();
    let placeId = $(this).data('placeid');
    let placeName = $(this).closest('li').find('.collapsible').text();
    //displayError("hi");
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.create-place-popup').hide();
    $('.delete-place-popup').hide();
    $('.show-items-popup').hide();
    showMovePlacePopup(placeId, placeName);
    $('.js-place-popup-list').show();
    $('.move-place-popup').show();
});

$(document).on('click', '.places-result .all-items-button', function (event) {
    event.preventDefault();
    //displayError("hi");
    let placeId = $(this).data('placeid');
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.create-place-popup').hide();
    $('.delete-place-popup').hide();
    $('.move-place-popup').hide();
    showItemsByPlace(placeId);
    //$('.js-place-popup-list').show();
    //$('.show-items-popup').show();
});

$(document).on('click', '.places-result .delete-button', function (event) {
    event.preventDefault();
    let placeId = $(this).data('placeid');
    let placeName = $(this).closest('li').find('.collapsible').text();
    //displayError("hi");
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    $('.create-place-popup').hide();
    $('.show-items-popup').hide();
    $('.move-place-popup').hide();
    showDeletePlacePopup(placeId, placeName);
    $('.js-place-popup-list').show();
    $('.delete-place-popup').show();
});

$(document).on('click', '.areas-menu .create-new-button', function (event) {
    event.preventDefault();
    //displayError("hi");
    $('.popup').hide();
    $('.areas-result').hide();
    $('.js-areas-popup-list').show();
    $('.create-area-popup').show();
});

$(document).on('click', '.areas-menu .show-all-button', function (event) {
    event.preventDefault();
    // displayError("hi");
    $('.js-areas-popup-list').hide();
    populateAreas();
    $('.areas-result').show();
});

$(document).on('click', '.areas-result .all-places-button', function (event) {
    event.preventDefault();
    let areaId = $(this).data('areaid');
    //displayError("hi");
    $('.js-place-popup-list').hide();
    $('.create-area-popup').hide();
    $('.delete-area-popup').hide();
    showPlacesByArea(areaId);
});

$(document).on('click', '.areas-result .delete-button', function (event) {
    event.preventDefault();
    let areaId = $(this).data('areaid');
    let areaName = $(this).closest('li').find('.collapsible').text();
    //displayError("hi");
    $('.js-place-popup-list').hide();
    $('.create-area-popup').hide();
    $('.show-places-popup').hide();
    showDeleteAreaPopup(areaId, areaName);
    $('.js-areas-popup-list').show();
    $('.delete-area-popup').show();
});

$(document).on('click', '.categories-menu .create-new-button', function (event) {
    event.preventDefault();
    //displayError("hi");
    $('.popup').hide();
    $('.categories-result').hide();
    $('.js-categories-popup-list').show();
    $('.create-category-popup').show();
});

$(document).on('click', '.categories-menu .show-all-button', function (event) {
    event.preventDefault();
    // displayError("hi");
    $('.js-categories-popup-list').hide();
    populateCategories();
    $('.categories-result').show();
});

$(document).on('click', '.categories-result .all-items-button', function (event) {
    event.preventDefault();
    let categoryId = $(this).data('categoryid');
    //displayError("hi");
    $('.js-categories-popup-list').hide();
    $('.create-category-popup').hide();
    $('.delete-category-popup').hide();
    showItemsByCategory(categoryId);
    //$('.js-categories-popup-list').show();
    //$('.show-items-popup').show();
});

$(document).on('click', '.categories-result .delete-button', function (event) {
    event.preventDefault();
    let categoryId = $(this).data('categoryid');
    let categoryName = $(this).closest('li').find('.collapsible').text();
    //displayError("hi");
    $('.js-categories-popup-list').hide();
    $('.create-category-popup').hide();
    $('.show-items-popup').hide();
    showDeleteCategoryPopup(categoryId, categoryName);
    $('.js-categories-popup-list').show();
    $('.delete-category-popup').show();
});

$(document).on('click', '.delete-category-form .cancel-button', function (event) {
    event.preventDefault();
    //displayError("hi");
    $('.popup').hide();

});

/*$(document).on('click', '.create-area-selection', function (event) {
    event.preventDefault();
    //displayError("hi");
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
        displayError('Please input user name');
    } else if (password == "") {
        displayError('Please input password');
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
                displayError('Incorrect Username or Password');
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
        displayError('Please add an email');
    } else if (username == "") {
        displayError('Please add a user name');
    } else if (password == "") {
        displayError('Please add a password');
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
                // console.log(result);
                $('main').hide();
                $('.about-page').show();
                $('.username').text(result.username);
                $('#loggedInUserId').val(result._id);
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
    $('.items-page .js-single-result-area').show();
});

$('.delete-place-form').submit(function (event) {

    event.preventDefault();
    let placeId = $(this).data('placeid');
    //console.log(itemId);
    deletePlace(placeId);
    $('.places-result').show();
    $('.places-page .js-single-result-area').show();
});

$('.move-place-form').submit(function (event) {
    event.preventDefault();
    /*let placeId = $(this).data('placeid');
    let areaId = $(".move-place-form #move-area-selection option:selected").data('areaid');
    let areaName = $(".move-place-form #move-area-selection option:selected").text();
    //console.log(itemId);
    movePlace(placeId, areaId, areaName);
    //$('.places-result').show();
    //$('.places-page .js-single-result-area').show();*/
    event.preventDefault();
    //take the input from the user
    let placeId = $(this).data('placeid');
    let areaId = $(".move-place-form #move-area-selection option:selected").data('areaid');
    let areaName = $(".move-place-form #move-area-selection option:selected").text();
    //const placeName = $("#create-place-selection option:selected").text();

    //validate the input
    if (areaName == "Select..") {
        displayError('Please add an Area');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newPlaceObject = {
            id: placeId,
            areaName: areaName,
            areaId: areaId
        };
        console.log(newPlaceObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/places/${placeId}`,
                dataType: 'json',
                data: JSON.stringify(newPlaceObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                displayError("Place moved to new area");
                console.log(result);
                $('.move-place-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

$('.move-item-form').submit(function (event) {
    event.preventDefault();
    //take the input from the user
    let itemId = $(this).data('itemid');
    let placeId = $(".move-item-form #move-place-selection option:selected").data('itemid');
    let placeName = $(".move-item-form #move-place-selection option:selected").text();
    let areaId = $(".move-item-form #move-area-selection option:selected").data('areaid');
    let areaName = $(".move-item-form #move-area-selection option:selected").text();

    //validate the input
    if (areaName == "Select.." || areaName == "" || areaName == undefined) {
        displayError('Invalid Area selected');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newItemObject = {
            id: itemId,
            placeName: placeName,
            placeId: placeId,
            areaName: areaName,
            areaId: areaId
        };
        console.log(newItemObject);

        //make the api call using the payload above
        $.ajax({
                type: 'PUT',
                url: `/items/${itemId}`,
                dataType: 'json',
                data: JSON.stringify(newItemObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                displayError("Item moved to a new place");
                console.log(result);
                $('.move-item-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

$('.delete-area-form').submit(function (event) {

    event.preventDefault();
    let areaId = $(this).data('areaid');
    console.log(areaId);
    deleteArea(areaId);
    //$('.items-result').show();
    //$('.js-single-result-area').show();
});

$('.delete-category-form').submit(function (event) {

    event.preventDefault();
    let categoryId = $(this).data('categoryid');
    //console.log(areaId);
    deleteCategory(categoryId);
    //deleteItemCategory(categoryId);
    //$('.items-result').show();
    //$('.js-single-result-area').show();
});

$('#placesLookupForm').submit(function (event) {
    let placeSearchText = $('.places-content #placeSearchField').val();
    event.preventDefault();
    $('.js-place-popup-list').hide();
    $('.js-all-places-result').hide();
    populateSearchedPlace(placeSearchText);
});

$('.create-item-form').submit(function (event) {
    event.preventDefault();
    //take the input from the user
    const itemName = $("#item_name").val();
    const areaName = $("#create-area-selection option:selected").text();
    const areaId = $("#create-area-selection option:selected").data('areaid');
    const placeName = $("#create-place-selection option:selected").text();
    const placeId = $("#create-place-selection option:selected").data('placeid');
    const categoryName = $("#create-category-selection option:selected").text();
    const categoryId = $("#create-category-selection option:selected").data('categoryid');
    const loggedInUserName = $('.items-page .username').text();
    const loggedInUserId = $('#loggedInUserId').val();

    //validate the input
    if (itemName == "") {
        displayError('Please add an item');
    } else if (areaName == "Select..") {
        displayError('Please add an Area');
    } else if (placeName == "Select..") {
        displayError('Please add a Place');
    } else if (categoryName == "Select..") {
        displayError('Please add a Place');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newItemObject = {
            itemName: itemName,
            areaName: areaName,
            areaId: areaId,
            placeName: placeName,
            placeId: placeId,
            categoryName: categoryName,
            categoryId: categoryId,
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
                $("#item_name").val("");
                $('.create-item-popup').hide();
                displayError("Item created succesfully");
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
        displayError('Please add an item');
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
                displayError("Area created");
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

$('.create-category-form').submit(function (event) {
    event.preventDefault();

    //take the input from the user
    const categoryName = $('#category_name').val();
    const loggedInUserName = $('.categories-page .username').text();
    const loggedInUserId = $('#loggedInUserId').val();
    // console.log(itemName + areaName + placeName + categoryName);

    //validate the input
    if (categoryName == "") {
        displayError('Category name cannot be empty');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newCategoryObject = {
            categoryName: categoryName,
            loggedInUserName: loggedInUserName,
            loggedInUserId: loggedInUserId
        };
        //console.log(newItemObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/categories/create',
                dataType: 'json',
                data: JSON.stringify(newCategoryObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                displayError('Category Created');
                //console.log(result);
                $('#category_name').val('');
                $('.create-category-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});

$('.create-place-form').submit(function (event) {
    event.preventDefault();
    //take the input from the user
    const placeName = $("#place_name").val();
    const areaName = $(".places-page #create-area-selection option:selected").text();
    const areaId = $(".places-page #create-area-selection option:selected").data('areaid');
    const loggedInUserName = $('.places-page .username').text();
    const loggedInUserId = $('#loggedInUserId').val();
    // console.log(itemName + areaName + placeName + categoryName);

    //validate the input
    if (placeName == "") {
        displayError('Please add an item');
    } else if (areaName == "Select..") {
        displayError('Please add an Area');
    }
    //if the input is valid
    else {
        //create the payload object (what data we send to the api call)
        const newPlaceObject = {
            placeName: placeName,
            areaName: areaName,
            areaId: areaId,
            loggedInUserName: loggedInUserName,
            loggedInUserId: loggedInUserId
        };
        //console.log(newItemObject);

        //make the api call using the payload above
        $.ajax({
                type: 'POST',
                url: '/places/create',
                dataType: 'json',
                data: JSON.stringify(newPlaceObject),
                contentType: 'application/json'
            })
            //if call is succefull
            .done(function (result) {
                console.log(result);
                displayError("place created succefuly");
                $("#place_name").val("");
                $('.create-place-popup').hide();
            })
            //if the call is failing
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
    };

});


//Change event for dynamic dropdowns
$(document).on('change', '.create-item-form #create-area-selection', function (event) {
    var selectedAreaId = $('#create-area-selection option:selected').data('areaid');
    populatePlacesList(selectedAreaId);

});

$(document).on('change', '.move-item-form #move-area-selection', function (event) {
    var selectedAreaId = $('#move-area-selection option:selected').data('areaid');
    populatePlacesList(selectedAreaId);

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
