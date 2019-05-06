// DD menu
$('.js-main-nav li ul, .js-language li ul').hide().removeClass('fallback')
$('.js-main-nav li, .js-language li').hover(
    function() {
        $('ul', this).stop().slideDown(100)
    },
    function() {
        $('ul', this).stop().slideUp(100)
    }
)
$('.js-main-nav li:last-child').hover(
    function() {
        $(this).addClass('active')
    },
    function() {
        $(this).removeClass('active')
    }
)

// Tabs
$('.js-latest-tab-content, .js-pick-tab-content').hide()
$('.js-latest-tab-content:first, .js-pick-tab-content:first').show()
$('.js-latest-tabs-nav li:first, .js-pick-tabs-nav li:first').addClass('active')
$('.js-pick-tabs-nav li').click(function(event) {
    $('.js-pick-tabs-nav li').removeClass('active')
    $(this).addClass('active')
    $('.js-pick-tab-content').hide()
    var selectTab = $(this).find('a').attr("href")
    $(selectTab).fadeIn(500)
    event.preventDefault()
})
$('.js-latest-tabs-nav li').click(function(event) {
    $('.js-latest-tabs-nav li').removeClass('active')
    $(this).addClass('active')
    $('.js-latest-tab-content').hide()
    var selectTab = $(this).find('a').attr("href")
    $(selectTab).fadeIn(500)
    event.preventDefault()
})

// Mobile menu
$('.js-mobile-toggle').click(function(event) {
    $('.js-main-nav').toggle(100)
    $(this).toggleClass('active')
    event.preventDefault()
})
