class NeuralNetwork {
    /**
     * Define node number in each neural network layer
     * @param {number[]} node Node number for each layer 
     */
    constructor(node) {
        this.node = node;
        this.learningRate = 0.1;
        this.layer = [];
        for (let l = 0; l < this.node.length - 1; l++) {
            // Get the input/output layer node number
            let layerInputNo = this.node[l];
            let layerOutputNo = this.node[l + 1];

            // Initialize weight and bias matrix
            let layerWeight = new Matrix(layerOutputNo, layerInputNo);
            let layerBias = new Matrix(layerOutputNo, 1);
            layerWeight.randomize();
            layerBias.randomize();

            // Create layer
            this.layer.push({ weight: layerWeight, bias: layerBias });
        }
    }

    /**
     * Set the learning rate value of the train function
     * @param {number} lr The learning rate value
     */
    setLearningRate(lr) {
        this.learningRate = lr;
    }

    /**
     * Print internal weight and bias of this neural network
     */
    print() {
        for (let l = 0; l < this.layer.length; l++) {
            this.layer[l].weight.print();
            this.layer[l].bias.print();
        }
    }

    /**
     * Feed forward the neural network
     * @param {number[]} input The input vector
     * @returns {number[]} Output vector
     */
    guess(input) {
        // Initialize
        let layerValue = [];
        layerValue[0] = Matrix.fromArray(input);

        // Apply weight, bias and activation for each layer
        for (let i = 0; i < this.layer.length; i++) {
            layerValue[i + 1] = Matrix.mult(this.layer[i].weight, layerValue[i]);
            layerValue[i + 1].add(this.layer[i].bias);
            layerValue[i + 1].map(NeuralNetwork.sigmoid);
        }

        return Matrix.toArray(layerValue[layerValue.length - 1]);
    }

    /**
     * Train the neural network using back propagation
     * @param {number[]} input The input vector
     * @param {number[]} target The expected output vector
     */
    train(input, target) {
        // Initialize
        let layerValue = [];
        layerValue[0] = Matrix.fromArray(input);

        // Apply weight, bias and activation for each layer
        for (let i = 0; i < this.layer.length; i++) {
            layerValue[i + 1] = Matrix.mult(this.layer[i].weight, layerValue[i]);
            layerValue[i + 1].add(this.layer[i].bias);
            layerValue[i + 1].map(NeuralNetwork.sigmoid);
        }

        // Initialize the gradient of the loss function for the last layer
        // Loss function = 1/2 * (target - output)^2
        let gradient = Matrix.sub(layerValue[layerValue.length - 1], Matrix.fromArray(target));

        // Do the backPropagation layer by layer
        for (let i = this.layer.length - 1; i >= 0; i--) {
            // Compute bias delta for this layer
            let deltaBias = layerValue[i + 1];
            deltaBias.map(NeuralNetwork.dsigmoidFromOutput);
            deltaBias.multByElement(gradient);

            // Compute weightDelta for this layer
            let deltaWeight = Matrix.mult(deltaBias, Matrix.transpose(layerValue[i]));

            // Update gradient for next back propagation layer
            gradient = Matrix.mult(Matrix.transpose(this.layer[i].weight), gradient);

            // Update weight and bias using delta and learning rate
            deltaBias.scalar(this.learningRate);
            deltaWeight.scalar(this.learningRate);
            this.layer[i].bias.sub(deltaBias);
            this.layer[i].weight.sub(deltaWeight);
        }
    }

    /**
     * The activation function for this neural network
     * @param {number} x input value
     * @returns {number} Simoid of the input value
     */
    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    /**
     * Compute the derivation of sigmoid based on sigmoid output value
     * @param {number} y The value of sigmoid(x)
     * @returns {number} The value of the derivation(sigmoid(x))
     */
    static dsigmoidFromOutput(y) {
        return y * (1 - y);
    }
}

