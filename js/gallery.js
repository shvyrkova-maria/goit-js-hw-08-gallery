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

function onBtnPrevClick() {
  const galleryImages = document.querySelectorAll(".gallery__image");
  for (let i = 0; i < galleryImages.length; i++) {
    const galleryImage = galleryImages[i];
    const firstGalleryImage = galleryImages[0];
    const lastGalleryImage = galleryImages[galleryImages.length - 1];
    const preGalleryImage = galleryImages[i - 1];

    if (
      refs.image.src === galleryImage.dataset.source &&
      refs.image.src !== firstGalleryImage.dataset.source
    ) {
      return (refs.image.src = preGalleryImage.dataset.source);
    } else if (refs.image.src === firstGalleryImage.dataset.source) {
      return (refs.image.src = lastGalleryImage.dataset.source);
    }
  }
}

function onBtnNextClick() {
  const galleryImages = document.querySelectorAll(".gallery__image");
  for (let i = 0; i < galleryImages.length; i++) {
    const galleryImage = galleryImages[i];
    const firstGalleryImage = galleryImages[0];
    const lastGalleryImage = galleryImages[galleryImages.length - 1];
    const nextGalleryImage = galleryImages[i + 1];

    if (refs.image.src === galleryImage.dataset.source) {
      return (refs.image.src = nextGalleryImage.dataset.source);
    } else if (refs.image.src === lastGalleryImage.dataset.source) {
      return (refs.image.src = firstGalleryImage.dataset.source);
    }
  }
}
