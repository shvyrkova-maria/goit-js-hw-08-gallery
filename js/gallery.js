import itemsArr from "/data/gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  overlay: document.querySelector(".lightbox__overlay"),
  image: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  btnPrev: document.querySelector('button[data-action="previous"]'),
  btnNext: document.querySelector('button[data-action="next"]'),
};

const galleryItems = createGalleryMarkup(itemsArr);
refs.gallery.insertAdjacentHTML("beforeend", galleryItems);

refs.gallery.addEventListener("click", onGalleryImageClick);
refs.btnClose.addEventListener("click", onBtnCloseClick);
refs.overlay.addEventListener("click", onLightboxOverlayClick);
refs.btnPrev.addEventListener("click", onBtnPrevClick);
refs.btnNext.addEventListener("click", onBtnNextClick);

function createGalleryMarkup(items) {
  return items
    .map(
      ({ preview, original, description }) =>
        `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
      `
    )
    .join("");
}

function onGalleryImageClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.image.src = event.target.dataset.source;
  window.addEventListener("keydown", onEscapePress);
}

function onBtnCloseClick() {
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
  window.removeEventListener("keydown", onEscapePress);
}

function onLightboxOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onBtnCloseClick();
  }
}

function onEscapePress(event) {
  if (event.code === "Escape") {
    onBtnCloseClick();
  }
}

// function onBtnPrevClick() {
//   const test = document.querySelector(".gallery__image");
//   if ((refs.image.src = test.dataset.source)) {
//     return (refs.image.src = test.dataset.source);
//   }
// }
// function onBtnNextClick() {}
//elem.previousSibling
//elem.nextSibling
