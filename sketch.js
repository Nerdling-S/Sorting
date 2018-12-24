let maxNum = 2304 //16384;
let step = 1;
let paused = false;

let slider;
let checkbox;
let button;
let resetButton;
let select;
let inputBox;

let mixed;
let sorter;

function setup() {
	createCanvas(625, 625);
	background(0);
	//frameRate(1);

	slider = createSlider(1, maxNum, 1, maxNum / 10);
	slider.position(0, 630);
	checkbox = createCheckbox("Instant", false);
	checkbox.position(150, 632);
	button = createButton("Pause");
	button.position(225, 632);
	button.mousePressed(() => {
		if (paused == false) {
			paused = true;
			button.html("Play");
		} else {
			paused = false;
			button.html("Pause");
		}
	});
	resetButton = createButton("Reset");
	resetButton.position(280, 632);
	resetButton.mousePressed(reset) ;
	select = createSelect();
	select.position(340, 635);
	select.option("Bubble Sort");
	select.option("Selection Sort");
	select.changed(reset);
	inputBox = createInput("Size of Array");
	inputBox.style("width", "80px");
	inputBox.position(5, 655);
	inputBox.changed(() => {maxNum = inputBox.value(); reset()});


	let options = [];
	for (let i = 0; i < maxNum; i++) {
		options[i] = i;
	}

	mixed = mixNumbers(options);
	display(mixed);

	sorter = new BubbleSort(mixed);
}

function draw() {
	if (!paused) {
		if (checkbox.checked()) {
			if (select.value() == "Bubble Sort") {
				sortedArr = new BubbleSort(mixed);
			} else if (select.value() == "Selection Sort") {
				sortedArr = new SelectionSort(mixed);
			}

			sortedArr.sort();
			display(sortedArr.getSorted());
		} else {
			step = slider.value();

			for (let i = 0; i < step; i++) {
				sorter.step();
			}
			if(sorter.done) {
				display(sorter.getCurrent(), maxNum)
			} else {
				display(sorter.getCurrent(), sorter.getIterator());
			}
		}
	}
}

const mixNumbers = function (options) {
	let mixed = [];
	const len = options.length
	for (let i = 0; i < len; i++) {
		mixed[i] = random(options);
		for (let j = 0; j < options.length; j++) {
			if (options[j] == mixed[i]) {
				options.splice(j, 1);
			}
		}
	}

	return mixed;
}
const display = function (arr, current) {
	noStroke();
	colorMode(HSB, maxNum)
	let side = width / sqrt(maxNum);
	let i = 0;
	for (let row = 0; row < height / side; row++) {
		for (let col = 0; col < width / side; col++) {
			if(i == current) {
				fill(maxNum);
			} else {
				fill(arr[i], maxNum, maxNum);
			}
			rect(col * side, row * side, side, side);
			i++;
		}
	}
}

const reset = function() {
	let options = [];
	for (let i = 0; i < maxNum; i++) {
		options[i] = i;
	}
	mixed = mixNumbers(options);
	display(mixed);
	if (select.value() == "Bubble Sort") {
		sorter = new BubbleSort(mixed);
	} else if (select.value() == "Selection Sort") {
		sorter = new SelectionSort(mixed);
	}
}
