let brain;
let learningRate;
let dataSet;
let slider;

class data {
    constructor() {
        // Set data position
        this.x = random(0, width);
        this.y = random(0, height);

        // Define expected result
        this.expected = 1;
        if(this.x > this.y + width / 4) {
            this.expected = 0;
        }
        
    }

    getInputs() {
        // 3rd input is bias, it should be moved inside the neural network
        return [this.x / width, this.y / height, 1];
    }

    getExpectedValue() {
        return this.expected;
    }

    draw(isNew) {
        // Set color depending on data status
        let predicted = brain.predict(this.getInputs())
        let expectedColor = this.expected == 1 ? color(0, 0, 0) : color(255, 255, 255);
        let predictedColor = this.expected == predicted ? color(0, 0, 0) : color(255, 0, 0);

        if(isNew)
        {
            predictedColor = color(0, 0, 255);
            expectedColor = color(0, 0, 255);
        }

        // Draw separating line
        strokeWeight(2);
        stroke(predictedColor);
        fill(expectedColor);
        ellipse(this.x, this.y, 15, 15);
    }
}

function setup() {
    // Create p5 canvas to show A.I. evolution
    createCanvas(800, 600);
    frameRate(5);

    // Create slider to control simulation speed
    slider = createSlider(1, 25, 1);
    slider.position(10, 10);
    slider.style('width', '80px');

    // Initialize A.I. model
    brain = new perceptron(3);
    learningRate = 0.001;

    // Initialize dataset
    dataSet = [];
    for(let i = 0; i < 400; i++) {
        dataSet[i] = new data();
    }

}

function draw() {
    // Set background black
    background(255);

    // Print all data set
    for(let i = 0; i < dataSet.length; i++) {
        dataSet[i].draw();
    }
    for(let i = 0; i < dataSet.length; i++) {
        brain.train(dataSet[i].getInputs(), dataSet[i].getExpectedValue(), learningRate);
    }

    // Shift element in array
    d = dataSet.shift();
    dataSet.push(d);

    // Update framerate according to the slider position
    frameRate(slider.value());

    // Draw line for the expected
    stroke(1);
    let x1 = 0;
    let y1 = -width / 4;
    let x2 = width;
    let y2 = width * 3 / 4;
    line(x1, y1, x2, y2);
}
