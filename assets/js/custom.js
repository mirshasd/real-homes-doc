$(document).ready(function(){

    var nav = $('.main-menu');
    nav.find('.menu-item').click(function(e){
        $(this).parent('li').toggleClass('active');
        $(this).siblings('.sub-menu').slideToggle();
        e.preventDefault();
    });

    nav.find('.sub-menu-item').click(function(){
        nav.find('.sub-menu-item').removeClass('active');
        $(this).addClass('active');
        id = $('.page-content').children($(this).attr('href'));
        id.fadeIn().siblings('.hentry').hide();
        return false;
    });

    // show 1st article on load
    $('.page-content .hentry').first().show();

});
