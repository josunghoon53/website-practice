// 스크롤 할때 헤더 배경색 글씨색 변경
const color = document.querySelector("header");
const fontcolor = document.querySelectorAll(".head-container a");
function checkScroll() {
  /*
      웹페이지가 수직으로 얼마나 스크롤되었는지를 확인하는 값(픽셀 단위로 반환)
      https://developer.mozilla.org/ko/docs/Web/API/Window/pageYOffset
    */
  let pageYOffset = window.pageYOffset;

  if (pageYOffset !== 0) {
    color.classList.add("changeColor");
    fontcolor[0].style.color = "black";
    fontcolor[1].style.color = "black";
  } else {
    color.classList.remove("changeColor");
    fontcolor[0].style.color = "#e0e0e0";
    fontcolor[1].style.color = "#e0e0e0";
  }
}

window.addEventListener("scroll", checkScroll);

/*
ChildNode 와 Children, firstChild와 firstElementChild 차이는 

전자의 경우 줄바꿈,커멘트노드까지 포함해서 반환되지만, 
후자의 경우 element node만을 반환한다.
*/

/*------------------selectBox--------------------*/

const country = document.querySelectorAll(".country");
const selectedCode = document.getElementById("selectCountry");

//selected_default값
let index = selectedCode.selectedIndex;
let currentIdx = 0;

function selectBox() {
  //select값 재할당
  index = selectedCode.selectedIndex;

  for (let i = 0; i < 3; i++) {
    if (selectedCode.selectedIndex === Number(country[i].dataset.value)) {
      country[i].style.display = "block";
    } else {
      country[i].style.display = "none";
    }
  }

  //select 카테고리에 맞는 사진 재배치.
  currentIdx = 0;
  setLayout();
}

/*--------------반응형 슬라이드----------------*/
const slides = document.querySelector(".slide-wrap");
const slide_margin = 30;
const right = document.querySelector(".right");
const left = document.querySelector(".left");
let moveWidth = 420;

//resize 될 때마다 크기 조정
window.onresize = function () {
  resizeSlider();
};

function resizeSlider() {
  if (
    (window.innerWidth < 1200 && window.innerWidth >= 1000) ||
    window.innerWidth >= 1200
  ) {
    display = 3;
  } else {
    display = 2;
  }

  slidesWidth = slides.offsetWidth - slide_margin * (display - 1);
  sliderItemWidth = slidesWidth / display;
  moveWidth = sliderItemWidth + slide_margin;

  let items = document.querySelectorAll(".box-sub");
  for (var i = 0; i < items.length; i++) {
    items[i].style.width = sliderItemWidth + "px";
    items[i].style.height = sliderItemWidth * 1.25 + "px";
  }

  setLayout();
}

function setLayout() {
  for (let j = 0; j < country[index].childElementCount; j++) {
    country[index].children[j].style.left = (j + currentIdx) * moveWidth + "px";
    country[index].children[j].classList.remove("transition");
  }
}

/*새로고침 했을 때 반응형 반영한 슬라이드 크기 구현&&
  레이아웃 생성*/

resizeSlider();
setLayout();

function moveSlide() {
  for (let l = 0; l < country[index].childElementCount; l++) {
    country[index].children[l].style.left = (l + currentIdx) * moveWidth + "px";
    country[index].children[l].classList.add("transition");
  }
}

left.addEventListener("click", function () {
  if (display - country[index].childElementCount !== currentIdx) {
    currentIdx -= 1;
    moveSlide();
  }
});

right.addEventListener("click", function () {
  if (currentIdx !== 0) {
    currentIdx += 1;
    moveSlide();
  }
});

/*
const slides = document.querySelector(".container");
let activeLi = slides.getAttribute("data-position");
const country = document.getElementById("country");
const photo = document.getElementsByClassName("photo-image");

//표시되는 사진 카테고리별 길이파악<초기값은 셀렉트박스 첫번째 목록 길이로>
let select_length = 4;

//index.html에 select box에 onchang=함수명()_이벤트 발생 시 함수 호출
function selectBox() {
  select_length = 0;
  activeLi = 0;

  //selectBox의 값이 바뀌면 x의 위치 처음으로 바꾸기
  slides.style.transition = "transform 0s";
  slides.style.transform = "translateX(" + 0 + "px)";
  slides.setAttribute("data-position", activeLi);

  let selectNum = country[country.selectedIndex].dataset.value;
  for (let j = 0; j < 16; j++) {
    if (selectNum === photo[j].dataset.value) {
      select_length++;
      photo[j].parentElement.parentElement.style.display = "block";
    } else {
      photo[j].parentElement.parentElement.style.display = "none";
    }
  }
}

/*------------------------------------------------------------------*/
/*

const slide = document.querySelectorAll(".container li");
const right = document.querySelector(".right");
const left = document.querySelector(".left");
const slideCount = slide.length;

right.addEventListener("click", function () {
  if (slides.clientWidth < select_length * 385 + Number(activeLi)) {
    if ((3 - select_length) * 385 !== activeLi) {
      activeLi = Number(activeLi) - 385;
      slides.style.transition = "transform 1s";
      slides.style.transform = "translateX(" + String(activeLi) + "px)";
      slides.setAttribute("data-position", activeLi);
    }
  }
});

left.addEventListener("click", function () {
  if (Number(activeLi) < 0) {
    activeLi = Number(activeLi) + 385;
    slides.style.transition = "transform 1s";
    slides.style.transform = "translateX(" + String(activeLi) + "px)";
    slides.setAttribute("data-position", activeLi);
  }
});

/*------------------------------------------------------*/

/*
const temp = document.querySelector(".overlayPhoto");

for (let k = 0; k < slideCount; k++) {
  slide[k].addEventListener("click", function (e) {
    const output = e.target;
    temp.children[0].src = output.currentSrc;

    let w = output.naturalWidth;
    let h = output.naturalHeight;

    temp.children[0].clientWidth = w;
    temp.children[0].clientHeight = h;

    overlay.classList.add("show");

    //오버레이된 창 누르면 다시 사라지게 하기
    overlay.addEventListener("click", function () {
      overlay.classList.remove("show");
    });
  });
}
*/
