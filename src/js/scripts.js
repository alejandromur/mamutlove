'use strict';

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function(callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}
// INSTANTIATE ANCHORS
if (document.querySelector('.menu__nav') !== null) {
  let anchors = new Anchor('.menu__nav');
  anchors.init();
}

// INSTANTIATE MENU
if (document.querySelector('.menu') !== null) {
  let menu = new Menu('.menu');
  menu.init();
}

// INSTANTIATE QUIZ
if (document.querySelector('.js-test') !== null) {
  let quiz = new Quiz('.js-test');
  quiz.init();
}

// INSTANTIATE MODALS
if (document.querySelectorAll('.modal').length > 0) {
  document.querySelectorAll('.modal').forEach(modal => {
    MODALS.push(new Modal(modal));
  });

  MODALS.forEach(modal => {
    modal.init();
  });
}

// CHAPTER 3 MODALS EXCEPTIONS
const chp3TriggerModal = document.querySelectorAll('.chapter-3 .js-modal');
const chp3CloseModal = document.querySelectorAll('.chapter-3 .modal__close');

chp3TriggerModal.forEach(button => {
  button.addEventListener('click', e => {
    Utils.removeActiveClass(e, chp3TriggerModal);
    e.target.classList.add('is-active');
  });
});

chp3CloseModal.forEach(button => {
  button.addEventListener('click', e => {
    Utils.hideAllModals();
    Utils.removeActiveClass(e, chp3TriggerModal);
  });
});

// INSTANTIATE TABS
if (document.querySelectorAll('.tab').length > 0) {
  document.querySelectorAll('.tab').forEach(tab => {
    TABS.push(new Tab(tab));
  });

  TABS.forEach(tab => {
    tab.init();
  });
}

// INSTANTIATE VIDEOS
if (document.querySelectorAll('.video').length > 0) {
  document.querySelectorAll('.video').forEach(video => {
    VIDEOS.push(new Video(video));
  });

  VIDEOS.forEach(video => {
    video.init();
  });
}

// CACHE BODY
const BODY = document.querySelector('body');
const HEADER = document.querySelector('.site-header');

BODY.addEventListener('click', e => {
  Utils.checkBodyClass(e);
});

window.onload = function() {
  // SCROLL EVENTS
  if (document.querySelector('.chapter') !== null) {
    let scrollEvents = new ScrollEvents();
    scrollEvents.init();

    window.addEventListener('scroll', e => {
      let scrollPosition = window.scrollY;
      ScrollEvents.checkChapterActive(
        scrollPosition,
        scrollEvents.chaptersPosition
      );
      ScrollEvents.checkHeaderScale(scrollPosition, scrollEvents.scrollYLimit);
    });
  }
};
