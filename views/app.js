function Game () {
	// creates a new instance of blocks for current game
	this.stacks = new Stacks();
	this.board = new Board();
	this.timer = new Timer();








}


	Game.prototype.init = function () {


		$(this.board.nextButton).click(function (event) {
			console.log("nextButton was clicked")
		})



		$(this.board.decreaseButton).click(function (event) {
			console.log("decreaseButton was clicked")
		})

	}



// ---------------------------------------------------




function Stacks () {
	this.currentStack = 0;
	this.totalStacks = 4;

}



	Stacks.prototype.nextStack = function () {


	}






// ---------------------------------------------------

function Board () {
	this.nextButton = $(".next");
	this.decreaseButton = $(".decrease");
}







// ---------------------------------------------------

function Timer () {


}











$(function(){
	var game = new Game();
	game.init();

});