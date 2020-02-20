import { distance, MAX_DISTANCE } from './util'

class KDTree<T> {
    readonly value: T
    readonly vector: number[]
    protected left: KDTree<T> = null
    protected right: KDTree<T> = null
    private dimension: number

    constructor(value: T, vector: number[]) {
        this.value = value
        this.vector = vector
        this.dimension = vector.length
    }

    distance = (vector: number[]): number => {
        return distance(vector, this.vector)
    }

    hasLeft = (): boolean => {
        return Boolean(this.left)
    }

    hasRight = (): boolean => {
        return Boolean(this.right)
    }

    index = (index: number): number => {
        return this.vector[index]
    }

    insert = (node: KDTree<T>, dimension: number = 0): KDTree<T> => {
        if (node.index(dimension) < this.index(dimension)) {
            if (this.hasLeft()) {
                return this.left.insert(node, (dimension + 1) % this.dimension)
            } else {
                this.left = node
            }
        } else {
            if (this.hasRight()) {
                return this.right.insert(node, (dimension + 1) % this.dimension)
            } else {
                this.right = node
            }
        }
        return node
    }

    nearestNeighbor = (goal: number[], best: KDTree<T> = this, dimension: number = 0): KDTree<T> => {
        // console.log(`Best = ${best.value} ${best.vector}`)
        let good: KDTree<T>
        let bad: KDTree<T>
        const distance: number = this.distance(goal)
        if (distance < best.distance(goal)) {
            console.log('compare')
            best = this
            //console.log('bestDistance:', bestDistance)
        }
        if (goal[dimension] < this.index(dimension)) {
            good = this.left
            bad = this.right
        } else {
            good = this.right
            bad = this.left
        }
        if (good) {
            best = good.nearestNeighbor(goal, best, (dimension + 1) % this.dimension)
        }
        const badSideCouldStillHaveSomethingUseful: boolean = Boolean(bad)
        if (badSideCouldStillHaveSomethingUseful) {
            best = bad.nearestNeighbor(goal, best, (dimension + 1) % this.dimension)
        }

        return best
    }

    toString = (): string => {
        return `${this.value} ${this.vector}`
    }
}

export default KDTree