import { galleryItems } from "./gallery-items.js";
// Change code below this line

//створення посилання на галерею
const gallery = document.querySelector(".gallery");

//створення і рендер розмітки елементів галереї
//створюємо порожній масив, який заповнюємо розміткою для кожного елемента, шляхом перебирання масиву об'єктів з файлу './gallery-items.js'

const items = [];

galleryItems.forEach(({ original, preview, description }) => {
   const galleryItem = document.createElement("li");
   galleryItem.classList.add("gallery__item");

   const galleryLink = document.createElement("a");
   galleryLink.classList.add("gallery__link");
   galleryLink.href = original;

   const galleryImg = document.createElement("img");
   galleryImg.classList.add("gallery__image");
   galleryImg.src = preview;
   galleryImg.setAttribute("data-source", original);
   galleryImg.alt = description;

   galleryItem.append(galleryLink);
   galleryLink.append(galleryImg);
   items.push(galleryItem);
});

gallery.append(...items);

// вішаємо слухача подій на галерею
document.addEventListener("click", onClick);

//пишемо функцію обробника подій
function onClick(evt) {
   evt.preventDefault();

   if (evt.target.nodeName !== "IMG") {
      return;
   }

   const imgOriginal = evt.target.getAttribute("data-source");

   //шаблон випадаючого зображення з налаштуваннями бібліотеки
   const template = basicLightbox.create(
      `
    <img src="${imgOriginal}" width="800" height="600">
    `,

      {
         onShow: () => {
            document.addEventListener("keydown", closeModal); // додавання слухача подій
         },

         onClose: () => {
            document.removeEventListener("keydown", closeModal); // знімання слухача подій
         },
      }
   );

   // показати шаблон зображення
   template.show();

   // функція перевірки натиску клавіші Escape
   function closeModal(e) {
      if (e.key === "Escape") {
         template.close();
      }
   }
}
