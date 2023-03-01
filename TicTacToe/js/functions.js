//variables to get the id 
let elCP1 = document.getElementById('cP1');
let elCP2 = document.getElementById('cP2');
let elPlayer1 = document.getElementById('player1');
let elPlayer2 = document.getElementById('player2');
let elPointE = document.getElementById('pointE');
let elBtnNew = document.getElementById('btn_new_game');

//general variables
let scores = {
	P1: 0,
	P2: 0,
	E: 0
};

var colorSelect;
var colorSelect2;

let curValuePlay = 'X';
let linesCells = ['', '', '', '', '', '', '', '', ''];

let filledCellsCount = 0;
let win = false;

//take all the elements of the board
const cells = document.querySelectorAll('.cell');

//function to change player colors
elCP1.addEventListener('input', function(){
	colorSelect = elCP1.value;
	elPlayer1.style.color = colorSelect;
	colorCell();
});
elCP2.addEventListener('input', function(){
	colorSelect2 = elCP2.value;
	elPlayer2.style.color = colorSelect2;
	colorCell();
});

//click event for new game button
elBtnNew.addEventListener('click', newGame);

//function to fill the board
cells.forEach(function(cell, index){
	cell.addEventListener('click', function (){
		if (linesCells[index] === '') {
			linesCells[index] = curValuePlay;
			cell.textContent = curValuePlay;			
			curValuePlay = curValuePlay === 'X' ? 'O' : 'X';
			if(curValuePlay === 'O'){
				cell.style.color = colorSelect;
			}else {
				cell.style.color = colorSelect2;
			};
			//call the function to check if it won
			checkWin();

			//call the function to check if it tied
			filledCellsCount++;
      		checkDraw();

      		//calls the function to inform whose turn it is
      		let player = curValuePlay === 'X' ? 'P1' : 'P2';
      		let playerOut = curValuePlay === 'O' ? 'P1' : 'P2';
      		playerTurn(player, playerOut)
		};
	});	
});

//change the color of values already entered on the board
function colorCell(){
	cells.forEach(function(cell, index){
		if (linesCells[index] !== ''){
			if(linesCells[index] === 'X'){
				cells[index].style.color = colorSelect;
			}else {
				cells[index].style.color = colorSelect2;
			};
		};
	});
};

//function to check if the player won
function checkWin() {
	//check the 8 chances of victory
	const winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (let i = 0; i < winCombos.length; i++) {
		const combo = winCombos[i];
		const a = combo[0];
		const b = combo[1];
		const c = combo[2];
		
		if ((linesCells[a] !== '' && linesCells[a] === linesCells[b] && linesCells[a] === linesCells[c])&&(linesCells[a] == 'X' || linesCells[a] == 'O')) {
			cells[a].style.backgroundColor = '#28b53f';
			cells[a].style.color = '#fff';
			cells[b].style.backgroundColor = '#28b53f';
			cells[b].style.color = '#fff';
			cells[c].style.backgroundColor = '#28b53f';
			cells[c].style.color = '#fff';

			//calls the function to add the winning player's points
			let player = curValuePlay === 'O' ? 'P1' : 'P2';
			updateScore(player);

			//blocks the other elements of the board, when a player wins
			cells.forEach(function(cell, index){
				if (linesCells[index] === '') {
					linesCells[index] = '-';
					cell.style.color = '#fff';
					cell.style.backgroundColor = '#fff';
				};
			});	
			win = true;
			return;
		} ;

	};
};

//function to check if there is a tie
function checkDraw() {
  if (filledCellsCount === 9 && !win) {
    scores.E++;
    elPointE.innerHTML = scores.E.toString().padStart(2, '0');

    filledCellsCount = 0; //resets filled cell count
  }
}

//function to add the points of the players
function updateScore(player) {
  scores[player]++;
  const elPoint = document.getElementById(`point${player}`);
  elPoint.innerHTML = scores[player].toString().padStart(2, '0');
};

//new game button function
function newGame(){
	linesCells = ['', '', '', '', '', '', '', '', ''];
	filledCellsCount = 0;
	cells.forEach(function(cell, index){
		cell.style.color = '#000';		
		cell.textContent = '';
		cell.style.backgroundColor = '#fff';
	});
	colorCell();
	win = false;
};

//function to indicate the label whose turn it is
function playerTurn(player, playerOut){
  	const elTurn = document.getElementById(`yourTurn${player}`);
  	const elOut = document.getElementById(`yourTurn${playerOut}`);

  	elTurn.style.opacity = '1';
  	elTurn.style.backgroundImage = "url('img/luz3.png')";
  	elTurn.style.backgroundRepeat = "repeat";
  	elTurn.style.backgroundSize = "100% 100%";

  	elOut.style.opacity = '0';
  	elOut.style.backgroundImage = 'none'

  	
  	

};