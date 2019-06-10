"use strict";

// ----------------------------------------------------
//  ANCHORS
// ----------------------------------------------------

const ANCHORS = [];

class Anchor {
  constructor(elem) {
    this.elem = document.querySelector(elem);
    this.anchors = this.elem.querySelectorAll(".menu__nav__link");
  }

  init() {
    this.listeners();
  }

  listeners() {
    this.anchors.forEach(anchor => {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        let target = e.target.getAttribute("href");
        if (target !== "../index.html") {
          document.querySelector(target).scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
          Utils.activateMenuAnchor(e.target);
        } else {
          // window.location = document.location.pathname.substr(0, 4);
          window.location = "../index.html";
        }
      });
    });
  }
}
