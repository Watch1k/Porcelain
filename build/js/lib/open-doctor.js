$(function() {
  var defaultOptions = {
    slidesToShow: 2,
    useTransform: true,
    infinite: true,
    speed: 800,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  $('.doctor_publications').slick($.extend(true, defaultOptions, {
    prevArrow: '.doctor_publications__prev',
    nextArrow: '.doctor_publications__next'
  }));

  $('.doctor_stories__container').slick($.extend(true, defaultOptions, {
    prevArrow: '.doctor_stories__prev',
    nextArrow: '.doctor_stories__next',
    variableWidth: true
  }));
});