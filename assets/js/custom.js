$(document).ready(function(){

    /**
     * Show first article
     */
    function showFirstArticle(){
        $('.page-content .hentry').first().fadeIn().addClass( 'current' );
    }
    showFirstArticle();

    /**
     * Menu item event handlers
     */
    var nav = $('.main-menu');

    nav.find('.menu-item').click(function(e){
        $(this).parent('li').toggleClass('active');
        $(this).siblings('.sub-menu').slideToggle();
        e.preventDefault();
    });


    nav.find('.sub-menu-item').click(function(e){

        var targetHash =  $(this).attr('href' ).substr(1);
        var targetID = '#'+ 'inspiry-' + targetHash;  // represent an article id attribute

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


    /**
     *  Open the right article on 1st load if the URL has a hash
     */
    var targetHash = window.location.hash;
    if ( targetHash.length > 0 ) {
        var targetID = '#'+ 'inspiry-' + targetHash.substr(1);
        var targetArticle = $( targetID );
        if ( targetArticle.length > 0 ) {
            nav.find('.sub-menu-item.active').removeClass('active');

            targetArticle.siblings('.hentry.current').hide();
            targetArticle.addClass('current' ).fadeIn();

            var subMenuItem = $("a.sub-menu-item[href*=" + targetHash + "]"); // find related sub menu item
            if ( subMenuItem.length > 0 ) {
                subMenuItem.addClass('active');                         // add active class to sub menu item
                var targetSubMenu = subMenuItem.closest('ul.sub-menu'); // find parent sub menu for target sub menu item
                targetSubMenu.slideDown();                              // display sub menu
                targetSubMenu.parent('li').addClass('active');          // find parent main menu item and add active class to it
            }
        }
    }

    /**
     * View all
     */
    $('#view-all').on('click',function( e ){

        e.preventDefault();

        if ( $(this).hasClass( 'all-displayed' ) ) {    // Hide Others
            /**
             * Hide Others
             */
            $(this).removeClass( 'all-displayed' ).html( 'View All' );
            $('.page-content .hentry' ).fadeOut();

            var targetHash = window.location.hash;
            if ( targetHash.length > 0 ) {
                targetHash = targetHash.substr(1);
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
                showFirstArticle();
            }

        } else {
            /**
             * Show All
             */
            $('.page-content .hentry' ).fadeIn();
            $(this).addClass( 'all-displayed' ).html( 'Hide Others' );
        }
    } );

});