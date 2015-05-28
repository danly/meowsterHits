function Game () {
	// creates a new instance of blocks for current game
	this.stacks = new Stacks();
	this.board = new Board();
	this.currentTime = 0;


}


	Game.prototype.init = function () {




		var that = this;


		$('.start').click(function (event) {
			$(".overlay.start").hide()
			//build the first stack
			that.stacks.buildCurrent(that.stacks.shuffledStacks)
			//build the second stack
			that.stacks.buildMinor(that.stacks.shuffledStacks)
			


			//game start countdown from 3
			$(".badge.countdown .countdown").html("3");
			$(".badge.countdown").fadeIn(500);
			var n = 2;
			var countdown = setInterval(function(){

				if(n===2){
					$(".badge.countdown .countdown").html("2");
				} else if(n===1){
					$(".badge.countdown .countdown").html("1");
				} else if(n===0){
					$(".badge.countdown").hide(250) 
					clearInterval(countdown)
				}
				console.log(n)
				n--;
			}, 1000)



			//game starts after 3 seconds 'start' is pressed
			var gamestart = setInterval(function () {
				clearInterval(gamestart);
				console.log("game active")
				//timer
				var startTime = new Date().getTime();

				var time = setInterval(function () {
					that.currentTime = that.board.timer(startTime);
					$('#timer').html(that.currentTime/1000);


					if(Math.floor( $('#timer').html() ) === 100) {
						$(".overlay.timeout").fadeIn()
						clearInterval(time);
						$(that.board.nextButton).off('click')
						$(that.board.decreaseButton).off('click')
						$(document).off('keyup');						
						console.log('TIMEOUT, took too long')
					}


				}, 100)

				// ------------------------------------

				//nextButton event
				$(that.board.nextButton).click(function (event) {


					if(that.stacks.shuffledStacks[0] === 0) {
						//shifts the first one out
						that.stacks.shuffledStacks = that.board.nextStack(that.stacks.shuffledStacks);
						//builds the current stack after the shift
						that.stacks.buildCurrent(that.stacks.shuffledStacks);

						that.stacks.buildMinor(that.stacks.shuffledStacks);
						$('#stackCount').html(that.stacks.shuffledStacks.length)

					} else if (that.stacks.shuffledStacks.length === 0) {
						console.log("FINISHED")
						$(".overlay.finish").fadeIn()
						$(".overlay.finish").append("<h4 class='finishTime'>"+$("#timer").html()+"</h4>")


						clearInterval(time);
						$(that.board.nextButton).off('click')
						$(that.board.decreaseButton).off('click')
						$(document).off('keyup');
					}
				});





				//keyup nextstack
				$(document).on("keyup", function (event) {
					//key d
        			if (event.keyCode == 68) {
						if(that.stacks.shuffledStacks[0] === 0) {
							that.stacks.shuffledStacks = that.board.nextStack(that.stacks.shuffledStacks);
							that.stacks.buildCurrent(that.stacks.shuffledStacks);
							that.stacks.buildMinor(that.stacks.shuffledStacks);
							$('#stackCount').html(that.stacks.shuffledStacks.length)

						} else if (that.stacks.shuffledStacks.length === 0) {
							console.log("FINISHED")
							$(".overlay.finish").fadeIn()
							$(".overlay.finish").append("<h4 class='finishTime'>"+$("#timer").html()+"</h4>")

							clearInterval(time);
							$(that.board.nextButton).off('click')
							$(that.board.decreaseButton).off('click')
							$(document).off('keyup');
						}
					}
				});





				// ------------------------------------



				//decreaseButton event
				$(that.board.decreaseButton).click(function (event) {
					that.stacks.shuffledStacks = that.board.decrease(that.stacks.shuffledStacks);
					if (that.stacks.shuffledStacks === "lose") {
						console.log("YOU LOSE");
						$(".overlay.lose").fadeIn()
						clearInterval(time);
						$(that.board.nextButton).off('click')
						$(that.board.decreaseButton).off('click')
						$(document).off('keyup');
					}
				})


				//keyup decreaseButton
				$(document).on("keyup", function (event) {
					//key k
					if (event.keyCode == 75) {
						that.stacks.shuffledStacks = that.board.decrease(that.stacks.shuffledStacks);
						if (that.stacks.shuffledStacks === "lose") {
							console.log("YOU LOSE");
							$(".overlay.lose").fadeIn()
							clearInterval(time);
							$(that.board.nextButton).off('click')
							$(that.board.decreaseButton).off('click')
							$(document).off('keyup');
						}
					}
				});

				// ------------------------------------











				//reset button event
				$('.reset').click(function (event) {
					that.reset(that, time)
				})

				// ------------------------------------
				
			}, 3000)

		})


	};

	Game.prototype.reset = function (that, time) {
		//starts a new game and initializes it
		console.log('inside reset')
		that.board.reset();
		that.stacks.reset();


		//puts back start button and hides other overlays
		$(".overlay.start").fadeIn()		
		$(".overlay.finish").hide();
		$(".overlay.lose").hide();


		//resets stacks
		$('#stackCount').html('30')
		//clears anything that is still within the current and minor stacks
		$(".stack.current .block").remove()
		$(".stack.minor .block").remove()


		//stops the timer and resets it
		clearInterval(time);
		$('#timer').html('0.00')
		that.currentTime = 0;
		return that.currentTime;
	};


// ---------------------------------------------------




function Stacks () {
	this.currentStack = 0;
	this.totalStacks = 30;
	this.unshuffledStacks = [0, 0, 0, //3 zeros
					   1, 1, 1, 1, 1, 1, 1, //7 ones
					   2, 2, 2, 2, 2, 2, //6 twos
					   3, 3, 3, 3, 3, //5 threes
					   4, 4, 4, //3 fours
					   5, 5, 5, //3 fives
					   6, 6, 6]; //3 sixes
	this.shuffledStacks = this.shuffleArr(this.unshuffledStacks);
}



	// reset the stacks
	Stacks.prototype.reset = function () {
		console.log('stacks reset')
		this.unshuffledStacks = [0, 0, 0, //3 zeros
					   1, 1, 1, 1, 1, 1, 1, //7 ones
					   2, 2, 2, 2, 2, 2, //6 twos
					   3, 3, 3, 3, 3, //5 threes
					   4, 4, 4, //3 fours
					   5, 5, 5, //3 fives
					   6, 6, 6]; //3 sixes
		this.shuffledStacks = this.shuffleArr(this.unshuffledStacks);
	};

	Stacks.prototype.buildCurrent = function (stacksArr) {
		if(stacksArr.length === 30){
			counter = stacksArr[0]
			for (var i = 0; i<counter; i++){
				$("<div class='block'></div>").hide().appendTo(".stack.current").fadeIn()
			};
		} else {
			counter = stacksArr[0]
			for (var i = 0; i<counter; i++){
				$(".stack.current").append("<div class='block'></div>");
			};
		};

	};
	Stacks.prototype.buildMinor = function (stacksArr) {
		if(stacksArr.length === 30) {
			counter = stacksArr[1];
			for (var i = 0; i<counter; i++){
				$("<div class='block'></div>").hide().appendTo(".stack.minor").fadeIn()
			};
		} else {
			$(".stack.minor .block").remove()
			counter = stacksArr[1]
			for (var i = 0; i<counter; i++){
				$(".stack.minor").append("<div class='block'></div>");
			};
		};
	};



	//fisher-yates shuffle
	Stacks.prototype.shuffleArr = function (arr) {
			var counter = arr.length;
			var temp;
			var index;

			while (counter) {
				index = Math.floor(Math.random() * counter);
				counter--;
				temp = arr[counter];
				arr[counter] = arr[index];
				arr[index] = temp;
			}
			return arr;
	};








// ---------------------------------------------------

function Board () {
	this.nextButton = $(".next");
	this.decreaseButton = $(".decrease");

}


	Board.prototype.decrease = function (stackInstance) {
		
		console.log("decreaseButton was clicked")
		if(stackInstance[0] !== 0) {
			stackInstance[0] = stackInstance[0]-1;
			console.log(stackInstance);
			$(".stack.current .block").last().remove()

			return stackInstance;


		} else {
			stackInstance = "lose";
			return stackInstance;
		}

	};

	Board.prototype.nextStack = function (stackInstance) {
		
		console.log("nextButton was clicked")
		if(stackInstance[0] === 0) {
			stackInstance.shift();
			console.log(stackInstance);
			return stackInstance;


		} else {
			console.log("DID NOTHING");
			
			console.log(stackInstance);
			return stackInstance;
		}
	};

	Board.prototype.timer = function (startTime) {
		console.log("here")
		var currentTime = new Date().getTime();
		return currentTime - startTime;
	}


	Board.prototype.reset = function () {
		$('#timer').html('0.00')
	}


// ---------------------------------------------------









$(function(){
	var game = new Game();
	game.init();


});