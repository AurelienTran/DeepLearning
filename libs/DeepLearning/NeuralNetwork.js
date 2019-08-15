class NeuralNetwork {
    /**
     * Define node number in each neural network layer
     * @param {number[]} node Node number for each layer 
     */
    constructor(node) {
        this.node = node;
        this.weight = [];
        this.bias = [];
        for(let l = 0; l < this.node.length - 1; l++) {
            // Get the input/output layer node number
            let l_input = this.node[l];
            let l_output = this.node[l+1];

            // Initialize weight matrix
            this.weight[l] = new Matrix(l_output, l_input);
            this.weight[l].randomize();

            // Initialize bias matrix
            this.bias[l] = new Matrix(l_output, 1);
            this.bias[l].randomize();
        }
    }

    feedForward(input) {
        // Initialize
        let result = [];
        result[0] = Matrix.fromArray(input);

        // Apply weight, bias and activation for each layer
        for(let l = 0; l < this.node.length - 1; l++) {
            result[l+1] = Matrix.mult(this.weight[l], result[l]);
            result[l+1].add(this.bias[l]);
            result[l+1].map(NeuralNetwork.activation_tanh)
        }
        
        return result[this.node.length - 1];
    }

    print() {
        for(let l = 0; l < this.node.length - 1; l++) {
            this.weight[l].print();
            this.bias[l].print();
        }
    }

    static activation_tanh(x) {
        return Math.tanh(x);
    }
}

// Test program
let nn = new NeuralNetwork([2, 3, 1]);
let m = Matrix.fromArray([-1, 0, 1]);
nn.feedForward([0.5, -0.5]).print();




