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
}
