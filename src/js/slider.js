$(function () {
  // 메인 비쥬얼 슬라이더
  $(".main-visual-slider .slick-wrapper").slick({
    infinite: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    pauseOnHover: false,
    prevArrow: $(".main-visual-slick-prev"),
    nextArrow: $(".main-visual-slick-next"),
    appendDots: $(".main-visual-slider .control"),
    // nextArrow: $slidersecNext,
  });
  $(".main-visual-slider .slide").attr("tabindex", "-1");
  $(".main-visual-slick-pause").on("click", function () {
    $(".main-visual-slider .slick-wrapper")
      .slick("slickSetOption", "autoplay", false)
      .slick("slickPause");
    $(this).toggleClass("none");
    $(".main-visual-slick-play").toggleClass("none");
  });
  $(".main-visual-slick-play").on("click", function () {
    $(".main-visual-slider .slick-wrapper")
      .slick("slickSetOption", "autoplay", true)
      .slick("slickPlay");
    $(this).toggleClass("none");
    $(".main-visual-slick-pause").toggleClass("none");
  });
  // 메인 section-2 게시판 탭버튼

  // 메인 section-2  왼쪽 슬라이더
  $(".main-section-2-left-slider .slick-wrapper").slick({
    infinite: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: false,
    prevArrow: $(".main-section-2-left-slick-prev"),
    nextArrow: $(".main-section-2-left-slick-next"),
    appendDots: $(" .main-section-2-left-slider .control"),
    pauseOnFocus: true,
    pauseOnHover: false,
    // nextArrow: $slidersecNext,
  });

  $(".main-section-2-left-slick-pause").on("click", function () {
    $(".main-section-2-left-slider .slick-wrapper")
      .slick("slickSetOption", "autoplay", false)
      .slick("slickPause");
    $(this).toggleClass("none");
    $(".main-section-2-left-slick-play").toggleClass("none");
  });
  $(".main-section-2-left-slick-play").on("click", function () {
    $(".main-section-2-left-slider .slick-wrapper")
      .slick("slickSetOption", "autoplay", true)
      .slick("slickPlay");
    $(this).toggleClass("none");
    $(".main-section-2-left-slick-pause").toggleClass("none");
  });

  // 메인 section-2  오른쪽 슬라이더
  $(".main-section-2-right-slider .slick-wrapper").slick({
    infinite: true,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    dots: false,
    prevArrow: $(".main-section-2-right-slick-prev"),
    nextArrow: $(".main-section-2-right-slick-next"),
    appendDots: $(" .main-section-2-right-slider .control"),
    pauseOnFocus: true,
    pauseOnHover: false,
    // nextArrow: $slidersecNext,
  });

  $(".main-section-2-right-slick-pause").on("click", function () {
    $(".main-section-2-right-slider .slick-wrapper")
      .slick("slickSetOption", "autoplay", false)
      .slick("slickPause");
    $(this).toggleClass("none");
    $(".main-section-2-right-slick-play").toggleClass("none");
  });
  $(".main-section-2-right-slick-play").on("click", function () {
    $(".main-section-2-right-slider .slick-wrapper")
      .slick("slickSetOption", "autoplay", true)
      .slick("slickPlay");
    $(this).toggleClass("none");
    $(".main-section-2-right-slick-pause").toggleClass("none");
  });
});
