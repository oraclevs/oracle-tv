
import {
  herosectionData,
} from "./Moviedata.js";
const MobilehambugerBtn = document.getElementById("nav-mobile-hambuger-icon");
const MobileNavbarBody = document.getElementById("mobileNavBarid");
const UserAuthbtn = document.getElementById("UserAuthbtn");
const userAuthBtnsShowModal = document.getElementById("userAuthBtnsShowModal");
const UserAuthbtn_mobile = document.getElementById("UserAuthbtn_mobile");
const mobileNavBar_close_icon = document.getElementById("mobileNavBar_close_icon");
let heroslide_one_img = document.getElementById("heroslide_one_img");
let heroslide_one_heading = document.getElementById("heroslide_one_heading");
let heroslide_one_text = document.getElementById("heroslide_one_text");
let heroslide_two_img = document.getElementById("heroslide_two_img");
let heroslide_two_heading = document.getElementById("heroslide_two_heading");
let heroslide_two_text = document.getElementById("heroslide_two_text");
let heroslide_three_img = document.getElementById("heroslide_three_img");
let heroslide_three_heading = document.getElementById(
  "heroslide_three_heading"
);
let heroslide_three_text = document.getElementById("heroslide_three_text");
let herosectionx = document.getElementById("herosectionx");

UserAuthbtn.addEventListener("click", () => {
  userAuthBtnsShowModal.classList.toggle("userAuthBtns-active");
  setTimeout(() => {
    userAuthBtnsShowModal.classList.remove("userAuthBtns-active");
  }, 3000);
});
UserAuthbtn_mobile.addEventListener("click", () => {
  userAuthBtnsShowModal.classList.toggle("userAuthBtns-active");
  MobileNavbarBody.classList.remove("mobileNavBar");
  setTimeout(() => {
    userAuthBtnsShowModal.classList.remove("userAuthBtns-active");
  }, 5000);
});

function userAuthBtnsShowModalStartUp() {
  userAuthBtnsShowModal.classList.add("userAuthBtns-active");
  setTimeout(() => {
    userAuthBtnsShowModal.classList.remove("userAuthBtns-active");
  }, 4000);
}
userAuthBtnsShowModalStartUp();
MobilehambugerBtn.addEventListener("click", () => {
  MobileNavbarBody.classList.toggle("mobileNavBar");
  console.log("mobile nav bar");
  setTimeout(() => {
    MobileNavbarBody.classList.remove("mobileNavBar");
  }, 10000);
});

mobileNavBar_close_icon.addEventListener("click", () => {
   MobileNavbarBody.classList.remove("mobileNavBar");
})


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

function herosectionDatashow() {
  if (window.innerWidth <= 430) {
    heroslide_one_img.src = `${herosectionData.slideoneimg_potrate}`;
    heroslide_one_heading.innerHTML = `${herosectionData.slideoneHeading}`;
    heroslide_one_text.innerHTML = `${herosectionData.slideonetext}`;
    heroslide_two_img.src = `${herosectionData.slide_two_img_potrate}`;
    heroslide_two_heading.innerHTML = `${herosectionData.slide_two_Heading}`;
    heroslide_two_text.innerHTML = `${herosectionData.slide_two_text}`;
    heroslide_three_img.src = `${herosectionData.slide_three_img_potrate}`;
    heroslide_three_heading.innerHTML = `${herosectionData.slide_three_Heading}`;
    heroslide_three_text.innerHTML = `${herosectionData.slide_three_text}`;
  } else {
    heroslide_one_img.src = `${herosectionData.slideoneimg_landscape}`;
    heroslide_one_heading.innerHTML = `${herosectionData.slideoneHeading}`;
    heroslide_one_text.innerHTML = `${herosectionData.slideonetext}`;
    heroslide_two_img.src = `${herosectionData.slide_two_img_landscape}`;
    heroslide_two_heading.innerHTML = `${herosectionData.slide_two_Heading}`;
    heroslide_two_text.innerHTML = `${herosectionData.slide_two_text}`;
    heroslide_three_img.src = `${herosectionData.slide_three_img_landscape}`;
    heroslide_three_heading.innerHTML = `${herosectionData.slide_three_Heading}`;
    heroslide_three_text.innerHTML = `${herosectionData.slide_three_text}`;
  }
}

herosectionDatashow();

