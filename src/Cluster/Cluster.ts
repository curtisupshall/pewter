import { mean } from "../util"

class Cluster {
    protected data: number[][]
    protected value: number[]

    constructor() {

    }

    push = (vector: number[]) => {
        this.data.push(vector)
    }

    pop = (): number[] => {
        return this.data.pop()
    }

    setMean = () => {
        this.value = mean(this.data)
    }

    getValue = (): number[] => {
        return this.value
    }

    isEmpty = (): boolean => {
        return this.data.length === 0
    }
}

export default Cluster
