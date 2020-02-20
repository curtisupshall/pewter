import { distance } from '../util'
import Cluster from './Cluster'

const ITERATIONS: number = 2

class KMeansCluster {
    private data: number[][]

    constructor(data: number[][]) {
        this.data = data
    }

    getClusters = (k: number): Cluster[] => {
        if (k === 0) {
            return []
        }
        const size: number = this.data.length
        const pivots: number[] = [size - 1]
        for (let i: number = 1; i < k; i ++) {
            pivots.push(Math.floor(pivots[i - 1] - size / k))
        }

        const clusters: Cluster[] = pivots.map((pivot: number) => new Cluster(this.data[pivot]))

        for (let i: number = 0; i < ITERATIONS; i ++) {
            for (let j: number = 0; j < this.data.length; j ++) {
                let minDistance: number = distance(clusters[0].getValue(), this.data[j])
                let clusterIndex: number = 0
                for (let k: number = 1; k < clusters.length; k ++) {
                    let dist: number = distance(clusters[k].getValue(), this.data[j])
                    if (dist < minDistance) {
                        minDistance = dist
                        clusterIndex = k
                    }
                }
                clusters[clusterIndex].push(this.data[j])
            }

            clusters.forEach((cluster: Cluster) => cluster.setMean())
        }

        return clusters
    }
}

export default KMeansCluster
