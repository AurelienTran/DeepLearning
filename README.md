# DeepLearning

This is a project to build a simple neural network library from scratch using Javascript.
The purpose of this project is to learn how Deep Learning work step by step.
This project will also include simple demo.

The following page is running the current master branch demo:
* https://aurelientran.github.io/DeepLearning/

## Features
* Neural network library.
* The neuron activation function is sigmoid. Other activation are not supported.
* Configurable number of layer.
* Configurable number of neuron for each layer.
* Configurable learning rate.
* Back propagation using Stochastic or Batch gradient descent.

## Future work (Under consideration)
* Unsupervised learning.
* Convolution neural network.

## How to use this library
* Your project need to include the two following javascript file
  * libs/DeepLearning/Matrix.js
  * libs/DeepLearning/NeuralNetwork.js
* Sample Code
```javascript
// Initialize and configure neural network with
// * Input layer with 2 neuron
// * First Hidden layer with 3 neuron
// * Second Hidden layer with 4 neuron
// * Output layer with 1 neuron
let nn = new NeuralNetwork([2, 3, 4, 1]);

// Set training learning rate of 0.1
nn.setLearningRate(0.1);

// Set number of training sample used for updating neural network weight and bias
nn.setBatchSize(8);

// Train the neural network
// * [x1, ...]: neural network input array
// * [y1, ...]: neural network expected output array 
nn.train([x1, x2], [y1]);

// Guess ouput based on input array
// return [y1, ...] which is an array of number between 0 and 1
let ouput = nn.guess([x1, x2]);
```

## Authors
* Aurelien Tran (aurelien.tran@gmail.com)
