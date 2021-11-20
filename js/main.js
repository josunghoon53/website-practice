// 스크롤 할때 헤더 배경색 글씨색 변경
const color = document.querySelector("header");
const change = document.getElementById("fontcolor");

function checkScroll() {
  /*
      웹페이지가 수직으로 얼마나 스크롤되었는지를 확인하는 값(픽셀 단위로 반환)
      https://developer.mozilla.org/ko/docs/Web/API/Window/pageYOffset
    */
  let pageYOffset = window.pageYOffset;

  if (pageYOffset !== 0) {
    color.classList.add("changeColor");
  } else {
    color.classList.remove("changeColor");
  }
}

window.addEventListener("scroll", checkScroll);

/*
ChildNode 와 Children, firstChild와 firstElementChild 차이는 

전자의 경우 줄바꿈,커멘트노드까지 포함해서 반환되지만, 
후자의 경우 element node만을 반환한다.
*/

const country = document.getElementById("country");
const photo = document.getElementsByClassName("photo-image");

//index.html에 select box에 onchang=함수명()_이벤트 발생 시 함수 호출
function selectBox() {
  for (let j = 0; j < 19; j++) {
    if (
      country[country.selectedIndex].dataset.value === photo[j].dataset.value
    ) {
      photo[j].parentElement.parentElement.style.display = "block";
    } else {
      photo[j].parentElement.parentElement.style.display = "none";
    }
  }
}
