let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}



let slideshowContainer = document.getElementsByClassName('slideshow-container')[0];
slideshowContainer.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});


function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}













$('.slider-2 .page-nav > div').click(function() {
    
  var $this = $(this);
  var $pagenav = $this.parent()
  var $current = $pagenav.find('.active');
  
  $current.removeClass('active');
  $this.addClass('active');

  var index = $this.index();
  var $슬라이더 = $this.closest('.slider-2');
  
  $슬라이더.find('.slides > div.active').removeClass('active');
  $슬라이더.find('.slides > div').eq(index).addClass('active');
  
  
});

$('.slider-2 > .side-btns > div:first-child').click(function() {
  var $this = $(this);
  var $slider = $this.closest('.slider-2');
  
  var $current = $slider.find('.page-nav > div.active');
  var $post = $current.prev();
  
  if ( $post.length == 0 ) {
      $post = $slider.find('.page-nav > div:last-child');
  }
  
  $post.click();
});

$('.slider-2 > .side-btns > div:last-child').click(function() {
  var $this = $(this);
  var $slider = $this.closest('.slider-2');
  
  var $current = $slider.find('.page-nav > div.active');
  var $post = $current.next();
  
  if ( $post.length == 0 ) {
      $post = $slider.find('.page-nav > div:first-child');
  }
  
  $post.click();
});






