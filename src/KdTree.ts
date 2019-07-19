/**
 * Calculate the distance between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @return The distance between the two vectors.
 */
const distance = (a: number[], b: number[]): number => {
    // Vectors must have same dimension
    if (a.length !== b.length) {
        return null
    }
    let sum: number = 0;
    for (let i: number = 0; i < a.length; i ++) {
        sum += Math.pow(a[i] - b[i], 2)
    }
    return Math.sqrt(sum)
}

export class KdTreeNode<T> {
    public value: T
    public vector: number[]

    constructor (value: T, vector: number[]) {
        this.value = value
        this.vector = vector
    }

    public distance = (vector: number[]): number => {
        // Vectors must have same dimension
        if (this.vector.length !== vector.length) {
            return null
        }
        let sum: number = 0;
        for (let i: number = 0; i < this.vector.length; i ++) {
            sum += Math.pow(this.vector[i] - vector[i], 2)
        }
        return Math.sqrt(sum)
    }
}

export class KdTree<T> {
    protected data: KdTreeNode<T>
    protected left: KdTree<T>
    protected right: KdTree<T>
    private dimension: number

    constructor (k: number, elements: KdTreeNode<T>[], depth: number = 0) {
        const n: number = elements.length
        if (n === 0) {
            return
        }
        this.dimension = k

        // Select the median element
        const medianIndex: number = Math.ceil((elements.length - 1) / 2)
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
     * Recursive implementation of nearestNeighbor.
     */
    public nearest = (node: KdTree<T>, goal: number[], best: KdTreeNode<T>, depth: number = 0): KdTreeNode<T> => {
        if (node == null) {
            return best
        }
        if (distance(node.data.vector, goal) < distance(best.vector, goal)) {
            best = node.data
        }
        const axis = depth % this.dimension
        let good: KdTree<T>
        let bad: KdTree<T>

        if (goal[axis] <  node.data.vector[axis]) { // (according to n's comparator):
            good = node.left
            bad = node.right
        } else {
            good = node.right
            bad = node.left
        }
        best = this.nearest(good, goal, best, depth + 1)
        let optimistic: number[] = goal
        optimistic[axis] = node.data.vector[axis]
        if (distance(optimistic, goal) < distance(best.vector, goal)) {
            // case when bad split could still have something useful
            best = this.nearest(bad, goal, best, depth + 1)
        }
        return best
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
        let nearestDistance: number = distance(vector, nearestNeighbor.vector)
        for (let depth: number = 0; current.left || current.right; depth ++) {
            //console.log('nearestNeighbor()')
            // Determine axis
            axis = depth % this.dimension
            
            // Recurse either left or right
            if (!current.right || current.data.vector[axis] < vector[axis]) {
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
            const dist = distance(current.data.vector, nearestNeighbor.vector)
            if (dist < nearestDistance) {
                nearestDistance = dist
                // console.log('new dist:', distance)
                // console.log(`vector: [${current.data.vector[0]}, ${current.data.vector[1]}, ${current.data.vector[2]}]`)
                nearestNeighbor = current.data
                
            }
        }
        return nearestNeighbor
    }
}
