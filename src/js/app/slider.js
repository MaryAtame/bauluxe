import Swiper, { Navigation, Pagination, EffectFade } from "swiper";

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelectorAll("[data-slider]");
  slider.forEach((el) => {
    createSlider(el);
  });
});

function createSlider(el) {
  let swiper = Swiper;
  let init = false;
  const desktop = window.matchMedia("(min-width: 768px)");
  const mobile = window.matchMedia("(min-width: 0px) and (max-width: 768px)");
  const wrapper = el.querySelector(".swiper-wrapper");
  const slidesQuantity = Number(el.getAttribute("data-slider-slides"));
  const slidesQuantityTab = Number(el.getAttribute("data-slider-slides-tab"));
  const slidesQuantityMob = Number(el.getAttribute("data-slider-slides-mob"));
  const pagination = el.querySelector("[data-slider-pagination]") || null;
  const desktopOnly = !!el.hasAttribute("data-slider-desktop");
  const mobileOnly = !!el.hasAttribute("data-slider-mobile");

  function initSlider(el) {
    if (mobileOnly && mobile.matches) {
      if (!init) {
        init = true;
        swiper = callSlider(el);
      }
    } else if (mobileOnly && desktop.matches) {
      if (init) {
        swiper.destroy();
        swiper = undefined;
        wrapper.removeAttribute("style");
        init = false;
      }
    } else if (!desktopOnly || (desktopOnly && desktop.matches)) {
      if (!init) {
        init = true;
        swiper = callSlider(el);
      }
    } else if (desktopOnly && mobile.matches) {
      if (init) {
        swiper.destroy();
        swiper = undefined;
        wrapper.removeAttribute("style");
        init = false;
      }
    }
  }

  function callSlider(el) {
    return new Swiper(el.querySelector(".swiper"), {
      modules: [Navigation, Pagination, EffectFade],
      slidesPerView: slidesQuantity,
      spaceBetween: 30,
      slideVisibleClass: "slider__slide--visible",
      watchSlidesProgress: true,
      loop: false,
      effect: "fade",
      dragging: true,
      autoHeight: false,
      pagination: {
        el: pagination,
        clickable: true,
        type: "bullets",
        bulletClass: "bullet",
        bulletActiveClass: "bullet--active"
      },
      navigation: {
        nextEl: el.querySelector("[data-slider-next]"),
        prevEl: el.querySelector("[data-slider-prev]")
      },
      breakpoints: {
        1200: {
          slidesPerView: slidesQuantity,
          spaceBetween: 20
        },
        768: {
          slidesPerView: slidesQuantityTab || 2,
          spaceBetween: 20
        },

        320: {
          slidesPerView: slidesQuantityMob || 1,
          spaceBetween: 15
        }
      }
    });
  }

  initSlider(el);
  window.addEventListener("resize", () => {
    initSlider(el);
  });
}
