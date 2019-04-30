import RGB from './RGB'

export class Bucket {
	private data: RGB[]

	constructor(colors: RGB | RGB[]) {
		this.data = []
		this.data = this.data.concat(colors)
	}

	push = (color: RGB): void => {
		this.data.push(color);
	}

	peek = (): RGB => {
		return this.data[this.data.length - 1]
	}

	pop = (): RGB | undefined => {
		return this.data.pop()
	}

	isEmpty = (): boolean => {
		return this.data.length > 0
	}

	size = (): number => {
		return this.data.length
	}

	swirl = (): RGB => {
		let r: number = 0
		let g: number = 0
		let b: number = 0
		let size = this.size()
		for (let i = 0; i < size; i ++) {
			r += this.data[i].red
			g += this.data[i].green
			b += this.data[i].blue
		}
		return new RGB(
			Math.round(r / size),
			Math.round(g / size),
			Math.round(b / size)
		)
	}
}