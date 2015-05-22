$(function () {
	$('.decrease').click( function (e) {
		decrease(); 
	});

    $(document).on("keydown", function(e) {
        if (e.keyCode == 75) {
        	decrease();
        }
    });

	$('.next').click( function (e) {
		nextStack();
	});

    $(document).on("keydown", function(e) {
        if (e.keyCode == 68) {
        	nextStack();
        }
    });

});

var decrease = function (event) {
	var $currentValue = $(".current").html()
	console.log("here")
	var val = parseInt($currentValue)
	if(val !== 0) {
		val = val - 1;
		$(".current").html(val)
	} else {
		console.log("only losers lose.. you are one of them")
	};
};

var nextStack = function () {
	var $currentValue = $(".current").html()
	var val = parseInt($currentValue)
	if(val === 0) {
		console.log("in if")
		$(".current").remove();
		$(".minor").first().addClass("current");
		$(".current").removeClass("minor");
	};
};