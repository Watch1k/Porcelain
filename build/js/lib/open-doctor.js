$(function() {
  var defaultOptions = {
    slidesToShow: 2,
    useTransform: true,
    infinite: true,
    cssEase: 'ease',
    speed: 800,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          variableWidth: false
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
    nextArrow: '.doctor_stories__next'
  }));

  // text crop
  $('.article_block__text').dotdotdot();
});