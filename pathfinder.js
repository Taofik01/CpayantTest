class Matrix {
    constructor(matrixData) {
        this.matrixData = matrixData;
    }

}

class Path {
    constructor () {
        this.steps = [];

    }

    addStep(step) {
        this.steps.push(step);
    }
}

class MinPriorityQueue {
    constructor() {
        this.heap = [];

    }

    enqueue(node, Priority) {
        this.heap.push({ node, Priority });
        this.heap.sort((a ,b) => a.Priority - b.Priority);  // Simple sort for priority
    }

    dequeue () {
        return this.heap.shift();
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class PathFinder {
    constructor(matrix, maxPathLength) {
        this.matrix = matrix;
        this.maxPathLength = maxPathLength;
    }

    run (start, end, sequences) {


        let rows = this.matrix.matrixData.length;
        let cols = this.matrix.matrixData[0].length;

        // Initialize the priority queue and cost map

        let pq = new MinPriorityQueue();

        pq.enqueue(start, 0);  //Enqueue start with cost 0

        let costs = Array.from({ length : rows}, () => Array(cols).fill(Infinity));

        costs[start[0]][start[1]] = 0;

        let parent = Array.from({ length: rows }, () => Array(cols).fill(null));  // For path reconstruction

        // Main Dijstra's algorithm loop

        while (!pq.isEmpty()) {
            let current = pq.dequeue();
            let [r, c] = current.node;
            let currentCost = current.Priority;


            // If we have reached the end we'll reconstruct the path

            if (r === end[0] && c == end[1]) {
                let path = this.reconstructPath(parent, start, end );
                return path;
            }


            // Exploring neightboring nodes  (up, left, down, right )
            for (let [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                let nr = r + dr;
                let nc = c + dc;

                // Ensure we're within the bounds 

                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols ) {
                    let newCost = currentCost + this.matrix.matrixData[nr][nc];  // Add the cost of the neighbor

                    if (newCost < costs[nr][nc] ) {
                        costs[nr][nc] = newCost;
                        parent[nr][nc] = [r, c]; // Tracking parent for path reconstruction
                        pq.enqueue([nr, nc], newCost);
                    }
                }

            }
        }

        return []; // No path found


        }

        reconstructPath(parent, start, end) {
            let path = [];
            let current = end;

            while (current !== null) {
                path.unshift(current);
                current = parent[current[0]][current[1]];
            }

            return path;
        }
    }
       


module.exports = { PathFinder, Matrix };