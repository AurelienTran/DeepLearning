var brain;
var learningRate;

function setup() {
    createCanvas(400, 400);

    brain = new perceptron(3);
    learningRate = 0.1;

    console.log("Initial prediction")
    console.log(brain.predict([0, 0, 1]));
    
    console.log("Train")
    brain.train([0, 0, 1], 1, learningRate);
}

function draw() {
}
