export class YUV {
	protected Y: number
	protected U: number
	protected V: number
	
	constructor (Y: number = 0, U: number = 0, V: number = 0) {
		this.Y = Y
		this.U = U
		this.V = V
	}
	
	/**
	* Computes the Euclidean distance between two YUV
	* colors.
	* @param color Another YUV color
	* @return The distance between the two colors
	*/
	distanceTo(other: YUV): number {
		return Math.sqrt(
			Math.pow(this.Y - other.Y, 2) + 
			Math.pow(this.U - other.U, 2) +
			Math.pow(this.V - other.V, 2)
		)
	}
		
}
