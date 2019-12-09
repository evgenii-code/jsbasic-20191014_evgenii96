'use strict';

console.clear();

class Carousel {
  slides = [
    {
      id: 0,
      title: 'BEST LAPTOP DEALS',
      img: '/assets/images/default-slide-img.jpg'
    },
    {
      id: 1,
      title: 'BEST HEADPHONES DEALS',
      img: '/assets/images/default-slide-img.jpg'
    },
    {
      id: 2,
      title: 'BEST SPEAKERS DEALS',
      img: '/assets/images/default-slide-img.jpg'
    }
  ];

  constructor(element) {
    this.el = element;

    let divMainCarousel = document.createElement('div');
    divMainCarousel.id = 'mainCarousel';
    divMainCarousel.classList.add('main-carousel');
    divMainCarousel.classList.add('carousel');
    divMainCarousel.classList.add('slide');
    this.el.append(divMainCarousel);

    let ol = document.createElement('ol');
    ol.classList.add('carousel-indicators');
    ol.addEventListener('click', (event) => this.activateSlide(event));
    divMainCarousel.append(ol);

    this.slides.forEach((item) => {
      let li = document.createElement('li');
      li.dataset.target = `#${divMainCarousel.id}`;
      li.dataset.slideTo = item.id;
      li.classList.add('carousel-indicator');
      ol.append(li);
    });

    this.divCarouselInner = document.createElement('div');
    this.divCarouselInner.classList.add('carousel-inner');
    divMainCarousel.append(this.divCarouselInner);

    const directions = ['Previous', 'Next'];

    directions.forEach((direction) => {
      let button = document.createElement('button');
      button.href = `#${divMainCarousel.id}`;
      button.role = 'button';
      button.dataset.slide = `${direction[0].toLowerCase() + direction.slice(1, 4)}`;
      button.classList.add(`carousel-control-${direction[0].toLowerCase() + direction.slice(1, 4)}`);
      divMainCarousel.append(button);
      button.addEventListener('click', (event) => this.activateSlide(event));

      let spanIcon = document.createElement('span');
      spanIcon.classList.add(`${button.classList[0]}-icon`);
      spanIcon.setAttribute('aria-hidden', 'true');
      button.append(spanIcon);

      let spanDirection = document.createElement('span');
      spanDirection.classList.add('sr-only');
      spanDirection.textContent = direction;
      button.append(spanDirection);
    });

    this.idOfActiveSlide = 0;

    this.slides.forEach((element) => this.createSlides(element));
    this.activateSlide(null);
  }

  activateSlide(event) {
    let closestTargetElem;

    if (event != null) {
      closestTargetElem = event.target.closest('button') || event.target.closest('li');
      this.idOfActiveSlide = this.findId(closestTargetElem);
    } else {
      this.idOfActiveSlide = 0;
    }

    let listOfSlides = this.el.querySelector('.carousel-inner').children;
    for (let item of listOfSlides) {
      item.classList.remove('active');
      listOfSlides[this.idOfActiveSlide].classList.add('active');
    }

    let listOfIndicators = this.el.querySelector('.carousel-indicators').children;
    for (let item of listOfIndicators) {
      item.classList.remove('active');
      listOfIndicators[this.idOfActiveSlide].classList.add('active');
    }
  }

  findId(targetElem) {
    if (targetElem.dataset.slide === 'next') {
      if (this.idOfActiveSlide + 1 < this.slides.length) {
        return ++this.idOfActiveSlide;
      }
      return 0;
    } else if (targetElem.dataset.slide === 'prev') {
      if (this.idOfActiveSlide - 1 >= 0) {
        return --this.idOfActiveSlide;
      }
      return this.slides.length - 1;
    }
    return targetElem.dataset.slideTo;
  }

  createSlides(element) {
    let divCarouselItem = document.createElement('div');
    divCarouselItem.classList.add('carousel-item');
    this.divCarouselInner.append(divCarouselItem);

    let imgActiveSlide = document.createElement('img');
    imgActiveSlide.src = element.img;
    imgActiveSlide.alt = 'Activeslide';
    divCarouselItem.append(imgActiveSlide);

    let divContainer = document.createElement('div');
    divContainer.classList.add('container');
    divCarouselItem.append(divContainer);

    let divCarouselCaption = document.createElement('div');
    divCarouselCaption.classList.add('carousel-caption');
    divCarouselItem.append(divCarouselCaption);

    let hh = document.createElement('h3');
    hh.classList.add('h1');
    hh.textContent = element.title;
    divCarouselCaption.append(hh);

    let div = document.createElement('div');
    divCarouselCaption.append(div);

    let aButton = document.createElement('a');
    aButton.classList.add('btn');
    aButton.href = '#';
    aButton.role = 'button';
    aButton.textContent = 'View all DEALS';
    div.append(aButton);

    let imgIcon = document.createElement('img');
    imgIcon.src = 'assets/icons/icon-angle-white.svg';
    imgIcon.classList.add('ml-3');
    imgIcon.alt = '';
    aButton.append(imgIcon);
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;
