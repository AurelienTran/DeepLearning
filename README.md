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
* Back propagation using Stochastic Gradient Descent (update neural network after each training sample).

## Future work
* Add support for batch gradient descent.
* ...

```javascript
// Initialize and configure neural network with
// * Input layer with 2 neuron
// * First Hidden layer with 3 neuron
// * Second Hidden layer with 4 neuron
// * Output layer with 1 neuron
// * learning rate of 0.1
let nn = new NeuralNetwork([2, 3, 4, 1]);
nn.setLearningRate(0.1);

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
