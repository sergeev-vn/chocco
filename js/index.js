
    const humburger_btn = document.querySelector('#hamburger-menu__link');
    const humburger_menu = document.querySelector('.nav');

     humburger_btn.addEventListener('click', function(e) {
        e.preventDefault();
       
        let className = humburger_btn.getAttribute('class');

        if (className == 'hamburger-menu__link') {
            humburger_menu.classList.add('nav--active');
            humburger_btn.classList.add('hamburger-menu--link--active');
           
        }    else  {
            humburger_btn.classList.remove('hamburger-menu--link--active');
             humburger_menu.classList.remove('nav--active');
        }
     });

        