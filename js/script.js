//humburger-menu
const humburger_btn = document.querySelector('#hamburger-menu__link');
const humburger_menu = document.querySelector('.nav');

    humburger_btn.addEventListener('click', function(e) {
    e.preventDefault();

    let className = humburger_btn.getAttribute('class');

    if (className == 'hamburger-menu__link') {
        humburger_menu.classList.add('nav--active');
        humburger_btn.classList.add('hamburger-menu--link--active');

       var _body = document.getElementsByTagName('body')[0];
        _body.style.overflow = "hidden"; 

                }    else  {
        humburger_btn.classList.remove('hamburger-menu--link--active');
            humburger_menu.classList.remove('nav--active');
            var _body = document.getElementsByTagName('body')[0];
            _body.style.overflow = "visible";
    }
    });

//accordeon-team
const teamItems = document.querySelectorAll('.team__item');

    [].forEach.call(teamItems, function(el) {
        el.addEventListener('click', function() {

            if (!el.classList.contains('team__item--active')) {
                for (let i = 0; i < teamItems.length; i++) {
                    teamItems[i].classList.remove('team__item--active')
                }
                el.classList.add('team__item--active');
            } else {
                el.classList.remove('team__item--active');
            }
        });
    });

//accordion-menu
const menu = document.querySelector('.menu');
const menuItem = document.querySelector('.accordeon-menu').children;
const btnCloseX = document.querySelectorAll('.btn-close-x');

menu.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.closest('a')) {
    let li = e.target.closest('li');

    if (!li.classList.contains("accordeon-menu__item--active")) {
      for (i = 0; i < menuItem.length; i++) {
        menuItem[i].classList.remove('accordeon-menu__item--active');
      }
      li.classList.add('accordeon-menu__item--active');
    } else {
      li.classList.remove('accordeon-menu__item--active');
    }
  }

});

//composition
const comp = document.querySelector('.composition__btn');
comp.addEventListener('click', function(e) {
    e.preventDefault();
})


function ready() {

    $('.slider__list').slick({
        prevArrow: $('.arrow--left'),
        nextArrow: $('.arrow--right')
    });

    //map
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.022, 82.93],
            zoom: 12.4,
            controls: ['zoomControl']
        }), 

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark([55.021191, 82.919699], {
            hintContent: 'Магазин 1',
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-icon.png',
            iconImageSize: [46, 57],
        }),
        
        myPlacemark2 = new ymaps.Placemark([54.981975, 82.869428], {
            hintContent: 'Магазин 2',
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-icon.png',
            iconImageSize: [46, 57],
        }),
        
        myPlacemark3 = new ymaps.Placemark([54.994209, 82.984605], {
            hintContent: 'Магазин 3',
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-icon.png',
            iconImageSize: [46, 57],
        }),

        myPlacemark4 = new ymaps.Placemark([55.058992, 82.911749], {
            hintContent: 'Магазин 4',
        }, {
            iconLayout: 'default#image',
            iconImageHref: '../img/icons/map-icon.png',
            iconImageSize: [46, 57],
        });

        myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemark2)
        .add(myPlacemark3)
        .add(myPlacemark4);

        myMap.behaviors.disable('scrollZoom');
    }
};

document.addEventListener('DOMContentLoaded', ready);

//form
const myForm = document.querySelector('.form');
const btnForm = document.querySelector('#btn-order');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('#btn-close');

btnForm.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
        let formData = new FormData(myForm);
        formData.append('to', 'test@test.ru');

        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener('load', () => {
           const successOverlay = createOverlay(xhr.response.message);
           document.body.appendChild(successOverlay);

             var _body = document.getElementsByTagName('body')[0];
             _body.style.overflow = "hidden"; 
        });
    }
});

function validateForm(form) {
    let valid = true;

    if (!validateField(form.elements.name)) {
        valid = false;
    }
    if (!validateField(form.elements.phone)) {
        valid = false;
    }
    if (!validateField(form.elements.comment)) {
        valid = false;
    }

    return valid;
}

function validateField(field) {
    field.nextElementSibling.textContent = field.validationMessage;
    field.style.border = '1px solid red';

    if (field.validationMessage) {
        field.style.border = '1px solid red';
    } else {
        field.style.border = '';
    }
    
    return field.checkValidity();
}

//overlay
function createOverlay(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const template = document.querySelector("#overlayTemplate");
  overlayElement.innerHTML = template.innerHTML;

  const closeElement = overlayElement.querySelector("#btn-close");
  closeElement.addEventListener("click", function(e) {
    e.preventDefault();
    document.body.removeChild(overlayElement);

    var _body = document.getElementsByTagName('body')[0];
    _body.style.overflow = "visible"; 

  });


  overlayElement.addEventListener("click", function(e) {
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });

  const contentElement = overlayElement.querySelector(".overlay__text");
  contentElement.innerHTML = content;

  return overlayElement;
}


//slideshow
const ctrlList = document.querySelector('.reviews__ctrl');
const ctrlItems = document.querySelectorAll('.reviews__ctrl-item');
const reviewItems = document.querySelectorAll('.reviews__info-item');


[].forEach.call(ctrlItems, (el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let ctrlItem = e.target.closest('li');

        for (let i = 0; i < ctrlItems.length; i++) {
            ctrlItems[i].classList.remove('reviews__ctrl-item--active');
    
            if (ctrlItems[i] === ctrlItem) {
                reviewItems[i].classList.add('reviews__info-item--active');
                
            } else {
                reviewItems[i].classList.remove('reviews__info-item--active');
            }
        }
        ctrlItem.classList.add('reviews__ctrl-item--active');

    })
})