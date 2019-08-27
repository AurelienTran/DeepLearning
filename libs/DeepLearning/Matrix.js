class Matrix {
    /**
     * @constructs Matrix.
     * @param {number} row Row number of the matrix
     * @param {number} col Column number of the matrix
     */
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.data = [];
        for(let r = 0; r < this.row; r++) {
            this.data[r] = [];
            for(let c = 0; c < this.col; c++) {
                this.data[r][c] = 0;
            }
        }
    }

    /**
     * Randomize data between -1 and 1.
     */
    randomize() {
        for(let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.col; c++) {
                this.data[r][c] = (Math.random() * 2) - 1;
            }
        }
    }

    /**
     * Replace all matrix element by using a callback function.
     * @param {func} func Function to modify all Matrix element
     */
    map(func) {
        for(let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.col; c++) {
                this.data[r][c] = func(this.data[r][c]);
            }
        }
    }

    /**
     * Add one matrix to this one
     * @param {Matrix} m The matrix to add
     */
    add(m) {
        console.assert(this.row = m.row);
        console.assert(this.col = m.col);
        for(let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.col; c++) {
                this.data[r][c] += m.data[r][c];
            }
        }
    }

    /**
     * Substract one matrix to this one
     * @param {Matrix} m The matrix to substract
     */
    sub(m) {
        console.assert(this.row = m.row);
        console.assert(this.col = m.col);
        for(let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.col; c++) {
                this.data[r][c] -= m.data[r][c];
            }
        }
    }

    /**
     * Print matrix in the console.
     */
    print() {
        console.table(this.data);
    }

    /**
     * Convert array to Matrix
     * @param {number[]} input Array to convert
     */
    static fromArray(input) {
        let res = new Matrix(input.length, 1);
        for(let i = 0; i < res.row; i++) {
            res.data[i][0] = input[i];
        }
        return res;
    }

    /**
     * Convert Matrix to array
     * @param {Matrix} m The matrix to convert to array
     */
    static toArray(m) {
        let res = [];
        for(let r = 0; r < m.row; r++) {
            for(let c = 0; c < m.col; c++) {
                res.push(m.data[r][c]);
            }
        }
        return res;
    }

    /**
     * Add two matrix
     * @param {Matrix} m1 First matrix to add
     * @param {Matrix} m2 Second matrix to add
     * @returns {Matrix} Sum of m1 and m2
     */
    static add(m1, m2) {
        console.assert(m1.col == m2.col, "Cannot add matrix with different size.");
        console.assert(m1.row == m2.row, "Cannot add matrix with different size.");
        let res = new Matrix(m1.row, m1.col);

        for(let r = 0; r < m1.row; r++) {
            for(let c = 0; c < m1.col; c++) {
                res.data[r][c] = m1.data[r][c] + m2.data[r][c];
            }
        }

        return res;
    }

    /**
     * Substract two matrix
     * @param {Matrix} m1 The first matrix
     * @param {Matrix} m2 Second matrix to substract
     * @returns {Matrix} m1 - m2
     */
    static sub(m1, m2) {
        console.assert(m1.col == m2.col, "Cannot add matrix with different size.");
        console.assert(m1.row == m2.row, "Cannot add matrix with different size.");
        let res = new Matrix(m1.row, m1.col);

        for(let r = 0; r < m1.row; r++) {
            for(let c = 0; c < m1.col; c++) {
                res.data[r][c] = m1.data[r][c] - m2.data[r][c];
            }
        }

        return res;
    }

    /**
     * Multiply two matrix.
     * @param {Matrix} m1 First matrix to multiply
     * @param {Matrix} m2 Second matrix to multiply
     * @returns {Matrix} Product of m1 * m2
     */
    static mult(m1, m2) {
        console.assert(m1.col == m2.row, "Cannot multiply matrix with incompatible size.");
        let res = new Matrix(m1.row, m2.col);

        for(let r = 0; r < res.row; r++) {
            for(let c = 0; c < res.col; c++) {
                let sum = 0;
                for(let i = 0; i < m1.col; i++) {
                    sum += m1.data[r][i] * m2.data[i][c];
                }
                res.data[r][c] = sum;
            }
        }

        return res;
    }

    /**
     * Transpose a matrix
     * @param {Matrix} m The matrix to transpose
     * @returns {Matrix} The transposed matrix
     */
    static transpose(m) {
        let res = new Matrix(m.col, m.row);

        for(let r = 0; r < res.row; r++) {
            for(let c = 0; c < res.col; c++) {
                res.data[r][c] = m.data[c][r];
            }
        }
        return res;
    }
}

/**
 * Callback to replace Matrix element value
 * @callback func
 * @param {number} elem The Matrix element
 * @returns {number} The value to replace
 */
