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
      country[i].style.display = "flex";
    } else {
      country[i].style.display = "none";
    }
  }

  //select 카테고리에 맞는 사진 재배치.
  currentIdx = 0;
  setSlide();
}

/*--------------반응형 슬라이드----------------*/
const slides = document.querySelector(".slide-wrap");
const slide_margin = 10;
const right = document.querySelector(".right");
const left = document.querySelector(".left");
const control = document.querySelector(".control");
let moveWidth = 426;

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
  length = country[index].childElementCount;

  let items = document.querySelectorAll(".box-sub");
  for (var i = 0; i < items.length; i++) {
    items[i].style.width = sliderItemWidth + "px";
    items[i].style.height = sliderItemWidth * 1.35 + "px";
  }

  country[index].classList.remove("transition");
  country[index].style.left = currentIdx * moveWidth + "px";
  control.style.bottom = moveWidth / 1.2 + "px";
  //2개였다가 3개로 변하는 시점 슬라이드 재배치
  if (currentIdx == 2 - length && display == 3) {
    country[index].style.left = (currentIdx + 1) * moveWidth + "px";
    currentIdx += 1;
  }
}

//새로고침 했을 때 반응형 반영한 슬라이드 크기 구현 &&
//레이아웃 생성
resizeSlider();

//슬라이드 좌우버튼 누를 시 슬라이드 위치 조정
function setSlide() {
  country[index].style.left = currentIdx * moveWidth + "px";
  country[index].classList.add("transition");
}

left.addEventListener("click", function () {
  if (display - country[index].childElementCount !== currentIdx) {
    currentIdx -= 1;
    setSlide();
  }
});
right.addEventListener("click", function () {
  if (currentIdx !== 0) {
    currentIdx += 1;
    setSlide();
  }
});

/*-----------------이미지 클릭시 크게보기-------------------*/

const temp = document.querySelector(".overlayPhoto");
const all_imgbox = document.querySelectorAll(".box-sub");

for (let k = 0; k < all_imgbox.length; k++) {
  all_imgbox[k].addEventListener("click", function (e) {
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
