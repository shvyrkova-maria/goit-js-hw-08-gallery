import itemsArr from "/data/gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightbox: document.querySelector(".js-lightbox"),
  content: document.querySelector(".lightbox__content"),
  image: document.querySelector(".lightbox__image"),
  btnClose: document.querySelector(".lightbox__button"),
};

const galleryItems = createGalleryMarkup(itemsArr);
refs.gallery.insertAdjacentHTML("beforeend", galleryItems);

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

refs.gallery.addEventListener("click", onGalleryImageClick);
function onGalleryImageClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightbox.classList.add("is-open");
  refs.image.src = event.target.dataset.source;
}

refs.btnClose.addEventListener("click", onBtnCloseClick);
function onBtnCloseClick() {
  refs.lightbox.classList.remove("is-open");
  refs.image.src = "";
}
