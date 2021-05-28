// // //상단 팝업
// function getCookie(cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") c = c.substring(1);
//     if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
//   }
//   return "";
// }

// function setCookie(cname, cvalue, exdays) {
//   var d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   var expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + "; " + expires;
// }

// function popupClose(e) {
//   if ($(".layer-popup-wrap input[name='chkbox']").is(":checked") == true) {
//     setCookie("close", "Y", 1);
//   }

//   if ($(".layer-popup-wrap .layer-popup").length == 1) {
//     $(e.target).parent().parent().remove();
//     $(".layer-popup-wrap").remove();
//   } else {
//     $(e.target).parent().parent().remove();
//   }
// }
// cookiedata = document.cookie;
// if (cookiedata.indexOf("close=Y") < 0) {
//   $(".layer-popup-wrap").show();
// } else {
//   $(".layer-popup-wrap").hide();
// }
// $(".layer-popup-wrap .close").on("click", function (e) {
//   popupClose(e);
// });
// $(".layer-popup-wrap .layer-popup").draggable({
//   start: function () {
//     $(this).css({
//       transform: "none",
//       top: $(this).offset().top + "px",
//       left: $(this).offset().left + "px",
//     });
//   },
// });

// $(".layer-popup-wrap .layer-popup").draggable({
//   start: function () {
//     $(this).css({
//       transform: "none",
//       top: $(this).offset().top + "px",
//       left: $(this).offset().left + "px",
//     });
//   },
// });

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

  // 언어 키보드 접근성
  $(".lang button").on("focus", function () {
    $(".lang .en").css("display", "block");
  });
  $(".lang .en").on("focusout", function () {
    $(this).css("display", "none");
  });
  $(".slick-slide a,.slick-slide div,slick-slide img,.slick-slide").on(
    "focus",
    function () {
      $(this).css("border", "2px solid #000");
    }
  );
  $(".slick-slide a,.slick-slide div,slick-slide img,.slick-slide").on(
    "focusout",
    function () {
      $(this).css("border", "none");
    }
  );

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

  // 바텀 fixed

  var nav = document.querySelector("#fixed-bottom-nav");
  if (nav) {
    var rectTop = nav.getBoundingClientRect().top;
    var winHeight = $(window).height();
  }
  window.addEventListener("scroll", function () {
    if (nav) {
      if (window.pageYOffset > rectTop - 92) {
        nav.classList.add("fixed-bottom-lg");
      } else {
        nav.classList.remove("fixed-bottom-lg");
      }
      if (rectTop < 900) {
        if (window.pageYOffset < winHeight) {
          nav.classList.remove("fixed-bottom-lg");
        }
      }

      // if (window.pageYOffset > winHeight - 300) {
      // Top 상단바로가기 버튼
      //  $(".btn-top-quick").removeClass("none");
      // } else {
      //   $(".btn-top-quick").addClass("none");
      // }
    }

    //상단 바로가기 버튼
    $(".btn-top-quick").on("click", function () {
      $("html").scrollTop(0);
      console.log("ok");
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

  // 조직도 팝업
  $(document).on(
    "click",
    ".com_int_org .popup-link, .biz_prom_small_70 .popup-link, .ops a.popup-link, .ops .popup-link a, .video-table .popup-link a, .biz_pub_ad_data .popup-link a, .biz_pub_ad_suggest .popup-link a",
    function () {
      var self = $(this);
      var currentTab = $(this).attr("href");
      $(".popup-box").hide();
      $(currentTab).show();

      // $(currentTab).attr("tabindex", "0").show().focus();

      $(this).addClass("on");

      $(".popup-center").on("click", "a.close", function () {
        $(".popup-box").hide();
        $(self).focus();
      });
    }
  );

  // .biz_prom_small_90.html 페이지 dept-4 수정
  if (
    $(".biz_prom_small_90").length ||
    $(".biz_prom_small_70").length ||
    $(".biz_prom_small_50").length
  ) {
    $(".dept-4-tabs .table-cell").addClass("responsive");
  }

  //$(".copy-link").on("focus", function () {
  //  var target = $(".copy-link").offset().top - 100;
  //  $(window).scrollTop(target);
  //  console.log("i");
  //});
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
function printPage() {
  var inbody = document.body.innerHTML; // 이전 body 영역 저장

  window.onbeforeprint = function () {
    // 프린트 화면 호출 전 발생하는 이벤트

    document.body.innerHTML = document.getElementById("main").innerHTML; // 원하는 영역 지정
  };

  window.onafterprint = function () {
    // 프린트 출력 후 발생하는 이벤트

    document.body.innerHTML = inbody; // 이전 body 영역으로 복구
  };

  window.print();

  location.reload();
}

// // 목록에서 선택 AJAX (biz_pub_ad_data)
// $(".biz_pub_ad_data .left button").on("click", function (e) {
//   var catId = $(this).data("value");

//   e.preventDefault();

//   $(".biz_pub_ad_data .left button").removeClass("active");
//   $(this).toggleClass("active");

//   $.ajax({
//     type: "get",
//     url: "/site/main/code/api/item/jsonList",
//     data: {
//       catId: catId,
//     },
//     dataType: "json",
//     success: function (result) {
//       $(".biz_pub_ad_data .right ul").empty();

//       if (result.length > 0) {
//         $.each(result, function (index, item) {
//           $(".biz_pub_ad_data .right ul").append(
//             "<li><div class='check-wrap'><input type='checkbox' id='sort_" +
//               (index + 1) +
//               "' name='category2' value='" +
//               item.codeId +
//               "' /><label for='sort_" +
//               (index + 1) +
//               "'>" +
//               item.codeName +
//               "</label></div></li>"
//           );
//         });
//       }
//     },
//   });

//   // // Check box 중복선택 방지 (biz_pub_ad_data)
//   // $(".biz_pub_ad_data .right .check-wrap input").on("click", function (e) {
//   //   var obj = document.getElementsByName("category2");
//   //   for (var i = 0; i < obj.length; i++) {
//   //     if (obj[i] != e.target) {
//   //       obj[i].checked = false;
//   //     }
//   //   }
//   // });
// });
