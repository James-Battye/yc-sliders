const links = document.querySelectorAll<HTMLDivElement>('[faq-link]');

links.forEach((e) => {
    if (e.classList.contains('is-active')) {
        e.classList.remove('is-active');
    }

    e.addEventListener('click', () => {
        const currentLink = e;
        links.forEach((element) => {
            if (element !== currentLink && element.classList.contains('is-active')) {
                element.classList.remove('is-active');
            }
        });
        e.classList.toggle('is-active');
    });
});
