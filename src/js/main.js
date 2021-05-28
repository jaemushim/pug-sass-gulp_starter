$(function () {
  // 접근성 본문 바로가기
  $(".accessibility a").on("focus", function () {
    $(this).css("top", 0);
  });
  $(".accessibility a").focusout(function () {
    $(this).css("top", "-50px");
  });

  // 모바일 GNB
  $(".m-ham").on("click", function (e) {
    $(".gnb .dept-1").toggleClass("active");
    $(".wrapper").toggleClass("darked");
    $(this).toggleClass("active");

    e.preventDefault();
  });
  $(".gnb .dept-1__item>a")
    .not($(".gnb .dept-1__item.newPage a"))
    .on("click", function (e) {
      if ($(".gnb .dept-1").hasClass("active")) {
        $(".gnb .dept-1__item").not($(this).parent()).removeClass("active");
        $(".gnb .dept-1__item")
          .not($(this).parent())
          .find(".dept-2__item")
          .removeClass("active");
        if (!$(this).parent().hasClass("active")) {
          $(this).parent().toggleClass("active");
        }
        e.preventDefault();
      }
    });
  $(".gnb .dept-2__item >a")
    .not($(".dept-2__item.newPage > a"))
    .not($(".dept-2__item.hasNotChild > a"))
    .on("click", function (e) {
      if ($(".gnb .dept-1").hasClass("active")) {
        $(".gnb .dept-2__item").not($(this).parent()).removeClass("active");
        $(this).parent().toggleClass("active");

        e.preventDefault();
      }
    });

  // gnb 접근성
  $(".dept-1__item a").on("focus mouseover", function () {
    $(this).addClass("on");
    $(this).parent().addClass("on");
    $("#header").addClass("bg-white");
    $(this).next(".dept-2-wrap").css("display", "block");
  });

  $(".dept-1__item").mouseleave(function () {
    $(".dept-2-wrap").css("display", "none");
    $(this).removeClass("on");
    $(this).children("a").removeClass("on");
    $(this).children(".dept-2-wrap").css("display", "none");
  });

  $(".dept-1__item >a").on("focus", function () {
    $(".dept-2-wrap").not($(this).next(".dept-2-wrap")).css("display", "none");
    $(this).next(".dept-2-wrap").css("display", "block");
  });

  $(".btn-search").focus(function () {
    $(".dept-1__item").removeClass("on");
    $(".dept-1__item a").removeClass("on");
    $(".dept-2-wrap").css("display", "none");
  });

  // (모바일 GNB 검색 Open wrap) 비활성화 검은배경 클릭시 active 요소 종료
  $(".wrapper").on("click", function (e) {
    $(".dept-1").removeClass("active");
    $(".search-open-wrap").removeClass("active");
    $(".gnb .m-ham,.gnb .btn-search").removeClass("active");
    $(this).removeClass("darked");
  });
  // 메인 검색하기 오픈
  $(".gnb .btn-search").on("click", function () {
    $(this).toggleClass("active");
    $(".search-open-wrap").toggleClass("active");
    $(".wrapper").toggleClass("darked");
  });

  //

  $(".dept-1__item").bind("mouseenter focusin", function () {
    $(this).addClass("on").siblings().removeClass("on");
  });
  $(".dept-1__item").bind("mouseleave focusout", function () {
    $(this).removeClass("on");
  });

  // 메인 section-2 게시판 클릭
  if ($("#wrapper").hasClass("main")) {
    $(".section-2 .f-left .nav button").click(function () {
      $(".section-2 .f-left .nav button").not($(this)).removeClass("on");
      $(".section-2 .f-left .nav button")
        .not($(this))
        .parents(".nav")
        .find(".active")
        .removeClass("active");
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        $(this).parents(".nav").find(".content").addClass("active");
      }
    });

    //섹션 2 게시판 탭메뉴 스크롤 기능
    var slider = document.querySelector(".section-2 .box ul");
    var preventClick = function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    var isDown = false;
    var isDragged = false;
    var startX;
    var scrollLeft;

    slider.addEventListener("mousedown", function (e) {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", function () {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", function (e) {
      isDown = false;
      var elements = document.querySelectorAll("a");
      if (isDragged) {
        for (var i = 0; i < elements.length; i++) {
          elements[i].addEventListener("click", preventClick);
        }
      } else {
        for (var i = 0; i < elements.length; i++) {
          elements[i].removeEventListener("click", preventClick);
        }
      }
      slider.classList.remove("active");
      isDragged = false;
    });
    slider.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      isDragged = true;
      e.preventDefault();
      var x = e.pageX - slider.offsetLeft;
      var walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  //상단 바로가기 버튼
  $(".btn-top-quick").on("click", function () {
    $("html").scrollTop(0);
  });

  // 헤더 고정
  var height = $(window).scrollTop();
  if (height > 91) {
    $(".gnb").addClass("lg:fixed border-b-1-ddd");
  } else {
    $(".gnb").removeClass("lg:fixed border-b-1-ddd");
  }
});

// 서브메뉴 현재위치 Dept 버튼
$(".sub .location .dept button").on("click", function () {
  $(this).parent().toggleClass("active");
});

if ($(".btn-search").hasClass("active")) {
  $(".gnb .open").css("display", "none");
}

$(".gnb .dept-1__item")
  .on("mouseenter", function () {
    if (!$(".btn-search").hasClass("active")) {
      $(this).find(".open").css("display", "table");
    }
  })
  .on("mouseleave", function () {
    if (!$(".btn-search").hasClass("active")) {
      $(this).find(".open").css("display", "none");
    }
  });

// 서브페이지 타이틀 섹션 링크복사
var $temp = $("<input>");
var $url = $(location).attr("href");
// $("document").on("click", ".copy-link", function (e) {
//   $("body").append($temp);
//   $temp.val($url).select();
//   document.execCommand("copy");
//   $temp.remove();
//   $(".title-sec .alert-box").fadeIn(300).delay(1500).fadeOut(400);
// });

$(".copy-link").on("click", function () {
  $("body").append($temp);
  $temp.val($url).select();
  document.execCommand("copy");
  $temp.remove();
  $(".title-sec .alert-box").fadeIn(300).delay(1500).fadeOut(400);
});

// // Check box 중복선택 방지 (biz_pub_ad_data)
// $(".biz_pub_ad_data .right .check-wrap input").on("click", function (e) {
//   var obj = document.getElementsByName("category2");
//   for (var i = 0; i < obj.length; i++) {
//     if (obj[i] != e.target) {
//       obj[i].checked = false;
//     }
//   }
// });
// });
