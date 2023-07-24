import { galleryItems } from "./gallery-items.js";
// Change code below this line

//створення посилання на галерею
const gallery = document.querySelector(".gallery");

//створення і рендер розмітки елементів галереї
//створюємо порожній масив, який заповнюємо розміткою для кожного елемента, шляхом перебирання масиву об'єктів з файлу - galleryItems
const items = [];

galleryItems.forEach(({ original, preview, description }) => {
   const galleryItem = document.createElement("li");
   galleryItem.classList.add("gallery__item");

   const galleryLink = document.createElement("a");
   galleryLink.classList.add("gallery__link");
   galleryLink.href = original;

   const galleryImage = document.createElement("img");
   galleryImage.classList.add("gallery__image");
   galleryImage.src = preview;
   galleryImage.setAttribute("title", description);
   galleryImage.alt = description;

   galleryItem.append(galleryLink);
   galleryLink.append(galleryImage);
   items.push(galleryItem);
});

gallery.append(...items);

// додавання затримки для опису зображення
new SimpleLightbox(".gallery a", {
   captionDelay: 250,
});
