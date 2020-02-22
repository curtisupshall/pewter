import KDTree from './KDTree'
import { fromHex } from './util'
import * as colorNames from './colornames.min.json'
import KMeansCluster from './Cluster/KMeansCluster'
import Cluster from './Cluster/Cluster'

export const getImageData = (image: HTMLImageElement): number[][][] => {
    if (!image) {
        return
    }

    const data: number[][][] = []
    const { width, height } = image
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context: CanvasRenderingContext2D = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    const imageData: Uint8ClampedArray = context.getImageData(0, 0, width, height).data
    let k: number = 0;
    for (let i: number = 0; i < width; i ++) {
        const row: number[][] = []
        for (let j: number = 0; j < height; j ++) {
            row.push(Array.from(imageData.slice(k, k + 3)))
            k += 4
        }
        data.push(row)
    }

    return data
}

interface PewterOptions {

}

class Pewter {
    private dictionary: KDTree<string>
    private clusters: Cluster[]

    constructor(data: number[][], options?: PewterOptions) {
        if (data.length === 0) {
            this.clusters = []
            return
        }
        const dictionary: Record<string, string> = colorNames
        const keys: string[] = Object.keys(colorNames)
        this.dictionary = new KDTree<string>(dictionary[keys[0]], fromHex(keys[0]))
        for (let i: number = 1; i < keys.length; i ++) {
            this.dictionary.insert(new KDTree<string>(dictionary[keys[i]], fromHex(keys[i])))
        }

        const kMeansCluster: KMeansCluster = new KMeansCluster(data)
        this.clusters = kMeansCluster.getClusters(10)
        console.log('Clusters:', this.clusters.map((cluster: Cluster) => cluster.getValue()))
        console.log('Data:', data)
    }

    testDictionary = (color: number[]) => {
        return this.dictionary.nearestNeighbor(color)
    }

    getClusters = () => {
        return this.clusters
    }


}

export default Pewter
