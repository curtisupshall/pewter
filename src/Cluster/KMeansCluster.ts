import { distance, mean } from './util'
import { ICluster } from './types/pewter'

class KMeansCluster {
    private data: number[][]

    constructor(data: number[][]) {
        this.data = data
    }

    getClusters = (k: number): number[][][] => {
        if (k === 0) {
            return []
        }
        const size: number = this.data.length
        const pivots: number[] = [size - 1]
        for (let i: number = 1; i < k; i ++) {
            pivots.push(Math.floor(pivots[i - 1] - size / k))
        }

        const clusters: ICluster[] = pivots.map((pivot: number) => ({ mean: this.data[pivot], data: [] }))

        for (let i: number = 0; i < 2; i ++) {
            for (let j: number = 0; j < this.data.length; j ++) {
                let minDistance: number = distance(clusters[0].mean, this.data[j])
                let clusterIndex: number = 0
                for (let k: number = 1; k < clusters.length; k ++) {
                    let dist: number = distance(clusters[k].mean, this.data[j])
                    if (dist < minDistance) {
                        minDistance = dist
                        clusterIndex = k
                    }
                }
                clusters[clusterIndex].data.push(this.data[j])
            }

            clusters.map((cluster: ICluster) => ({ ...cluster, mean: mean(cluster.data) }))
        }

        return clusters.map((cluster: ICluster) => cluster.data)

        // console.log('pivots:', pivots)
    }
}

export default KMeansCluster
