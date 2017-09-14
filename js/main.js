$(document).ready(function() {
    var totalSlides = $(".slider__train li").length;
    var currentSlide = 1;
    var maxSlide = 7;
    var viewport = {
        width: $(window).width()
    };

    var trainCrop = {
        width: $(".slider").width()
    }
    var slide = {
        width: $("slider__train li").width()
    }
    var sliderTrain = $(".slider__train");

    function resizeSlider() {
        viewport = {
            width: $(window).width()

        };
        trainCrop = {
            width: $(".slider").width()
        }
        // console.log(viewport.width);

        if (viewport.width < 700) {

            slide = {
                width: trainCrop.width
            }
            maxSlide = totalSlides;

            $(sliderTrain).css({
                "width": (trainCrop.width * totalSlides) + "px"
            });

            $(".slider__train li").css({
                "width": trainCrop.width + "px"
            }); // vp width

        } else { //tablet or desktop

            slide = {
                width: trainCrop.width / 3
            }
            maxSlide = totalSlides - 2;


            $(sliderTrain).css({
                "width": ((trainCrop.width / 3) * totalSlides) + "px"
            });

            $(".slider__train li").css({
                "width": (trainCrop.width / 3) + "px"
            }); // vp width
        };
        realignTrain(currentSlide);
    } //this is where we stuck all the stuff so we can call to it globally and locally when width is adjusted

    $(window).resize(function() {
        resizeSlider();
    }); //resize


    resizeSlider();

    function realignTrain(slideNum) {
        if (viewport.width > 700 && slideNum >= totalSlides - 2) {

            $(sliderTrain).stop().animate({
                "margin-left": (((slideNum - 3) * slide.width) * -1) + "px"
            }); //animate 
            currentSlide = totalSlides - 2;
        } else {

            $(sliderTrain).stop().animate({
                "margin-left": (((slideNum - 1) * slide.width) * -1) + "px"
            }); //animate 
        } //end if
    } //realign train


    function moveTrainNegative() {
        currentSlide++;
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        } else {
            $(sliderTrain).animate({
                "margin-left": "-=" + slide.width + "px"
            }); //animate movement
        } //else
        realignTrain(currentSlide);
    }; // close neg

    function moveTrainPositive() {
        currentSlide--; //
        if (currentSlide < 1) {
            currentSlide = 1; //stops if goes too far/don't animate if less than 1
        } else {
            $(sliderTrain).stop().animate({
                "margin-left": "+=" + slide.width + "px"
            }); //animate movement
        } //else
        realignTrain(currentSlide);
    }; // close neg

    $(".arrowBtn__next").click(function(event) {
        event.preventDefault();
        moveTrainNegative();
        realignTrain(currentSlide);
    }); //event
    $(".arrowBtn__prev").click(function(event) {
        event.preventDefault();
        moveTrainPositive();
        // console.log(currentSlide);
        realignTrain(currentSlide);
    }); //event

    var touchstartX, touchendX, touchTarget;
    var trainleft, trainDistance;

    $(".slider").on("touchstart", function(event) {
        // console.log("touchstart");
        // console.log(event);
        touchTarget = event.target;
        touchstartX = event.originalEvent.changedTouches[0].screenX;
        trainLeft = $(".slider__train").offset().left;
        trainDistance = touchstartX - trainLeft;
        // console.log(touchstartX);
    });

    $(".slider").on("touchmove", function(event) {
        touchendX = event.originalEvent.changedTouches[0].screenX;
        $(sliderTrain).css({
            "margin-left" : (touchendX-trainDistance) + "px"
        })
        // console.log("touchmove");
    });
    $(".slider").on("touchend", function(event) {
        // console.log(touchendX);
        // touchstartX = event.orgionalEvent.touches[0].screenX;
        if (touchendX < touchstartX) {
            console.log("negative direction");
            if ($(touchTarget).is("li")) {
                moveTrainNegative();
            }
        } else {
            console.log("positive direction");
            if ($(touchTarget).is("li")) {
                moveTrainPositive();
            }
        }
    });
}); // ready method end