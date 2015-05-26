function Game () {
	// creates a new instance of blocks for current game
	this.stacks = new Stacks();
	this.board = new Board();
	this.timer = new Timer();








}


	Game.prototype.init = function () {
		var that = this;

		$(this.board.nextButton).click(function (event) {
			that.stacks.shuffledStacks = that.board.nextStack(that.stacks.shuffledStacks);
		})



		$(this.board.decreaseButton).click(function (event) {
			that.stacks.shuffledStacks = that.board.decrease(that.stacks.shuffledStacks);
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
			console.log("YOU LOSE");
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




// ---------------------------------------------------

function Timer () {


}











$(function(){
	var game = new Game();
	game.init();

});