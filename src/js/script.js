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

//accordion-menu1
// const menu = document.querySelector('.menu');
// const menuItem = document.querySelector('.accordeon-menu').children;
// const btnCloseX = document.querySelectorAll('.btn-close-x');

// menu.addEventListener('click', function (e) {
//   e.preventDefault();

//   if (e.target.closest('a')) {
//     let li = e.target.closest('li');

//     if (!li.classList.contains("accordeon-menu__item--active")) {
//       for (i = 0; i < menuItem.length; i++) {
//         menuItem[i].classList.remove('accordeon-menu__item--active');
//       }
//       li.classList.add('accordeon-menu__item--active');
//     } else {
//       li.classList.remove('accordeon-menu__item--active');
//     }
//   }

//  });

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

    //fullpage
   $('#fullpage').fullpage({
       menu: '#fixed-menu'
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
            iconImageHref: 'img/icons/map-icon.png',
            iconImageSize: [46, 57],
        }),
        
        myPlacemark2 = new ymaps.Placemark([54.981975, 82.869428], {
            hintContent: 'Магазин 2',
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map-icon.png',
            iconImageSize: [46, 57],
        }),
        
        myPlacemark3 = new ymaps.Placemark([54.994209, 82.984605], {
            hintContent: 'Магазин 3',
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map-icon.png',
            iconImageSize: [46, 57],
        }),

        myPlacemark4 = new ymaps.Placemark([55.058992, 82.911749], {
            hintContent: 'Магазин 4',
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icons/map-icon.png',
            iconImageSize: [46, 57],
        });

        myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemark2)
        .add(myPlacemark3)
        .add(myPlacemark4);

        myMap.behaviors.disable('scrollZoom');
    }

//videoplayer
const btnPlay = document.querySelector('.btn-play');
const videoPlayer = document.querySelector('.video__player');
const videoCurrent = document.querySelector('.video__progress-current');

const togglePlay = () => {
    if (videoPlayer.paused || videoPlayer.ended) {
        videoPlayer.play(); 
        $('.btn-play__icon').css('display', 'none');
        $('.btn-pause__icon').css('display', 'block');
        setInterval(currentMove);
    } else {
        videoPlayer.pause();
        $('.btn-play__icon').css('display', 'block');
        $('.btn-pause__icon').css('display', 'none');
    }
};

//btnPlay.addEventListener('click', togglePlay); 
$(videoPlayer).on('click', togglePlay);
$(btnPlay).on('click', togglePlay);
$('.btn-play--big').on('click', togglePlay);

const currentMove = () => {
    videoCurrent.style.width = videoPlayer.currentTime * 100 / videoPlayer.duration + '%';
    $('.video__volume-current').width(videoPlayer.volume * 100 + '%');
}

  $('.video__progress-container').on('click', function(e) {
    var x = (e.pageX - this.offsetLeft)/$(this).width();
    videoPlayer.currentTime = x * videoPlayer.duration;
  });

  $('.btn-volume').on('click', function () {

    if(videoPlayer.volume > 0) {
        videoPlayer.volume = 0;
        $('.line-cross').css('display', 'block');
    } else {
        videoPlayer.volume = 1;
        $('.line-cross').css('display', 'none');
    }
     
  });

  $('.video__volume-container').on('click', function(e){
    var x = (e.pageX - this.offsetLeft)/$(this).width();
    videoPlayer.volume = x;

  });

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
});


//accordein-menu_2

function accordeonMenu(){
    const menuItems = document.querySelectorAll('.accordeon-menu__item');
    const menuAccord = document.querySelector('.accordeon-menu');
    
    menuAccord.addEventListener('click', event => {
        event.preventDefault();
        let target = event.target.parentNode;
        let content = target.nextElementSibling; 
        let item = target.parentNode;

        const tarWidth = target.clientWidth;
        const windowWidth = document.documentElement.clientWidth;
        const layoutContentWidth = 520;
        const breackpointPhone = 480;
        const closeMenuWidth = tarWidth * menuItems.length;
        const openMenuWidth = closeMenuWidth + layoutContentWidth;
        


        if (event.target.classList.contains('accordeon-menu__btn-title')) {
            moveMenu();
        }
        target = event.target
        content = target.nextElementSibling
        item = target.parentNode
        
        if (target.classList.contains('accordeon-menu__btn')) {
            moveMenu();
        }

        function moveMenu(){
            for (const iterator of menuItems){
                if (iterator != item) {
                    iterator.classList.remove('accordeon-menu__item--active')
                    iterator.lastElementChild.style.width = 0
                    menuAccord.style.transform = 'translateX(0)'                    
                }
            }

            if (item.classList.contains('accordeon-menu__item--active')) {
                item.classList.remove('accordeon-menu__item--active');
                content.style.width = 0;
            } else{
                item.classList.add('accordeon-menu__item--active');
                
                if (windowWidth > breackpointPhone && windowWidth < openMenuWidth) {

                    content.style.width = windowWidth - closeMenuWidth + 'px';
                } else if (windowWidth <= breackpointPhone) {
                let num;
                for (let i = 0; i < menuItems.length; i++) {
                    if (menuItems[i] === item) {
                    num = menuItems.length - (i + 1);
                    }
                    menuAccord.style.transform = `translateX(${tarWidth * num}px)`;
                    content.style.width = windowWidth - tarWidth + 'px';
                }
                } else {
                content.style.width = layoutContentWidth + 'px';
                }
            }
        }
    })
}
accordeonMenu();


const btnCloseX = document.querySelectorAll('.btn-close-x');

[].forEach.call(btnCloseX, (el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        $('.accordeon-menu__item').removeClass('accordeon-menu__item--active');
    });
});