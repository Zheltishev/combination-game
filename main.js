const block = document.querySelector('#block');
let square = document.querySelectorAll('.square')
let array = ['eldar', 'haos', 'imperium', 'inquisition', 'mechanicus', 'necrons', 'orc', 'tyranids', 
'eldar', 'haos', 'imperium', 'inquisition', 'mechanicus', 'necrons', 'orc', 'tyranids']
let checkArray = []

//перемешивание алгоритмом Фишера-Йетса (https://habr.com/ru/post/358094/)
function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

function createField(){
	shuffle(array)
	array.forEach(function(elem) {
		block.insertAdjacentHTML('beforeend', `
		<div class="fixation">
			<div class="square nomatch"><img data-name="${elem}" src="image/${elem}.png"></div>
		</div>
	`)
	})

	let square = document.querySelectorAll('.square')
	let checkNumberOpen = 0

	for (let i = 0; i < square.length; i++){
		square[i].addEventListener('click', function(event){
			event.target.classList.add('open')
			
			checkNumberOpen++
			if (checkNumberOpen > 2){
				event.target.classList.remove('open')
			}
			

			if (event.target.classList.contains('nomatch') && checkArray.length < 2){
				checkArray.push(event.target.firstChild.dataset.name)
			}
			if (checkArray.length == 2){
				setTimeout(test, 500)
				
			}


			function test(){
				if (checkArray[0] != checkArray[1]){
					for (let j = 0; j < square.length; j++){
						if (square[j].classList.contains('nomatch', 'open')){
							square[j].classList.remove('open')
							checkNumberOpen = 0
						}
					}
			
					checkArray = []
				} else if (checkArray[0] == checkArray[1]) {
					for (let j = 0; j < square.length; j++){
						if (square[j].firstChild.dataset.name == checkArray[0] && square[j].classList.contains('nomatch')){
							square[j].classList.remove('nomatch')
							square[j].classList.add('match')
							checkNumberOpen = 0
						}
					}
					checkArray = []
					checkFinal()
				}
			} //test end

			function checkFinal(){
				let num = 0;
				for (let k = 0; k < square.length; k++){
					if (square[k].classList.contains('match'))
					num++
					if (num == 16){
						alert('you win')

						block.innerHTML = ''
						createField()
					}
				}
			}

		})
	}
}

createField()



























// /*
//  * Create a list that holds all of your cards
//  */
// const card_deck_short = [
//     "fa fa-diamond",
//     "fa fa-paper-plane-o",
//     "fa fa-anchor",
//     "fa fa-bolt",
//     "fa fa-cube",
//     "fa fa-leaf",
//     "fa fa-bicycle",
//     "fa fa-bomb"
// ];
// const card_deck = card_deck_short.concat(card_deck_short);
// const deck = document.querySelectorAll(".card");
// const card = document.querySelector(".card");
// const restart = document.querySelector(".restart");
// const moveCount = document.querySelector(".moves");
// const stars = document.querySelectorAll(".fa-star");
// const timer = document.querySelector(".timer");
// const win_modal = document.querySelector(".win_modal");
// let open_cards = [];
// let fliped = 0;
// let moves = 0;
// let star = 3;
// let second = 0;
// let min = 0;
// let timer_start = false;
// let timeCounter;
// /*
//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  */

// // Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }

//     return array;
// }

// function createBoard() {
//     fliped = 0;
//     moves = 0;
//     open_cards = [];
//     shuffle(card_deck);
    
//     for (let i = 0; i < deck.length; i++) {
//         deck[i].innerHTML = `<i class="fa ${card_deck[i]}"></i>`;
//     }

//     deck.forEach(function(card) {
//         card.addEventListener("click", function () { 
//             flipCard(card);
//             countMoves();
//         });
//     });

// }

// createBoard();
// card.addEventListener("click", function () { 
//     if (timer_start === false) {
//         countTime(); 
//         timer_start = true;
//       }
// });
// restart.addEventListener("click", function () {
//     restartBoard();
// });

// function restartBoard() {
//     fliped = 0;
//     moves = 0;
//     star = 3;
//     open_cards = [];
//     second = 0;
//     min = 0;
//     debugger
//     timer_start = false;
//     clearInterval(timeCounter);
//     timer.innerText = "";
  
//     moveCount.innerHTML = moves;
//     shuffle(card_deck);
//     for (let i = 0; i < deck.length; i++) {
//         deck[i].innerHTML = `<i class="fa ${card_deck[i]}"></i>`;
//         }
//     //removes the classes
//     deck.forEach(function(card) {
//         card.classList.remove("match");
//         card.classList.remove("open");
//         card.classList.remove("show");
//         card.classList.remove("nomatch");
//     });

//     //resets the stars
//     stars.forEach(function(s) {
//         s.style.display = "inline-block";
//     })

// }

// function flipCard(card) {
//     if (open_cards.length < 2) {
//         if ((open_cards.length === 0) && (!card.classList.contains("show"))) {
//             card.classList.add("open");
//             card.classList.add("show");
//             open_cards.push(card);
//             moves++;   
//         } else if ((open_cards.length === 1) && (!card.classList.contains("show"))) {
//             card.classList.add("open");
//             card.classList.add("show");
//             open_cards.push(card);
//             moves++;
//             if (open_cards[0].firstChild.className === open_cards[1].firstChild.className) {
//                 open_cards[0].classList.add("match");
//                 open_cards[1].classList.add("match");
//                 fliped += 2;
//                 open_cards = [];
//                 if (fliped === card_deck.length) {   
//                     clearInterval(timeCounter);
//                     modal();
//                 }
//             } else {  
//                 open_cards[0].classList.add("nomatch");
//                 open_cards[1].classList.add("nomatch");
//                 setTimeout(unflip, 800);
//             }
//         }
       
//     }
// }

// function unflip() {
//     open_cards[0].classList.remove("open");
//     open_cards[1].classList.remove("open");
//     open_cards[0].classList.remove("show");
//     open_cards[1].classList.remove("show");
//     open_cards[0].classList.remove("nomatch");
//     open_cards[1].classList.remove("nomatch");
//     open_cards = [];
// }

// //star rating
// function countMoves() {
//     moveCount.innerHTML = moves;

//     if ((moves >= 30) && (moves < 40)) {
//         star = 2;
//         stars[2].style.display = "none";

//     } else if (moves >= 40) {
//         star = 1;
//         stars[1].style.display = "none";
//     } 
// }

// //time counter
// function countTime() {
//     timeCounter = setInterval(function() {
//         let zero;
//         second++;
//         if (second == 59) {
//             second = 00;
//             min++;
//         }
//         if (second > 9) {
//             zero = '';
//         } else if (second <= 9) {
//             zero = 0;
//         }
//         timer.innerText = `Timer: ${min}:${zero}${second}`;
//     }, 1000);
// }

// function modal() {
//     let modal = document.getElementById('modal');
//     let span = document.getElementsByClassName("close")[0];

//     modal.style.display = "block";

//     win_modal.innerHTML = `
//     <h2 class="congrats"> Congratulations! You won! </h2>
//     <p>It took you ${moves} moves. </p>
//     <span>Your star rate is ${star} ${document.querySelector(".stars").outerHTML} </span>
//     <p>It took you ${min} minutes ${second} seconds </p>
//     <button class="restart_btn">Restart</button>
//     `;
//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//         modal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }

//     document.querySelector(".restart_btn").addEventListener("click", function () { 
//         restartBoard();
//         modal.style.display = "none";
//     });
// }





































