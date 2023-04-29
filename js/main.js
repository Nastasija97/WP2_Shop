
'use strict';
(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {


        //preloader 

        /*------------------
            Gallery filter
        --------------------*/
        $('.filter__controls li').on('click', function () {
            $('.filter__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.product__filter').length > 0) {
            var containerEl = document.querySelector('.product__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    /*------------------
        Navigation
    --------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Accordin Active
    --------------------*/
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    /*-----------------------
        Hero Slider
    ------------------------*/
    $(".hero__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='arrow_left'><span/>", "<span class='arrow_right'><span/>"],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false
    });

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*-------------------
        Radio Btn
    --------------------- */
    $(".product__color__select label, .shop__sidebar__size label, .product__details__option__size label").on('click', function () {
        $(".product__color__select label, .shop__sidebar__size label, .product__details__option__size label").removeClass('active');
        $(this).addClass('active');
    });

    /*-------------------
        Scroll
    --------------------- */
    $(".nice-scroll").niceScroll({
        cursorcolor: "#0d0d0d",
        cursorwidth: "15px",
        background: "#e5e5e5",
        cursorborder: "",
        autohidemode: true,
        horizrailenabled: false
    });



    /*------------------
        Magnific
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*-------------------
        Quantity change
    --------------------- */





})(jQuery);


//MY CODE 2023 NASTASIJA PEROVIC 13/20




//back to top button
const backToTopBtn = document.getElementById("back-to-top-btn");

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


//active link function 
function activeLink(link) {
    // Get all links in the ul element
    const links = link.parentNode.parentNode.getElementsByTagName("a");

    // Loop through each link and remove the "active" class
    for (let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
    }

    // Add the "active" class to the clicked link
    link.classList.add("active");
}

//data




var nav = [];

var categories = [];
var brands = [];
var sizes = [];
var tags = [];
var menu = [];
var allProducts = [];


var categories = [];
var url = window.location.href;
//console.log(url);
//function for fetching data from json
function fetchData(file, callback) {
    fetch("./data/" + file)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(err => console.log(err));
}
function getAllProducts(data) {
    data.forEach(el => {
        allProducts.push(el);
        //console.log(el);
    });
    // console.log(allProducts);
    setItemToLS("allProducts", allProducts);
}
function getAllObjects(data, objName) {
    data.forEach(el => {
        objName.push(el);
    });
    setItemToLS(objName, objName);
}
//local storage functions
function setItemToLS(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
}
function getItemFromLS(name) {
    return JSON.parse(localStorage.getItem(name));
}
function removeItemFromLS(name) {
    return localStorage.removeItem(name);
}


//checking for any products in cart
function anyInCart() {
    return getItemFromLS("products");
}
//function for validating single input


function validateInput(regEx, element, err, errMess) {
    if (!$(element).val().match(regEx)) {
        $(element).addClass("error");
        $(err).html(errMess); // added this line to display the error message
        return false;
    } else {
        $(element).removeClass("error");
        $(element).addClass("ok");
        $(err).html(""); // added this line to clear the error message when input is valid
        return true;
    }
}
// regex
var reName = /^[A-ZČĆŠĐŽ][a-zčćšđž]{2,19}(\s[A-ZČĆŠĐŽ][a-zčćšđž]{2,19})*$/;
var reEmail = /^[\w\.\-]+\@([a-z0-9]+\.)+[a-z]{2,3}$/;
var reSubject = /^([1-zćčžđšA-ZČĆŠĐŽ0-1@.\s]{2,20})$/;
var reAddress = /^([A-ZČĆŠĐŽ]|[1-9]{1,5})[A-ZČĆŠĐŽa-zčćšđž\d\-\.\s]+$/;
var reMessage = /^([1-zćčžđšA-ZČĆŠĐŽ0-1@.\s]{2,255})$/;
var reCreditCard = /^[0-9]{16}$/;

var messName = "Name must begin with a capital letter";
var messEmail = "Email must contain an @ sign";
var messSubject = "Subject can contain 20 characters";
var messMessage = "Message can contain 255 characters";
var messAddress = "Please enter your address";
var messCreditCard = "Credit card contains 16 digits";



window.onload = function () {
    try {

        fetchData("nav.json", displayNav);
        fetchData("products.json", getAllProducts);
        //cart icon displaying num of different products in cart
        const productsLS = getItemFromLS("products") || [];
        // console.log(productsLS);

        $(".number-of-products span").html(`</strong>${productsLS.length}</strong>`);
        $('.add-to-cart').on("cick", function (event) {

            // event.preventDefault(); // prevent the default behavior of the link
            $('.cart-modal-content').addClass('show-cart-modal');
            setTimeout(function () {
                $('.cart-modal-content').removeClass('show-cart-modal');
            }, 1000); // hide the modal after 2 seconds (adjust as needed)
            //update number of prods
            console.log('uslo');
            $(".number-of-products span").html(`</strong>${productsLS.length}</strong>`);
        });


    }
    catch (e) {
        $(".error").html(e.message());
    }

    //console.log(allProducts);
    //console.log(url);
    if (url == "http://127.0.0.1:5501/index.html" ||
        url == "https://nastasija97.github.io/WP2_Shop/" ||
        url == "https://nastasija97.github.io/WP2_Shop/index.html") {
        try {
            fetchData("products.json", displayTopProducts);
        }
        catch (e) {
            $(".error").html(e.message());
        }
        function displayTopProducts(data) {

            let html = "";
            data.forEach(el => {
                if (el.top) {
                    html += displaySingleProduct(el);

                }

            });
            $("#top-products").html(html);
        }
    }


    if (url == "http://127.0.0.1:5501/about.html" || url == "https://nastasija97.github.io/WP2_Shop/about.html") {

    }
    if (url == "http://127.0.0.1:5501/shop.html" || url == "https://nastasija97.github.io/WP2_Shop/shop.html") {

        try {
            fetchData("categories.json", displayCategories);
            fetchData("brands.json", displayBrands);
            fetchData("products.json", displayProducts);
            fetchData("sizes.json", displaySizes);
            fetchData("tags.json", displayTags);


        }
        catch (e) {
            $(".error").html(e.message);
        }
        //change actions
        $("#sort").change(filterChange);
        $("#search").keyup(filterChange);





        function filterChange() {
            fetchData("products.json", displayProducts);

        }

    }

    //display functions

    function displayNav(data) {
        let h = "<ul>";
        data.forEach(element => {
            h += `<li><a href="${element.path}" >${element.name}</a></li>
                    `;

            nav.push(element);
        });
        h += "</ul>"
        $("#nav").html(h);
        $(".slicknav_hidden").html(h);

    }
    function displaySingleProduct(el) {
        let html = "";
        return html = ` <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
        <div class="product__item sale">
            <div class="product__item__pic set-bg" data-setbg="${el.picture.src}"
            style="background-image: url('${el.picture.src}');">
            ${el.isOnSale ? '<span class="label">Sale</span>' : ""}
                <ul class="product__hover">
                    <li><a href="#"><img src="img/icon/heart.png" alt="add to favs"></a></li>
                    <li><a href="#"><img src="img/icon/compare.png" alt="compare"> <span>Compare</span></a></li>
                </ul>
            </div>
            <div class="product__item__text">
                <h6>${el.name}</h6>
                <a class="add-to-cart"><button type="button" class="btn btn-secondary btnCart" data-id="${el.id}"
                data-bs-toggle="modal" data-bs-target="#cartModal"  style="position: relative; top: -40px;">Add to cart</button></a>
                <div class="rating">
                  ${stars(el.stars)}
                </div>
                <h5>$${el.price.current}</h5>
             ${isSale(el.price.old)}
           
            </div>
        </div>
    </div>   `;
    }
    function displayBrands(data) {
        let html = `<ul class="nice-scroll">`;
        data.forEach(e => {
            html += `<li class="list-group-item">
            <input type="checkbox" value="${e.id}" class="brand"
            name="
            brand"/> ${e.name}
            </li>`;
            brands.push(e);
        });
        html += "</ul>";
        $("#brands").html(html);
        $(".brand").on("change", function () {

            setTimeout(fetchData("products.json", displayProducts), 3000);
        });
    }
    function displaySizes(data) {
        let html = `<div class="shop__sidebar__size" id="sizes">`;
        data.forEach(e => {
            html += `<label for="${e.name}">${e.name}
                    <input type="radio" id="${e.name}">
                </label>`;
            sizes.push(e);
        });
        html += `</div>`;
        $('#sizes').html(html);
    }

    function displayTags(data) {
        let html = ` <div class="shop__sidebar__tags">`;
        data.forEach(e => {
            html += ` 
                    <a href="#">${e.name}</a>
                  
                    
                `;
            tags.push(e);

        });
        // console.log(tags);
        html += `</div>`;
        $('#tags').html(html);
    }
    function displayCategories(data) {
        let html = `<ul class="nice-scroll">`;
        data.forEach(el => {
            html += `<li class="list-group-item">
            <input type="checkbox" value="${el.id}" class="category"
            name="categories"/> ${el.name}
            </li>`;
            categories.push(el);
        });
        $("#categories").html(html);
        $(".category").on("change", function () {

            setTimeout(fetchData("products.json", displayProducts), 3000);
        });
    }
    function displayProducts(data) {
        data = filterByCategory(data);
        data = filterByBrands(data);
        data = sorting(data);
        data = search(data);
        let html = "";
        if (data.length == 0) {
            html += `<p class="alert alert-danger">There is no products for selected category</p>`;
        }
        else {
            data.forEach(el => {
                html += displaySingleProduct(el);
            });
        }
        $("#products").html(html);
        $(".btnCart").on("click", addToCart);


    }
    //logic functions
    function isSale(data) {
        let html = "";
        if (data) {
            html += `<del>${data}</del> 
                `;
            $('.product__item__pic').html(`<span class="label">Sale</span>`);


        }

        return html;
    }
    function stars(data) {
        let html = "";
        for (let i = 0; i < data; i++) {
            html += `<i class="fa fa-star"></i>`;
        }
        for (let i = 0; i < 5 - data; i++) {
            html += `<i class="fa fa-star-o"></i>`;
        }
        return html;
    }
    function filterByCategory(data) {
        let selectedCategories = [];
        $('.category:checked').each(function (el) {
            selectedCategories.push(parseInt($(this).val()));
        });
        //  console.log(selectedCategories);
        if (selectedCategories.length != 0) {
            return data.filter(x => selectedCategories.includes(x.category));
        }
        return data;
    }
    function filterByBrands(data) {
        let selectedBrands = [];
        $('.brand:checked').each(function (el) {
            selectedBrands.push(parseInt($(this).val()));
        });

        if (selectedBrands.length != 0) {
            return data.filter(x => selectedBrands.includes(x.brand));
        }
        return data;
    }
    function sorting(data) {
        let sortingType = $("#sort").val();
        // console.log(sortingType);
        //   console.log(data);
        if (sortingType == 'ascName') {
            return data.sort((a, b) => a.name > b.name ? 1 : -1);
        }
        else if (sortingType == 'descName') {
            return data.sort((a, b) => a.name < b.name ? 1 : -1);
        }
        else if (sortingType == 'ascPrice') {
            return data.sort((a, b) => a.price.current > b.price.current ? -1 : 1);
        }
        else if (sortingType == 'descPrice') {
            return data.sort((a, b) => a.price.current > b.price.current ? 1 : -1);
        }
        else if (sortingType == 'ascRates') {
            return data.sort((a, b) => a.stars < b.stars ? 1 : -1);
        }
        else if (sortingType == 'descRates') {
            return data.sort((a, b) => a.stars > b.stars ? 1 : -1);
        } else { return data; }
    }
    function search(data) {
        let searchValue = $("#search").val().toLowerCase();
        if (searchValue) {
            return data.filter(function (el) {
                return el.name.toLowerCase().indexOf(searchValue) !== -1;
            })
        }
        return data;
    }
    //function addToCart
    function addToCart() {
        var id = $(this).data('id');
        //console.log(id);
        var productsLS = anyInCart();

        if (!productsLS) {
            let productsLS = [];
            productsLS[0] = { //adding the first one
                id: id,
                quantity: 1
            };
            setItemToLS("products", productsLS);
        }
        else {
            if (!findInLocalStorage(productsLS, id)) {
                addToLocalStorage(id) //adding the different one
                //console.log("tu")
            }
            else {
                updateQuantity(id); //if product alrady exist in cart, updating quantity
            }
        }
    }
    //finding product in local storage
    function findInLocalStorage(prod, id) {
        return prod.find(p => p.id == id);
    }
    //adding product in cart
    function addToLocalStorage(id) {
        let productsLS = anyInCart();
        productsLS.push({
            id: id,
            quantity: 1
        });
        setItemToLS("products", productsLS);
    }
    //if product already exist in cart, update quantity
    function updateQuantity(id) {
        let productsLS = anyInCart();
        productsLS.forEach(el => {
            if (el.id == id)
                el.quantity++;
        });
        setItemToLS("products", productsLS);
    }
    console.log(url);

    if (url == "http://127.0.0.1:5501/shopping-cart.html" || url == "https://nastasija97.github.io/WP2_Shop/shopping-cart.html") {

        function displayCart() {
            let html = `
            <div id="orderTable"class="shopping__cart__table">
            <table class="table">
            <thead>
            <tr>
            <td>Product Name</td>
            <td>Image</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Sum</td>
            <td></td>
          
            </tr>
            </thead>`;
            let productsLS = getItemFromLS("products");
            var products = getItemFromLS("allProducts");
            // console.log(productsLS);
            // console.log(products);
            products = products.filter(el => {
                for (let p of productsLS) {
                    if (el.id == p.id) {
                        el.quantity = p.quantity;
                        return true;
                    }
                }
            });
            // console.log(productsLS);

            products.forEach(el => {

                html += `<tbody>
                <tr data-product-id="${el.id}">
                  <td class="product__cart__item__text"><p>${el.name}</p></td>
                  <td class="">
                    <img src="${el.picture.src}" alt="${el.picture.alt}" class="img-thumbnail" width="100"/>
                  </td>
                  <td class="price product__cart__item__text">$${el.price.current}</td>
                  <td class="quantity quantity__item">
                    <div class="quantity">
                      <div class="pro-qty-2">
                        <input id="quantityInput${el.id}" class="quantityInput" type="number" value="${el.quantity}">
                      </div>
                    </div>
                  </td>
                  <td id="productSum${el.id}" class="productSum cart__price">${productPrice(el)}$ </td>
                  <td class="cart__close remove-product"><i class="fa fa-close"></i></td>
                </tr>
              </tbody>`;
            });
            html += `<table>
                </div>
                <div class="container">
                <div class="row d-flex justify-content-end" id="controls">
                <p id="totalSum" class="m-2">Total Sum:${sum(products)}</p>
                <button id="removeAll" class="btn btn-danger  m2">Remove All</button>
                </div>
                </div>`;
            $("#cart").html(html);
            $(".quantityInput").change(quantityChange);
            $("#removeAll").click(removeAll);
            $(".remove-product").click(removeSingleProdInCart);


            $(".cart__total ul li:nth-child(1) span").html(sum(products));
            $(".cart__total ul li:nth-child(2) span").html(sum(products));


        }


        check(getItemFromLS("products"));


        function productPrice(product) {
            return parseFloat(product.price.current) * parseFloat(product.quantity);
        }
        //calculating total price of one product in cart
        function sum(products) {
            let total = 0;
            products.forEach((product) => {
                total += parseFloat(product.price.current) * parseFloat(product.quantity);
            });
            return total.toFixed(2) + " $";
        }


        //function for checking if there is any products in cart
        function check(productsInCart) {
            if (productsInCart) {
                if (productsInCart.length) {
                    displayCart();


                }
                else
                    showEmptyCart();
            }
            else
                showEmptyCart();
        }
        function showEmptyCart() {
            $("#cart").html("<p class='text-center p-5 alert-danger'>There's no products in cart</p>");
        }
        function removeAll() {
            removeItemFromLS("products");
            location.reload();
        }
        function removeSingleProdInCart() {
            // Get the id of the product to be removed
            const productId = $(this).closest("tr").attr("data-product-id");

            // Remove the product from the productsLS array
            const productsLS = getItemFromLS("products") || [];
            const updatedProductsLS = productsLS.filter((product) => product.id !== productId);
            setItemToLS("products", updatedProductsLS);

            // Remove the product from the table
            $(this).closest("tr").remove();

            // Recalculate the total sum
            const totalSum = sum(updatedProductsLS);
            $("#totalSum").text("Total Sum: " + totalSum);

            // If there are no more products, show the "empty cart" message
            if (updatedProductsLS.length === 0) {
                $("#orderTable").html("<p>Your cart is currently empty.</p>");
            }
            setItemToLS("products", updatedProductsLS);
        }

        function update() {
            var totalSumforAll = $("#totalSum");
            var totalSumForOne = 0;

            $(".productSum").each(function (i, el) {
                var $el = $(el);
                var $row = $el.closest('tr');
                var priceone = parseFloat($row.find('.price').text().replace('$', ''));
                var quantitySum = parseInt($row.find('.quantityInput').val());
                var productId = $row.attr('data-product-id');

                $el.text((priceone * quantitySum).toFixed(2) + "$");
                totalSumForOne += priceone * quantitySum;

                // Update total sum for the current product
                $('#totalSum' + productId).text("Total Sum: " + (priceone * quantitySum).toFixed(2) + "$");

                // Save the updated quantity value to local storage
                localStorage.setItem('quantity_' + productId, quantitySum);
            });

            totalSumforAll.text("Total Sum: " + totalSumForOne.toFixed(2) + "$");
        }

        function quantityChange() {
            if (this.value > 0) {
                update();

            }
            else {
                this.value = 1;
            }
        }



    }
    if (url == "http://127.0.0.1:5501/checkout.html" || url == "https://nastasija97.github.io/WP2_Shop/checkout.html") {


        // add event listeners to validate input fields
        $("#ordername").on("input", function () {
            validateInput(reName, "#ordername", "#errOrderName", messName);
        });
        $("#email").on("input", function () {
            validateInput(reEmail, "#email", "#errEmail", messEmail);
        });
        $("#address").on("input", function () {
            validateInput(reAddress, "#address", "#errAddress", messAddress);
        });
        $("#credit-card").on("input", function () {
            validateInput(reCreditCard, "#credit-card", "#errCreditCard", messCreditCard);
        });


        function validateCart() {
            var errors1 = 0;
            if (!validateInput(reName, "#ordername", "#errOrderName", messName)) {
                errors1++;
            }
            if (!validateInput(reAddress, "#address", "#errAddress", messAddress)) {
                errors1++;
            }
            if (!validateInput(reCreditCard, "#credit-card", "#errCreditCard", messCreditCard)) {
                errors1++;
            }
            console.log(errors1);
            console.log(errors);
            if (errors1 == 0) {
                return buy();
            }
        }

        function buy() {
            localStorage.removeItem("products");
            showEmptyCart();
            $(".checkout__form").html("<p class='alert-success p-5'>Your order has been placed</p>");
        }




        $("#ordername").blur(function () {
            validateInput(reName, "#ordername", "#errOrderName", messName);
        });

        $("#address").blur(function () {
            validateInput(reAddress, "#address", "#errAddress", messAddress);
        });

        $("#credit-card").blur(function () {
            validateInput(reCreditCard, "#credit-card", "#errCreditCard", messCreditCard);
        });

        $("#submit").click(function () {
            validateCart();
        });
    }


    if (url == "http://127.0.0.1:5501/contact.html" || url == "https://nastasija97.github.io/WP2_Shop/contact.html") {
        console.log("on");
        // Retrieve saved form data on page load
        var savedData = localStorage.getItem("form-data");
        if (savedData) {
            savedData = JSON.parse(savedData);
            $("#name").val(savedData.name);
            $("#email").val(savedData.email);
            $("#subject").val(savedData.subject);
            $("#message").val(savedData.message);
        }

        $("#name").blur(function () {
            validateInput(reName, "#name", "#errName", messName);
        });
        $("#email").blur(function () {
            validateInput(reEmail, "#email", "#errEmail", messEmail);
        });
        $("#subject").blur(function () {
            validateInput(reSubject, "#subject", "#errSubject", messSubject);
        });
        $("#message").blur(function () {
            validateInput(reMessage, "#message", "#errMessage", messMessage);
        });
        var inputName = $("#name");
        var inputEmail = $("#email");
        var inputSubject = $("#subject");
        var inputMessage = $("#message");
        $("#form-submit").click(validateForm);
        var errors = 0;
        function validateForm() {
            if (!validateInput(reName, inputName, "#errName", messName)) {
                errors++;
                $("#errName").addClass("alert alert-danger");
            } else {
                $("#errName").removeClass("alert alert-danger");
            }
            if (!validateInput(reEmail, inputEmail, "#errEmail", messEmail)) {
                errors++;
                $("#errEmail").addClass("alert alert-danger");
            } else {
                $("#errEmail").removeClass("alert alert-danger");
            }
            if (!validateInput(reSubject, inputSubject, "#errSubject", messSubject)) {
                errors++;
                $("#errSubject").addClass("alert alert-danger");
            } else {
                $("#errSubject").removeClass("alert alert-danger");
            }
            if (!validateInput(reMessage, inputMessage, "#errMessage", messMessage)) {
                errors++;
                $("#errMessage").addClass("alert alert-danger");
            } else {
                $("#errMessage").removeClass("alert alert-danger");
            }
            console.log(errors);
            if (errors == 0) {
                $("#response").html("<p class='alert alert-success'>Your message was sent</p>");
                // Clear saved form data
                localStorage.removeItem("form-data");
            } else {
                // Save form data if errors occurred
                var formData = {
                    name: $("#name").val(),
                    email: $("#email").val(),
                    subject: $("#subject").val(),
                    message: $("#message").val()
                };
                localStorage.setItem("form-data", JSON.stringify(formData));
            }
        }
        $("#form-submit").click(validateForm);
    }


}







