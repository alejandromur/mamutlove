'use strict';

// INSTANTIATE ANCHORS
// if (document.querySelector('.menu__nav') !== null) {
//   let anchors = new Anchor('.menu__nav');
//   anchors.init();
// }

// Toggle Dark Theme
const toggleTheme = document.querySelector('.js-toggle-theme');

toggleTheme.addEventListener('click', e => {
  e.preventDefault();

  if (!document.body.classList.contains('theme-dark')) {
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
  }
});