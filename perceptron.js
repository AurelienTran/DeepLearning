class perceptron {
    constructor(size) {
        // Define and initialize class member
        this.size = size;
        this.weights = new Array(size);
        
        // Initialize weitghs with random value from -1 to 1
        for(var i = 0; i < this.weights.length; i++) {
            this.weights[i] = random(-1, 1);
        }
    }

    predict(inputs) {
        // Get the sum product of input * weight
        var output = 0;
        for(var i = 0; i < inputs.length; i++) {
            output += inputs[i] * this.weights[i];
        }

        // Do the activation
        if(output >= 0) {
            return 1;
        }
        return 0;
    }

    train(inputs, expected, learningRate) {
        // Tune weight in order to minimize the error
        var predicted = this.predict(inputs);
        for(var i = 0; i < inputs.length; i++) {
            this.weights[i] *= learningRate * (expected - predicted) * this.weights[i];
        }
    }
}
