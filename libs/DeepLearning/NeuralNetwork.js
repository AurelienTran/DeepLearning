class NeuralNetwork {
    /**
     * Define node number in each neural network layer
     * @param {number[]} node Node number for each layer 
     */
    constructor(node) {
        this.node = node;
        this.learningRate = 0.1;
        this.layer = [];
        this.batchSampleNumber = 0;
        for (let l = 0; l < this.node.length - 1; l++) {
            // Get the input/output layer node number
            let layerInputNo = this.node[l];
            let layerOutputNo = this.node[l + 1];

            // Initialize weight and bias matrix
            let w = new Matrix(layerOutputNo, layerInputNo);
            let b = new Matrix(layerOutputNo, 1);
            w.randomize();
            b.randomize();

            // Initialize delta weight and bias for updating neural network by batch
            let dw = new Matrix(layerOutputNo, layerInputNo);
            let db = new Matrix(layerOutputNo, 1);

            // Create layer
            this.layer.push({ weight: w, bias: b, deltaWeight: dw, deltaBias: db });
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
     * @param {number[]} batchsize Sample number needed for updating weight and bias
     */
    train(input, target, batchsize = 1) {
        // Initialize
        let layerValue = [];
        layerValue[0] = Matrix.fromArray(input);
        this.batchSampleNumber++;

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

            // Add delta weight to the current batch
            this.layer[i].deltaBias.add(deltaBias);
            this.layer[i].deltaWeight.add(deltaWeight);

            // Update gradient for next back propagation layer
            gradient = Matrix.mult(Matrix.transpose(this.layer[i].weight), gradient);
        }

        if (this.batchSampleNumber >= batchsize) {
            for (let i = 0; i < this.layer.length; i++) {
                // Compute delta using learning rate and averaging with batch sample number
                this.layer[i].deltaBias.scalar(this.learningRate / this.batchSampleNumber);
                this.layer[i].deltaWeight.scalar(this.learningRate / this.batchSampleNumber);

                // Update weight and bias using delta
                this.layer[i].bias.sub(this.layer[i].deltaBias);
                this.layer[i].weight.sub(this.layer[i].deltaWeight);

                // Reinitialize delta after updating weight and bias
                this.layer[i].deltaBias.zero();
                this.layer[i].deltaWeight.zero();
            }

            // Reset batch sample number
            this.batchSampleNumber = 0;
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

