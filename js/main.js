
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

//data

let url = window.location.pathname;
var nav=[];
var allProducts=[];
var categories=[];
var brands=[];
var sizes=[];
var tags=[];
window.onload=function(){
    ajaxCallback("nav",displayNav);
    ajaxCallback("categories",displayCategories);
    ajaxCallback("brands",displayBrands);
    ajaxCallback("sizes",displaySizes);
    ajaxCallback("tags",displayTags);
    ajaxCallback("products",getAllProducts);
    displayHeader();
    displayFooter();
}





//js

//fetching data from json////////////////////////////////////////////////////////

function ajaxCallback(file,callback){
   $.ajax({
    url:"/data/"+file+".json",
    method:"get",
    dataType:"json",
    success:function(result){callback(result)},
    error:function(error){
        console.log(error);
    }
   })
}
function getAllProducts(data){
    data.forEach(el=>{
        allProducts.push(el);s
       // console.log(el);
    });
    
    setItemToLS("allProducts",allProducts);
   
}

//LOCAL STORAGE////////////////////////////////////////////////////////////////////
function getItemFromLS(name){
    let item= localStorage.getItem(name);

    if(item){
        parsedItem=JSON.parse(item);
        if(parsedItem.length>0){
            return parsedItem;
        }
    }
    return false;
}
function setItemToLS(name,data){
    localStorage.setItem(name,JSON.stringify(data));
}
function removeFromLS(name){
    localStorage.removeItem(name);
}

//DYNAMIC DISPLAY////////////////////////////////////////////////////////////////////

function displayNav(data){
    let h="<ul>";
    data.forEach(element => {
        h+=`     <li class="filter__controls" ><a href="${element.path}">${element.name}</a></li>
        `;

        nav.push(element);
    });
    h+="</ul>"
    $("#nav").html(h);
    
}
function displayHeader(){
    let html=`   <div class="header__top">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-7">
                <div class="header__top__left">
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
            </div>
         
        </div>
    </div>
</div>
<div class="container">
    <div class="row">
        <div class="col-lg-3 col-md-3">
            <div class="header__logo">
                <a href="./index.html"><img src="img/logo.png" alt=""></a>
            </div>
        </div>
        <div class="col-lg-6 col-md-6">
            <nav class="header__menu mobile-menu" id="nav">
            </nav>
        </div>
        <div class="col-lg-3 col-md-3">
            <div class="header__nav__option ">
                <a href="#" class="search-switch"><img src="img/icon/search.png" alt=""></a>
                <a href="#"><img src="img/icon/heart.png" alt=""></a>
                <a href="./shopping-cart.html"><img src="img/icon/cart.png" alt=""> <span><strong>3</strong></span></a>
                <div class="price">$0.00</div>
            </div>
        </div>
    </div>
    <div class="canvas__open"><i class="fa fa-bars"></i></div>
</div>`;
    $('.header').html(html);
}
function displayFooter(){
   let html=`   <div class="container">
    <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="footer__about">
                <div class="footer__logo">
                    <a href="#"><img src="img/footer-logo.png" alt=""></a>
                </div>
                <p>The customer is at the heart of our unique business model, which includes design.</p>
                <a href="#"><img src="img/payment.png" alt=""></a>
            </div>
        </div>
        <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
            <div class="footer__widget">
                <h6>Shopping</h6>
                <ul>
                    <li><a href="#">Clothing Store</a></li>
                    <li><a href="#">Trending Shoes</a></li>
                    <li><a href="#">Accessories</a></li>
                    <li><a href="#">Sale</a></li>
                </ul>
            </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-6">
            <div class="footer__widget">
                <h6>Shopping</h6>
                <ul>
                    <li><a href="#">Author</a></li>
                    <li><a href="/js/main.js">js</a></li>
                    <li><a href="#">Docs</a></li>
                    <li><a href="#">Sitemap</a></li>
                   
                </ul>
            </div>
        </div>
        <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
        
        </div>
    </div>
   
</div>`;
$('.footer').html(html);
}
function displayCategories(data){
   let html=`<ul class="nice-scroll">`;
data.forEach(e=>{
    html+=`<li><a href="#">${e.name} (20)</a></li>`;
    categories.push(e);
});
html+="</ul>";
$("#categories").html(html);
}
function displayBrands(data){
   let html=`<ul class="nice-scroll">`;
data.forEach(e=>{
    html+=` <li><a href="#">${e.name}</a></li>`;
brands.push(e);
});
html+="</ul>";
$("#brands").html(html);
}
function displaySizes(data){
    let html=`<div class="shop__sidebar__size" id="sizes">`;
    data.forEach(e=>{
        html+=`<label for="${e.name}">${e.name}
        <input type="radio" id="${e.name}">
    </label>`;
    sizes.push(e);
    });
    html+=`</div>`;
    $('#sizes').html(html);
}
function displayTags(data){
    let html=` <div class="shop__sidebar__tags">`;
    data.forEach(e=>{
        html+=` 
        <a href="#">${e.name}</a>
      
        
    `;
    tags.push(e);
    });
    console.log(tags);
    html+=`</div>`;
    $('#tags').html(html);
}

















