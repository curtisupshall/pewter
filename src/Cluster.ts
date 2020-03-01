import { mean } from './util'

class Cluster {
    protected data: number[][]
    protected value: number[]

    constructor(value: number[]) {
        this.value = value
        this.data = []
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
        return this.value.map((component: number) => Math.round(component))
    }

    isEmpty = (): boolean => {
        return this.data.length === 0
    }
}

export default Cluster
