// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed
$(document).ready(function () {
    $("#map-image").on("click")
    {

    }

    $('#go-to-top').click(function () {
        $('html,body').animate({scrollTop: 0}, 400);
        return false;
    });

    $(".gift-send").click(function () {
        $("#gift-name").text($(this).data("name"));
    })


    $("#reserveGiftButton").click(function () {
        let name = $("#sender-name").val();
        let message = $("#sender-message").val();
        $("#reserveGiftButton").text("전송중...");
        $("#reserveGiftButton").prop("disabled", true);

        emailjs.init("user_yjLL5xG0A3kkOCH5BGIDh");
        emailjs.send("wedding-mail", "gift_send", {
            name: name,
            gift: $("#gift-name").text(),
            message: message
        }).then(function (response) {
            $('#giftMailModal').modal('hide');
            alert(name + "님의 메시지가 정상적으로 전송되었습니다.");

            $("#reserveGiftButton").text("예약하기!");
            $("#sender-name").val('');
            $("#sender-message").val('');
            $("#reserveGiftButton").prop("disabled", false);
        }, function (err) {
            alert("메시지 전송이 실패했습니다. 다시 시도해주세요.");
        });
    })
})

// Smooth scroll for links with hashes
$("a.smooth-scroll").click(function (event) {
    // On-page links
    if (
        location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                1000,
                function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    }
                }
            );
        }
    }
});









$(document).on("ready", function(){
    $("body").append("<div id='menu-overlay'></div>");

    // 비주얼 영역 높이값 설정
	var hei = $(window).innerHeight();
	$(".visual-section.h-100").css("height", hei);

	// dim click
    $("#menu-overlay").click(function(){
        if($(this).hasClass("pop-on")){
            var id = $(this).data("pop-id");
            $(this).removeClass("pop-on").removeAttr("data-pop-id").removeData().fadeOut(100);
            $("#"+id+"").removeClass("pop-on").fadeOut(100);
        }
	});
});

$(window).on('load', function(){
	// 비주얼 영역 높이값 설정
	var w = $(window).innerWidth(),
		h = $(window).innerHeight();
	$(".visual-section.h-100").css("height", h);
});

function scrollFixed() { // 스크롤 Fixed
	var isTablet = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);
	var ovY;
	!isTablet === true ? (ovY = "scroll") : (ovY = "hidden");

	$("html").css({
		overflow : "hidden",
		"overflow-y" : ovY,
		position : "fixed",
		width : "100%",
		top : -$(window).scrollTop()
	});
}

function scrollAuto() {  // 스크롤 Auto
	var hTop = $("html").css("top");
	var hTop_2 = hTop.split("px");
	var winTop = Math.abs(hTop_2[0]);

	$("html").removeAttr("style");
	window.scrollTo(0, winTop);
}

function popOpen(padding, id) { // 팝업 열기 onclick
	// scrollFixed();
	// dim
	$("#menu-overlay")
	.addClass("pop-on")
	.attr("data-pop-id", id)
	.fadeIn(300);

	$("#"+id+"")
	.css({"padding": ""+padding+"", "margin-top": -$("#"+id+"")
	.outerHeight()/2})
	.addClass("pop-on")
	.fadeIn(300);
}

//RSVP 팝업
function popRsvp(toggle) { // 팝업 열기 onclick	
	var el = $("#openRsvpCon");	
	
	if(toggle === "open"){
		el.css({
			"opacity": 1,
			"transform": "translate3d(0,0,0)"
		});
		el.find(".pop-body").css({
			"visibility": "visible"
		}).delay(500).animate({
			"opacity" : 1
		}, 300);
		scrollFixed();
	} else if(toggle === "close"){		
		el.removeAttr("style");
		el.find(".pop-body").removeAttr("style");
		scrollAuto();
	}
}

function popClose(id) { // 팝업 닫기 onclick
	// scrollAuto();
	// dim click
	$("#menu-overlay[data-pop-id="+id+"]")
	.removeClass("pop-on")
	.removeAttr("data-pop-id")
	.removeData()
	.fadeOut(100);

	$("#"+id+"")
	.removeClass("pop-on")
	.fadeOut(100);
}

function dataPicker(data) { // 달력 출력
	var el = $("#calendar");
	var date = new Date(data);    

	el.datepicker({
		dateFormat: 'yyyy-mm-dd' //Input Display Format 변경
		,defaultDate: date // 기본 날짜 설정
		,showOtherMonths: false //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		,showMonthAfterYear: false //년도 먼저 나오고, 뒤에 월 표시
		,changeYear: false //콤보박스에서 년 선택 가능
		,changeMonth: false //콤보박스에서 월 선택 가능      
		,constrainInput: false //형식외 텍스트 입력제한. 디폴트 true
		//,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		//,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
		//,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
		//,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		//,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
		,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
		,monthNames: ['<strong>1</strong> January','<strong>2</strong> Fedruary','<strong>3</strong> March','<strong>4</strong> April','<strong>5</strong> May','<strong>6</strong> June','<strong>7</strong> July','<strong>8</strong> August','<strong>9</strong> September','<strong>10</strong> October','<strong>11</strong> November','<strong>12</strong> December'] //달력의 월 부분 Tooltip 텍스트
		,dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'Sa']
		,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
		//,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
		//,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
		,onSelect: function(date){
			
		}
	});
}

function dataPicker2(y,m,d) { // 달력 출력
	var el = $("#calendar");
	//var date = new Date(data);
    var date = new Date(y,m,d,'00','00');	

	el.datepicker({
		dateFormat: 'yyyy-mm-dd' //Input Display Format 변경
		,defaultDate: date // 기본 날짜 설정
		,showOtherMonths: false //빈 공간에 현재월의 앞뒤월의 날짜를 표시
		,showMonthAfterYear: false //년도 먼저 나오고, 뒤에 월 표시
		,changeYear: false //콤보박스에서 년 선택 가능
		,changeMonth: false //콤보박스에서 월 선택 가능      
		,constrainInput: false //형식외 텍스트 입력제한. 디폴트 true
		//,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
		//,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
		//,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
		//,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
		//,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
		,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
		,monthNames: ['<strong>1</strong> January','<strong>2</strong> Fedruary','<strong>3</strong> March','<strong>4</strong> April','<strong>5</strong> May','<strong>6</strong> June','<strong>7</strong> July','<strong>8</strong> August','<strong>9</strong> September','<strong>10</strong> October','<strong>11</strong> November','<strong>12</strong> December'] //달력의 월 부분 Tooltip 텍스트
		,dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'Sa']
		,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
		//,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
		//,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
		,onSelect: function(date){
			
		}
	});
}

var imgGallerySlider;
var popGallerySlider;
function imageGallery() { // 포토갤러리
	imgGallerySlider = $('#image-gallery').lightSlider({
		gallery:true,
		item:1,
		thumbItem:5,
		slideMargin: 0,
		speed:500,
		auto:false,
		loop:true,
		//adaptiveHeight:true,
		onSliderLoad: function() {
			$('#image-gallery').removeClass('cS-hidden');
		},
		onAfterSlide: function(el, index) {
			popGallerySlider.goToSlide(index);
		}
	});
}

function popGallery() { // 팝업갤러리
	popGallerySlider = $('#pop-gallery').lightSlider({
		gallery:true,
		item:1,
		thumbItem:5,
		slideMargin: 0,
		speed:500,
		auto:false,
		loop:true,
		//adaptiveHeight:true,
		onSliderLoad: function(el, index) {
			$('#pop-gallery').removeClass('cS-hidden');
			el.find("li:not(.clone)").eq(0).addClass("pg_idx");
		},
		onAfterSlide: function(el, index){

		}
	});
}

function galleryPOP(toggle, type, index) { // 갤러리팝업 열고,닫기
	if(type === "type1") return galleryType1(toggle);
	if(type === "type2") return galleryType2(toggle, index);
	if(type === "type3") return galleryType3(toggle, index);
}

function galleryType1(toggle){ // 슬라이드형 갤러리
	var el = $(".gallery-pop-wrap"),
		sw = $(".lSSlideWrapper");

	if(sw.hasClass('moveOn')) return this;
	
	if(toggle === "open"){
		el.css({
			"opacity": 1,
			"transform": "translate3d(0,0,0)"
		});
		el.find(".pop-body").css({
			"visibility": "visible"
		}).delay(500).animate({
			"opacity" : 1
		}, 300);
		scrollFixed();
	} else if(toggle === "close"){
		var index = $('#pop-gallery li.active').index();
		imgGallerySlider.goToSlide(index);
		el.removeAttr("style");
		el.find(".pop-body").removeAttr("style");
		scrollAuto();
	}
}

function galleryType2(toggle, index){ // 사각형 갤러리
	var el = $(".gallery-pop-wrap");

	if(toggle === "open"){
		popGallerySlider.goToSlide(index);
		el.css({
			"opacity": 1,
			"transform": "translate3d(0,0,0)"
		});
		el.find(".pop-body").css({
			"visibility": "visible"
		}).delay(400).animate({
			"opacity" : 1
		}, 300);
		scrollFixed();
	} else if(toggle === "close"){
		el.removeAttr("style");
		el.find(".pop-body").removeAttr("style");
		scrollAuto();
	}
}

function galleryType3(toggle, index){ // 원형 갤러리
	var el = $(".gallery-pop-wrap");

	if(toggle === "open"){
		popGallerySlider.goToSlide(index);
		el.css({
			"opacity": 1,
			"transform": "translate3d(0,0,0)"
		});
		el.find(".pop-body").css({
			"visibility": "visible"
		}).delay(400).animate({
			"opacity" : 1
		}, 300);
		scrollFixed();
	} else if(toggle === "close"){
		el.removeAttr("style");
		el.find(".pop-body").removeAttr("style");
		scrollAuto();
	}
}

function daumMap(x, y) { // 다음 지도
	var mapContainer = document.getElementById('map_canvas'), // 지도를 표시할 div 
		mapOption = {
			center: new daum.maps.LatLng(x, y), // 지도의 중심좌표
			level: 3 // 지도의 확대 레벨
		};  

	// 지도를 생성합니다    
	var map = new daum.maps.Map(mapContainer, mapOption); 

	// 마커가 표시될 위치입니다 
	var markerPosition  = new daum.maps.LatLng(x, y); 

	var daum_marker = new daum.maps.Marker({ 
		// 지도 중심좌표에 마커를 생성합니다 
		map: map,
		position: markerPosition
	}); 
}

function pcAlert() { // PC환경에서 접속시 alert
	alert('미리보기 페이지에서는 기능이 제한됩니다.');
}

function collapse(element) {
    var before = document.getElementsByClassName("active")[0]               // 기존에 활성화된 버튼
    if (before && document.getElementsByClassName("active")[0] != element) {  // 자신 이외에 이미 활성화된 버튼이 있으면
        before.nextElementSibling.style.maxHeight = null;   // 기존에 펼쳐진 내용 접고
        before.classList.remove("active");                  // 버튼 비활성화
    }
    element.classList.toggle("active");         // 활성화 여부 toggle

    var content = element.nextElementSibling;
    if (content.style.maxHeight != 0) {         // 버튼 다음 요소가 펼쳐져 있으면
        content.style.maxHeight = null;         // 접기
    } else {
        content.style.maxHeight = content.scrollHeight + "px";  // 접혀있는 경우 펼치기
    }
}

document.oncontextmenu = function(){return false;}

$(function(){
    $("#confirm").click(function(){
        modalClose();
        //컨펌 이벤트 처리
    });
    $("#modal-open").click(function(){        $("#popup").css('display','flex').hide().fadeIn();
    });
    $("#close").click(function(){
        modalClose();
    });
    function modalClose(){
      $("#popup").fadeOut();
    }
  });


  $(function(){
    $("#confirm2").click(function(){
        modalClose();
        //컨펌 이벤트 처리
    });
    $("#modal-open2").click(function(){$("#popup2").css('display','flex').hide().fadeIn();
    });
    $("#close").click(function(){
        modalClose();
    });
    function modalClose(){
      $("#popup2").fadeOut();
    }
  });

  function copy() {
    // 복사문구값 가져오기
    var copyTxt = document.getElementById("copyTxt");
  
    // 복사문구 선택
    copyTxt.select();
    copyTxt.setSelectionRange(0, 99999); // Mobile 대응
  
     // 복사
    navigator.clipboard.writeText(copyTxt.value);
  
    // 복사완료에 대해 Alert으로 띄우기
    alert("복사되었습니다.");
  }

  function copy1() {
    // 복사문구값 가져오기
    var copyTxt = document.getElementById("copyTxt1");
  
    // 복사문구 선택
    copyTxt.select();
    copyTxt.setSelectionRange(0, 99999); // Mobile 대응
  
     // 복사
    navigator.clipboard.writeText(copyTxt.value);
  
    // 복사완료에 대해 Alert으로 띄우기
    alert("복사되었습니다.");
  }

  function copy2() {
    // 복사문구값 가져오기
    var copyTxt = document.getElementById("copyTxt2");
  
    // 복사문구 선택
    copyTxt.select();
    copyTxt.setSelectionRange(0, 99999); // Mobile 대응
  
     // 복사
    navigator.clipboard.writeText(copyTxt.value);
  
    // 복사완료에 대해 Alert으로 띄우기
    alert("복사되었습니다.");
  }

  function copy3() {
    // 복사문구값 가져오기
    var copyTxt = document.getElementById("copyTxt3");
  
    // 복사문구 선택
    copyTxt.select();
    copyTxt.setSelectionRange(0, 99999); // Mobile 대응
  
     // 복사
    navigator.clipboard.writeText(copyTxt.value);
  
    // 복사완료에 대해 Alert으로 띄우기
    alert("복사되었습니다.");
  }

  function copy4() {
    // 복사문구값 가져오기
    var copyTxt = document.getElementById("copyTxt4");
  
    // 복사문구 선택
    copyTxt.select();
    copyTxt.setSelectionRange(0, 99999); // Mobile 대응
  
     // 복사
    navigator.clipboard.writeText(copyTxt.value);
  
    // 복사완료에 대해 Alert으로 띄우기
    alert("복사되었습니다.");
  }

  function copy5() {
    // 복사문구값 가져오기
    var copyTxt = document.getElementById("copyTxt5");
  
    // 복사문구 선택
    copyTxt.select();
    copyTxt.setSelectionRange(0, 99999); // Mobile 대응
  
     // 복사
    navigator.clipboard.writeText(copyTxt.value);
  
    // 복사완료에 대해 Alert으로 띄우기
    alert("복사되었습니다.");
  }




  //안드로이드 우측 버튼 비활성
  $(document).bind("contextmenu", function(e) {
	return false;
 });

//pc F12 개발자도구 비활성
$(document).bind('keydown',function(e){
	if ( e.keyCode == 123) {
		e.preventDefault();
		e.returnValue = false;
	}
});

$(".leftBtn").on("touchstart",function(e){
	e.preventDefault();
	_this.leftDownHandler();
   }).on("touchend",function(e){
	e.preventDefault();
	_this.leftUpHandler();
   }).on("touchmove",function(e){
	e.preventDefault();
	//_this.rightDownHandler();
  })