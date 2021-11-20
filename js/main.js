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

/*-----------------------------------------------------------------*/
const slides = document.querySelector(".container");
let activeLi = slides.getAttribute("data-position");
const country = document.getElementById("country");
const photo = document.getElementsByClassName("photo-image");

//표시되는 사진 카테고리별 길이파악<초기값은 셀렉트박스 첫번째 목록 길이로>
let select_length = 5;

//index.html에 select box에 onchang=함수명()_이벤트 발생 시 함수 호출
function selectBox() {
  select_length = 0;

  for (let j = 0; j < 19; j++) {
    if (
      country[country.selectedIndex].dataset.value === photo[j].dataset.value
    ) {
      select_length++;
      photo[j].parentElement.parentElement.style.display = "block";
    } else {
      photo[j].parentElement.parentElement.style.display = "none";
    }
  }
}

/*------------------------------------------------------------------*/

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
