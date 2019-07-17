export class KdTreeNode<T> {
    public value: T
    public vector: number[]

    constructor (value: T, vector: number[]) {
        this.value = value
        this.vector = vector
    }
}

export class KdTree<T> {
    protected data: KdTreeNode<T>
    protected left: KdTree<T>
    protected right: KdTree<T>
    private dimensions: number

    constructor (k: number, elements: KdTreeNode<T>[], depth: number = 0) {
        const n: number = elements.length
        if (n === 0) {
            return
        }
        this.dimensions = k

        // Select the median element
        const medianIndex: number = Math.ceil(elements.length / 2)
        this.data = elements[medianIndex] || elements[0]

        if (n === 1) {
            return
        }

        // Determine axis
        const axis: number = depth % k

        // Sort elements based on axis
        elements.sort((a: KdTreeNode<T>, b: KdTreeNode<T>) => {
            return a.vector[axis] - b.vector[axis]
        })
        const lower: KdTreeNode<T>[] = elements.slice(0, medianIndex)
        const upper: KdTreeNode<T>[] = elements.slice(medianIndex + 1, elements.length)
        if (lower.length) {
            this.left = new KdTree<T>(k, lower, depth + 1)
        }
        if (upper.length) {
            this.right = new KdTree<T>(k, upper, depth + 1)
        }
    }

    /**
     * Return the KdTreeNode in the tree whose vector is nearest
     * to the given vector.
     * @param vector The given vector to find the nearest neighbor.
     * @return
     */
    public nearestNeighbor = (vector: number[]): KdTreeNode<T> => {
        let axis: number
        let current: KdTree<T> = this
        let nearestNeighbor: KdTreeNode<T> = this.data
        let nearestDistance: number = this.distance(vector, nearestNeighbor.vector)
        for (let depth: number = 0; current.left || current.right; depth ++) {
            //console.log('nearestNeighbor()')
            // Determine axis
            axis = depth % this.dimensions
            
            // Recurse either left or right
            if (!current.right || current.data.vector[axis] > vector[axis]) {
                // Traverse left
                if (!current.left) {
                    break
                }
                current = current.left
            } else {
                // Traverse right
                if (!current.right) {
                    break
                }
                current = current.right
            }

            // Check if this tree should become our nearest neighbor
            const distance = this.distance(current.data.vector, nearestNeighbor.vector)
            if (distance < nearestDistance) {
                nearestDistance = distance
                console.log('new dist:', distance)
                console.log(`vector: [${current.data.vector[0]}, ${current.data.vector[1]}, ${current.data.vector[2]}]`)
                nearestNeighbor = current.data
                
            }
        }
        return nearestNeighbor
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
