'use strict';

// INSTANTIATE ANCHORS
// if (document.querySelector('.menu__nav') !== null) {
//   let anchors = new Anchor('.menu__nav');
//   anchors.init();
// }

// Toggle Dark Theme
if (localStorage.getItem('theme')) {
  const theme = localStorage.getItem('theme');
  document.body.classList.add(theme);
}

const toggleTheme = document.querySelector('.js-toggle-theme');

toggleTheme.addEventListener('click', e => {
  e.preventDefault();

  if (!document.body.classList.contains('theme-dark')) {
    document.body.classList.add('theme-dark');
    localStorage.setItem('theme', 'theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
    localStorage.removeItem('theme');
  }
});