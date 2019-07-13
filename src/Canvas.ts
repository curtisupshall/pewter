import RGB from "./RGB";

export type Image = HTMLImageElement

export class Canvas {

	private canvas: HTMLCanvasElement
	public data: RGB[]

	constructor(image?: any) {
		this.data = []
		this.canvas = document.createElement('canvas')

		if (!image) {
			return
		}
		/*
		if (image instanceof HTMLImageElement) {

		}
		else throw new Error("Image must be of type HTMLImageElement.")
		*/


		this.canvas.width = image.width
		this.canvas.height = image.height
		const ctx = this.canvas.getContext('2d')
		ctx.drawImage(image, 0, 0, image.width, image.height)
		let imageData = ctx.getImageData(0, 0, image.width, image.height).data

		for (let i = 0; i < imageData.length; i += 4) {
			this.data.push(new RGB(imageData[i], imageData[i + 1], imageData[i + 2]))
		}

	}
}