function Game () {
	// creates a new instance of blocks for current game
	this.stacks = new Stacks();
	this.board = new Board();
	this.currentTime = 0;


}


	Game.prototype.init = function () {




		var that = this;


		$('.start').click(function (event) {


			//game start countdown from 3
			var n = 3;
			var countdown = setInterval(function(){
				console.log(n)
				n--;
				if(n===0){
					clearInterval(countdown)
				}
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
						clearInterval(time);
						console.log('TIMEOUT, took too long')
					}


				}, 100)

				// ------------------------------------

				//nextButton event
				$(that.board.nextButton).click(function (event) {

					that.stacks.shuffledStacks = that.board.nextStack(that.stacks.shuffledStacks);

					if (that.stacks.shuffledStacks.length === 0) {
						console.log("FINISHED")
						clearInterval(time);
						$(that.board.nextButton).off('click')
						$(that.board.decreaseButton).off('click')
					}
				})

				// ------------------------------------

				//decreaseButton event
				$(that.board.decreaseButton).click(function (event) {
					that.stacks.shuffledStacks = that.board.decrease(that.stacks.shuffledStacks);
					if (that.stacks.shuffledStacks === "lose") {
						console.log("YOU LOSE");
						clearInterval(time);
						$(that.board.nextButton).off('click')
						$(that.board.decreaseButton).off('click')

					}
				})




				//reset button event
				$('.reset').click(function (event) {
					//starts a new game and initializes it
					that.board.reset();
					that.stacks.reset();

					//stops the timer and resets it
					clearInterval(time);
					$('#timer').html('0.00')
					that.currentTime = 0;
				})

				// ------------------------------------
				
			}, 3000)

		})




	}


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



	this.shuffledStacks = shuffleArr(this.unshuffledStacks);
}



	// reset the stacks
	Stacks.prototype.reset = function () {
		console.log('stacks reset')
		this.shuffledStacks = shuffleArr(this.unshuffledStacks);
	}





//fisher-yates shuffle
var shuffleArr = function (arr) {
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
}








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