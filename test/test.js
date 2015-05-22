var board = [3, 4, 5, 6, 1, 2, 3, 8, 7];

var knockBlock = function () {
	if(board[0] !== 0) {
		board[0] = board[0]-1
		console.log(board);
	} else {
		console.log("you lose")
	}
};

var nextSet = function() {
	if(board[0] === 0) {
		board.shift()
		console.log(board)
	} else {
		console.log('did nothing')
		console.log(board)
	}
};
