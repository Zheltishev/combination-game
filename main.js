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

