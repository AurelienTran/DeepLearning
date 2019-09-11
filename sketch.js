let nn; // Neural Network
let dataSet; // Data set of this example
let trainingData; // Total number of training data
var batchSize; // number of sample for each batch

function setup() {
    // Create p5 canvas to show A.I. evolution
    createCanvas(600, 600);
    frameRate(60);

    // Initialize neural network and dataset
    trainingData = 0;
    nn = new NeuralNetwork([2, 9, 9, 9, 1]);
    nn.setLearningRate(0.1);
    dataSet = [];
    batchSize = 4;
    for (let i = 0; i < 4; i++) {
        let input1 = [Math.random(), Math.random()];
        let input2 = [Math.random(), Math.random()];
        dataSet.push({input: input1, target: [0]})
        dataSet.push({input: input2, target: [1]})
    }
}

function mouseClicked() {
    // @todo Add point using mouseX and mouseY
    //frameRate(1);
    //background(0);
}

function draw() {
    // Set background black with square representing guess probability
    let resolution = 10;
    strokeWeight(1);
    stroke(0);
    for (let x = 0; x < width; x += resolution) {
        for (let y = 0; y < height; y += resolution) {
            // Get probability of the square
            let input = [x / width, y / width];
            let prob = nn.guess(input);
            let probColor = color(Math.floor(prob * 256));
            fill(probColor);
            rect(x, y, resolution, resolution);
        }
    }

    // Show all data
    strokeWeight(3);
    for (let d = 0; d < dataSet.length; d++) {
        let expected = dataSet[d].target[0];
        let output = nn.guess(dataSet[d].input) < 0.5 ? 0 : 1;
        let expectedColor = color(Math.floor(expected * 255));
        let correctColor = expected == output ? color(0, 255, 0) : color(255, 0, 0);
        let x = Math.floor(dataSet[d].input[0] * width);
        let y = Math.floor(dataSet[d].input[1] * height);
        stroke(correctColor);
        fill(expectedColor);
        ellipse(x, y, 20, 20);
    }

    // Train data
    for (let i = 0; i < 1000; i++) {
        let r = Math.floor(Math.random() * dataSet.length);
        nn.train(dataSet[r].input, dataSet[r].target, batchSize);
    }
}
