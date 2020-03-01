import ColorEncoding from './ColorEncoding'

const W_R: number = 0.299
const W_B: number = 0.114
const W_G: number = 1 - W_R - W_B 
const U_MAX: number = 0.436
const V_MAX: number = 0.615

class YUV extends ColorEncoding {
    constructor(data: [number, number, number]) {
        super(data)
        const Y: number = W_R * this.data[0] + W_G * this.data[1] + W_B * this.data[2]
        this.data = [
            Y,
		    U_MAX * (this.data[2] - Y) / (1 - W_B),  // U
            V_MAX * (this.data[0] - Y) / (1 - W_R)   // V
        ]
    }

    toRGB = (): [number, number, number] => {
        return [
            this.data[0] + this.data[2] * (1 - W_R) / V_MAX,
            this.data[0] - this.data[1] * (W_B * (1 - W_B)) / (U_MAX * W_G),
            this.data[0] + this.data[1] * (1 - W_B)
        ]
    }
}

export default YUV