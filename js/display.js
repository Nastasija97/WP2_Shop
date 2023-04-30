let  header=`     <div class="header__top">
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
            <a href="./shopping-cart.html" class="number-of-products"><img src="img/icon/cart.png" alt=""> <span></span></a>
            <div class="price">$0.00</div>
        </div>
    </div>
</div>
<div class="canvas__open"><i class="fa fa-bars"></i></div>
</div>
<!-- back to top button -->
<button id="back-to-top-btn"
style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background-color: #333; color: #fff; border-radius: 50%; border: none; cursor: pointer;">
<span
    style="position: relative; top: -3px; left: 2px; display: inline-block; width: 0; height: 0; border-style: solid; border-width: 0 5px 7px 5px; border-color: transparent transparent #fff transparent;"></span>
</button>

<!-- back to top button -->`;
let footer=`   <div class="container">
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
                <li><a href="./about.html">Author</a>></li>
                <li><a href="./js/main.js">js</a></li>
                <li><a href="./docs.pdf">Docs</a></li>
                <li><a href="./sitemap.xml">Sitemap</a></li>

            </ul>
        </div>
    </div>
   
</div>

</div>`
     
display(header,"#header");
display(footer,"#footer");


function display(html,selector){
    $(selector).html(html);
}