
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
//  const accordeonMenu = document.querySelector('.accordeon-menu').children;
//  const accordeonItem = document.querySelector('.accordeon-menu__item');
//  const accordeonBtn = document.querySelector('.accordeon-menu__btn');

//  accordeonMenu.addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log('click');
//  })


//     [].forEach.call(accordionBtn, accordionItems, function(el) {
//         el.addEventListener('click', function(e) {
//             e.preventDefault();

//             // console.log(accordionItems);
//             });
//     });
            

            //   if (!ell.classList.contains('accordeon-menu__item--active')) {
            //     console.log(accordionItems[2]);


            //     // for (let i = 0; i < accordionItems.length; i++) {
            //     //      accordionItems[i].classList.remove('accordeon-menu__item--active');
            //     //      console.log(accordionItems[i]);
            //     //          }
            //     // ell.classList.add('accordeon-menu__item--active');
            //  } 
            //  else {
            //     accordionItems.classList.remove('accordeon-menu__item--active');
            //  }
        
           

  

 const menuAcc = document.querySelector('.menu');
const ulMenuAcc = document.querySelector('.accordeon-menu').children;

menuAcc.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.closest('a')) {
    let li = e.target.closest('li');

    if (!li.classList.contains("accordeon-menu__item--active")) {
      for (i = 0; i < ulMenuAcc.length; i++) {
        ulMenuAcc[i].classList.remove('accordeon-menu__item--active');
        // console.log(ulMenuAcc[i])
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

btnForm.addEventListener('click', event => {
    event.preventDefault();

    if (validateForm(myForm)) {
        let formData = new FormData(myForm);

        // formData.append('name', myForm.elements.name.value);
        // formData.append('phone', myForm.elements.phone.value);
        // formData.append('comment', myForm.elements.comment.value);
        formData.append('to', 'test@test.ru');

        console.log(formData);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
         xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
         xhr.send(JSON.stringify(formData));
        //xhr.addEventListener('load', () => {
         //   console.log(xhr.response);
       // });
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
    return field.checkValidity();
}