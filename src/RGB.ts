import { YUV } from "./YUV";

export const yuvConstants = {
	WR: 0.299,
	WG: 0.587, // = 1 - WR - WB
	WB: 0.114,
	U_MAX: 0.436,
	V_MAX: 0.615
}

export default class RGB {
	public red: number
	public green: number
	public blue: number
	
	constructor (r: number = 0, g: number = 0, b: number = 0) {
		this.red = r
		this.green = g
		this.blue = b
	}
	
	private toHex(number: number, maxLength:number = 2): string {
		let hex = number.toString(16)
		while (maxLength > hex.length) hex = '0' + hex
		return hex
	}
	
	public toCSS(): string {
		return String('#' + this.toHex(this.red) + this.toHex(this.green) + this.toHex(this.blue)).toUpperCase()
	}
	
	public toYUV(): YUV {
		let { WR, WG, WB, U_MAX, V_MAX } = yuvConstants,
		Y = WR * this.red + WB * this.blue + WG * this.green,
		U = U_MAX * (this.blue - Y) / (1 - WB),
		V = V_MAX * (this.red - Y) / (1 - WR)

		return new YUV(Y, U, V)
	}
	
	public distanceTo(other: RGB): number {
		return this.toYUV().distanceTo(other.toYUV())
	}
}
