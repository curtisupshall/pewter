import KDTree from './KDTree'
import { fromHex } from './util'
import * as colorNames from './colornames.min.json'

interface PewterOptions {

}

class Pewter {
    private dictionary: KDTree<string>

    constructor(options?: PewterOptions) {
        const dictionary: Record<string, string> = colorNames
        const keys: string[] = Object.keys(colorNames)
        this.dictionary = new KDTree<string>(dictionary[keys[0]], fromHex(keys[0]))
        for (let i: number = 1; i < keys.length; i ++) {
            this.dictionary.insert(new KDTree<string>(dictionary[keys[i]], fromHex(keys[i])))
        }

        console.log('Dictionary:', this.dictionary)
    }

    testDictionary = (color: number[]) => {
        return this.dictionary.nearestNeighbor(color)
    }


}

export default Pewter
