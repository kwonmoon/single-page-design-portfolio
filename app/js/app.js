const carousel = document.querySelector(".slide__carousel");
const imagesContainer = document.querySelector(".slide__carousel__images");
const images = document.querySelectorAll(".slide__carousel__images img");

document.addEventListener("DOMContentLoaded", () => {
   repositionImages();

   document.querySelector(".slide__arrow__left").addEventListener("click", () => {
      var firstImage = imagesContainer.firstElementChild;
      imagesContainer.appendChild(firstImage);
   });
   
   document.querySelector(".slide__arrow__right").addEventListener("click", () => {
      var lastImage = imagesContainer.lastElementChild;
      imagesContainer.insertBefore(lastImage, imagesContainer.firstElementChild);
   });
});

const calcAdjustPosition = (viewWidth, imageWidth, gap) => {
   var numImage = Math.floor(viewWidth / imageWidth);
   var remainder = viewWidth % imageWidth;

   if (numImage === 1) {
      return -((imageWidth - remainder) + gap + (viewWidth - imageWidth) / 2);
   } else if (numImage === 2) {
      return -(imageWidth - remainder - (numImage * gap));
   } else {
      return 0;
   }
}

const repositionImages = () => {
   var imageWidth = images[0].offsetWidth;
   var gap = (images[1].offsetLeft - images[0].offsetLeft) - imageWidth;
   var viewWidth = carousel.clientWidth;
   var newPosition = calcAdjustPosition(viewWidth, imageWidth, gap);

   imagesContainer.style.transform = `translateX(${newPosition}px)`;
}

window.addEventListener("resize", event => {
   repositionImages();
});
