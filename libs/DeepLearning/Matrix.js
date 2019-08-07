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
     * Randomize data between 0 and 1.
     */
    randomize() {
        for(let r = 0; r < this.row; r++) {
            for(let c = 0; c < this.col; c++) {
                this.data[r][c] = Math.floor(Math.random() * 10);
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
}

/**
 * Callback to replace Matrix element value
 * @callback func
 * @param {number} elem The Matrix element
 * @returns {number} The value to replace
 */

