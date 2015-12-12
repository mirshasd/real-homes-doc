$(document).ready(function(){

    function showFirstArticle(){
        $('.page-content .hentry').first().fadeIn().addClass( 'current' );
    }
    showFirstArticle();

    var nav = $('.main-menu');
    nav.find('.menu-item').click(function(e){
        $(this).parent('li').toggleClass('active');
        $(this).siblings('.sub-menu').slideToggle();
        e.preventDefault();
    });


    nav.find('.sub-menu-item').click(function(e){

        var targetHash =  $(this).attr('href');
        var targetID = '#'+ 'inspiry-' + targetHash.substr(1);

        nav.find('.sub-menu-item.active').removeClass('active');
        $(this).addClass('active');

        var currentArticle = $('.page-content').find( targetID );
        if ( currentArticle.length ) {
            currentArticle.siblings('.hentry.current').fadeOut();
            currentArticle.addClass('current').fadeIn();
        }

        window.location.hash = targetHash;

        e.preventDefault();
    });



    /* Enable the functionality of directly linking a section in URL */
    if ( jQuery().url ) {
        var url = $.url(); // parse the current page URL
        var targetHash = url.attr('fragment');   // get the #target-id from URL
        if( targetHash ){
            var targetID = '#'+ 'inspiry-' + targetHash;
            nav.find('.sub-menu-item').removeClass('active'); // remove active class from any other sub menu items

            var targetArticle = $( targetID );    // find related section
            targetArticle.siblings('.hentry.current').hide();
            targetArticle.addClass('current' ).fadeIn();

            var subMenuItem = $("a.sub-menu-item[href*=#" + targetHash + "]"); // find related sub menu item
            subMenuItem.addClass('active');   // add active class to sub menu item

            var targetSubMenu = subMenuItem.closest('ul.sub-menu'); // find parent sub menu for target sub menu item
            targetSubMenu.slideDown();    // display sub menu
            targetSubMenu.parent('li').addClass('active');    // find parent main menu item and add active class to it
        }

    }

    $('#view-all').on('click',function( e ){
        e.preventDefault();
        if ( $(this).hasClass( 'all-displayed' ) ) {

            $(this).html( 'View All' ).removeClass( 'all-displayed' );
            $('.page-content .hentry' ).fadeOut();


            var targetHash = window.location.hash;
            if ( targetHash.length > 0 ) {
                targetHash = targetHash.substr(1);
                console.log ( targetHash );
                var targetID = '#'+ 'inspiry-' + targetHash;
                nav.find('.sub-menu-item').removeClass('active'); // remove active class from any other sub menu items

                var targetArticle = $( targetID );    // find related section
                targetArticle.addClass('current' ).fadeIn();

                var subMenuItem = $("a.sub-menu-item[href*=#" + targetHash + "]"); // find related sub menu item
                subMenuItem.addClass('active');   // add active class to sub menu item

                var targetSubMenu = subMenuItem.closest('ul.sub-menu'); // find parent sub menu for target sub menu item
                targetSubMenu.slideDown();    // display sub menu
                targetSubMenu.parent('li').addClass('active');    // find parent main menu item and add active class to it
            } else {
                console.log( 'going to show first' );
                showFirstArticle();
            }

        } else {
            $('.page-content .hentry' ).fadeIn();
            $(this).html( 'Hide Others' ).addClass( 'all-displayed' );
        }
    } );

});