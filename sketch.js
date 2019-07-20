var brain;
var learningRate;
var dataSet;
var step;

class data {
    constructor() {
        // Set data position
        this.x = random(-1, 1);
        this.y = random(-1, 1);

        // This should be done inside brain but we are doing it here since neural network class have not been created yet
        this.bias = 1;

        // Define expected result
        this.expected = 1;
        if(this.x > this.y + 0.2) {
            this.expected = 0;
        }
        
        // Draw line for the expected
        stroke(1);
        var x1 = map(-1, -1, 1, 0, width);
        var y1 = map(-1.2, -1, 1, 0, height);
        var x2 = map(1, -1, 1, 0, width);
        var y2 = map(0.8, -1, 1, 0, height);
        line(x1, y1, x2, y2);
    }

    getInputs() {
        return [this.x, this.y, this.bias];
    }

    getExpectedValue() {
        return this.expected;
    }

    draw(isNew) {
        // Get position in the canvas
        var x = map(this.x, -1, 1, 0, width);
        var y = map(this.y, -1, 1, 0, height);

        // Set color depending on data status
        var predicted = brain.predict(this.getInputs())
        var expectedColor = this.expected == 1 ? color(0, 0, 0) : color(255, 255, 255);
        var predictedColor = this.expected == predicted ? color(0, 0, 0) : color(255, 0, 0);

        if(isNew)
        {
            predictedColor = color(0, 0, 255);
            expectedColor = color(0, 0, 255);
        }

        // Draw separating line
        strokeWeight(2);
        stroke(predictedColor);
        fill(expectedColor);
        ellipse(x, y, 15, 15);
    }
}

function setup() {
    createCanvas(800, 600);
    frameRate(5);

    brain = new perceptron(3);
    step = 0
    learningRate = 0.01;
    dataSet = [];

    // Initialize dataset
    for(var i = 0; i < 100; i++) {
        dataSet[i] = new data();
    }

}

function draw() {
    // Set background black
    background(255);

    // Print all data set
    for(var i = 0; i < dataSet.length; i++) {
        dataSet[i].draw();
    }

    // Create new data and train the model with it
    var newdata = new data();
    newdata.draw(true);
    brain.train(newdata.getInputs(), newdata.getExpectedValue(), learningRate);

    // Add data to the set of data to display
    dataSet.push(newdata);
}
