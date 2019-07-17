export class KdTreeNode<T> {
    public value: T
    public vector: number[]

    constructor (value: T, vector: number[]) {
        this.value = value
        this.vector = vector
    }
}

export class KdTree<T> {
    public data: KdTreeNode<T>
    public left: KdTree<T>
    public right: KdTree<T>
    private dimensions: number

    constructor (k: number, elements: KdTreeNode<T>[], depth: number = 0) {
        if (elements.length === 0) {
            return
        }
        this.dimensions = k

        // Determine axis
        const axis: number = depth % k

        // Sort elements based on axis
        elements.sort((a: KdTreeNode<T>, b: KdTreeNode<T>) => {
            return a.vector[axis] - b.vector[axis]
        })

        // Select the median element
        const medianIndex: number = Math.ceil(elements.length / 2)
        this.data = elements[medianIndex]
        this.left = new KdTree<T>(k, elements.slice(0, medianIndex), depth + 1)
        this.right = new KdTree<T>(k, elements.slice(medianIndex + 1, elements.length), depth + 1)
    }

    /**
     * Return the KdTreeNode in the tree whose vector is nearest
     * to the given vector.
     * @param vector The given vector to find the nearest neighbor.
     * @return
     */
    public nearestNeighbor = (vector: number[]): KdTreeNode<T> => {
        let nearestDistance: number
        let axis: number

        let depth: number = 0
        let current: KdTree<T> = this
        let nearestNeighbor: KdTreeNode<T> = this.data
        for(;;) {
            // Base case (root node)
            if (!current.left && !current.right) {
                return nearestNeighbor
            }

            // Determine axis
            axis = depth % this.dimensions
            nearestDistance = this.distance(vector, nearestNeighbor.vector)
            
            // Recurse either left or right
            if (this.data.vector[axis] < this.left.data.vector[axis]) {
                // Traverse left
                current = this.left
            } else {
                // Traverse right
                current = this.right
            }

            // Check if this tree should become our nearest neighbor
            if (this.distance(current.data.vector, nearestNeighbor.vector) < nearestDistance) {
                nearestNeighbor = current.data
            }

            depth ++
        }
    }

    /**
     * Calculate the distance between two vectors.
     * @param a The first vector.
     * @param b The second vector.
     * @return The distance between the two vectors.
     */
    private distance = (a: number[], b: number[]): number => {
        // Vectors must have same distance
        if (a.length !== b.length) {
            return null
        }
        let sum: number = 0;
        for (let i: number = 0; i < a.length; i ++) {
            sum += Math.pow(a[i] - b[i], 2)
        }
        return Math.sqrt(sum);
    }
}
