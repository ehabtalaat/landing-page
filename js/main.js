//check if  there is color in localStorage
let main_color = localStorage.getItem("option_color");
if (main_color !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("option_color")
  );
  //remove class active from all color list
  document.querySelectorAll(".setting ul li").forEach((element) => {
    element.classList.remove("active");
    // check if  main_color == element color
    if (element.dataset.color == main_color) {
      //add active main_color
      element.classList.add("active");
    }
  });
}
//select all the colors
document.querySelectorAll(".setting ul li").forEach((li) => {
  li.addEventListener("click", (e) => {
    //dataset mean data
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //set color on localStorage
    localStorage.setItem("option_color", e.target.dataset.color);
  });
});
//option to random the backgrounds or not
let randomOpation = true;
//the name of setInterval to random the backgrounds
let backgroundRandom;
//check if there option randombackground in localHost
let main_background = localStorage.getItem("option_background");
if (main_background !== null) {
  if (main_background == "true") {
    randomOpation = true;
  } else {
    randomOpation = false;
  }
  //remove class active from all color list
  document.querySelectorAll(".setting .setting-back span").forEach((span) => {
    span.classList.remove("active");
    // check if  main_background == true
    if (main_background == "true") {
      //add active main_color
      document
        .querySelector(".setting .setting-back span.yes")
        .classList.add("active");
      document.querySelectorAll(".images-options img").forEach((im) => {
        im.classList.remove("active");
      });
    } else {
      document
        .querySelector(".setting .setting-back span.no")
        .classList.add("active");
    }
  });
}
//jquery code
$(document).ready(function () {
  //when you click navbar icon the nav show on right not left
  $(".navbar-toggler-icon").on("click", () => {
    $(".navbar-nav").addClass("float-right");
  });
  //remove and add active to the link in nav bar
  $(".landingHeader .navbar a").on("click", (e) => {
    e.preventDefault();
    $(".landingHeader .navbar a").removeClass("active");
    $(e.target).addClass("active");
  });
  //make the setting show and hide
  $(".set").click((e) => {
    e.preventDefault();
    $(".setting").toggle(400);
  });
  //remove and add active to the colors
  $(".setting ul  li").on("click", (e) => {
    e.preventDefault();
    $(e.target).siblings().removeClass("active");
    $(e.target).addClass("active");
  });
  //remove and add active to the spnn (random background)
  $(".setting .setting-back span").on("click", (e) => {
    e.preventDefault();
    $(e.target).siblings().removeClass("active");
    $(e.target).addClass("active");
    if (e.target.dataset.random == "yes") {
      randomOpation = true;
      randombackgrounds();
      localStorage.setItem("option_background", true);
    } else if (e.target.dataset.random == "no") {
      randomOpation = false;
      clearInterval(backgroundRandom);
      localStorage.setItem("option_background", false);
    }
  });
  //add and remove active to side bullets option
  $(".setting .testing-option span").on("click", (e) => {
    e.preventDefault();
    $(e.target).siblings().removeClass("active");
    $(e.target).addClass("active");
  });
});

//get the page header
let Header = document.querySelector(".landingHeader");
//array of images
let imgArray = ["p.jpg", "p2.jpg", "p3.png", "p4.jpg", "p5.jpg"];
//make a function for set interval
function randombackgrounds() {
  if (randomOpation == true) {
    //make setInterval
    backgroundRandom = setInterval(() => {
      //generate random number
      let random_img = Math.floor(Math.random() * imgArray.length);
      // console.log(imgArray[random_img]);
      //style the header the backgroundImage
      Header.style.backgroundImage = `url("images/${imgArray[random_img]}")`;
    }, 1000);
  } else {
    clearInterval(backgroundRandom);
  }
}
randombackgrounds();
//progress in skills to look animate
window.onscroll = function () {
  //get the skills element
  let skills = document.querySelector(".skills");
  //get the element offset
  let skillsOffset = skills.offsetTop;
  //get the skill offsetheight
  let skillsHeight = skills.offsetHeight;
  //get window innerHeight
  let windowHeight = window.innerHeight;
  //get window scroll
  let windowScroll = window.pageYOffset;
  console.log(
    `${skillsOffset} , ${skillsHeight} ,${windowHeight} ,${windowScroll}`
  );
  if (windowScroll > skillsHeight + skillsOffset - windowHeight) {
    console.log(`good`);
    let allProgressbar = document.querySelectorAll(
      ".skills .progress-box .progress .progress-bar"
    );
    allProgressbar.forEach((progress) => {
      progress.style.width = progress.dataset.progress;
    });
  }
};
//select on images on when you click on it popup will show
let imagesAll = document.querySelectorAll(".our-gallery img");
imagesAll.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay
    let overlay_pop = document.createElement("div");
    //give overlay className
    overlay_pop.className = "overlay-pop";
    //append overlay pop
    document.body.appendChild(overlay_pop);
    //create bobbox
    let popup_box = document.createElement("div");
    //give popbox className
    popup_box.className = "popup-box";
    //create image
    let pop_img = document.createElement("img");
    //give img src
    pop_img.src = img.src;
    //append pop_img
    popup_box.appendChild(pop_img);
    //append popup box
    document.body.appendChild(popup_box);
    //create closing element
    let closeX = document.createElement("h3");
    //give closeX className
    closeX.className = "closebtn";
    //create textNode
    let closeText = document.createTextNode("X");
    //appeand text and element
    closeX.appendChild(closeText);
    popup_box.appendChild(closeX);
    if (img.alt !== null) {
      //create h3 element
      let header2 = document.createElement("h2");
      //give it textNode
      let header_text = document.createTextNode(img.alt);
      //append text and element
      header2.appendChild(header_text);
      popup_box.prepend(header2);
    }
  });
});
//remove overlay when click the close btn
document.addEventListener("click", function (e) {
  if (e.target.className == "closebtn") {
    e.target.parentNode.remove();
    document.querySelector(".overlay-pop").remove();
  }
});
//select all navbar items
let alllinks = document.querySelectorAll(".nav-item .nav-link");
//select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
//function scrollview
function scrollView(items) {
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
//call the function scrollView and do it on bullets
scrollView(allBullets);
//call the function scrollView and do it on nav items
scrollView(alllinks);

//code to make bullets show and hide
//select span form setting in bullets
let bulletsbtns = document.querySelectorAll(".testing-option span");
//select bullets nav
let bulletsNav = document.querySelector(".nav-bullets");
bulletsbtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (e.target.dataset.display == "show") {
      bulletsNav.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsNav.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
  });
});
//get bullets in local storage
let bullets_option = localStorage.getItem("bullets_option");
if (bullets_option !== null) {
  bulletsbtns.forEach((btns) => {
    btns.classList.remove("active");
  });
  if (bullets_option == "block") {
    bulletsNav.style.display = "block";
    document.querySelector(".testing-option .yes").classList.add("active");
  } else {
    bulletsNav.style.display = "none";
    document.querySelector(".testing-option .no").classList.add("active");
  }
}
//get the images from the images options
let imgsOptions = document.querySelectorAll(".images-options img");
imgsOptions.forEach((image) => {
  image.addEventListener("click", (e) => {
    e.target.parentElement
      .querySelectorAll(".images-options img")
      .forEach((im) => {
        im.classList.remove("active");
      });
    e.target.classList.add("active");
    randomOpation = false;
    clearInterval(backgroundRandom);
    let imgUrl = image.dataset.image;
    Header.style.backgroundImage = `url("images/${imgUrl}")`;
    document.querySelector(".setting-back .yes").classList.remove("active");
    document.querySelector(".setting-back .no").classList.add("active");
  });
});
// click on button to scroll to about us
let btnLearn = document.querySelector(".learn");
btnLearn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(e.target.dataset.scrolled).scrollIntoView({
    behavior: "smooth",
  });
});
