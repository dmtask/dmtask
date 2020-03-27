$(() => {
    $('nav .navbar-nav a.projects').on('click', (event) => {
        let target = event.target.hash;

        event.preventDefault();

        $('html, body').stop().animate({
            scrollTop: $(target).offset().top - 40
        }, 1000, () => {
            window.location.hash = target;
        });
    });
});