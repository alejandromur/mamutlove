'use strict';

// ----------------------------------------------------
//  Utilities
// ----------------------------------------------------

class Utils {
  static checkIfIE11() {
    IEML.isIE11 = !window.ActiveXObject && 'ActiveXObject' in window;

    if (IEML.isIE11) {
      IEML.E.classList.add('ie11');
    }
  }

  // FOR IE11
  static fixHeight() {
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    document.querySelector('body').style.height = height + 'px';
  }

  static changeStylesSheet(styleSheet) {
    let tag = document.querySelector('link[rel="stylesheet"]');
    tag.setAttribute('href', styleSheet);
  }

  static hideAllModals() {
    MODALS.forEach(modal => {
      modal.elem.classList.remove('is-visible');
    });
  }

  static removeActiveClass(e, array = chp3TriggerModal) {
    if (e.target.classList.contains('is-active')) {
      return;
    }

    array.forEach(button => {
      button.classList.remove('is-active');
    });
  }

  static checkBodyClass(e) {
    if (e.target.closest('.modal')) {
      return false;
    }
    if (BODY.classList.contains('menu-is-open')) {
      document.querySelector('.menu').classList.toggle('is-open');
      Utils.removeBodyClass('menu-is-open');
    }
    if (BODY.classList.contains('modal-is-open')) {
      Utils.hideAllModals();
      Utils.removeBodyClass('modal-is-open');
      Utils.removeActiveClass(e);
    }
    return false;
  }

  static addBodyClass(className = 'modal-is-open') {
    BODY.classList.add(className);
  }

  static removeBodyClass(className = 'modal-is-open') {
    BODY.classList.remove(className);
  }

  static activateMenuAnchor(target) {
    if (typeof target === 'string') {
      target = document.querySelector(`[href="#${target}"]`);
    }
    document.querySelectorAll('.menu__nav__link').forEach(anchor => {
      anchor.classList.remove('is-active');
    });
    target.classList.add('is-active');
  }

  static currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }

  static resetWindowScroll() {
    window.scrollTo(0, 0);
  }
}
