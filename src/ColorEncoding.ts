import { distance } from './util'

class ColorEncoding {
    protected data: [number, number, number]

    constructor(data: [number, number, number]) {
        this.data = data
    }

    toRGB = (): [number, number, number] => {
        return this.data
    }

    distance = (color: ColorEncoding) => {
        return distance(this.data, color.data)
    }
}

export default ColorEncoding
