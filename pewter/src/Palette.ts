import { RGB } from './RGB'
import { Canvas, Image } from './Canvas';
import { Bucket } from './Bucket';

export default class Palette {
	public colors: RGB[]
	public canvas: Canvas

	constructor(image: Image) {
		this.canvas = new Canvas(image)
		this.colors = this.getColors()
	}

	/**
	 * @TODO Make a timer for gathering/calculating
	 */
	getColors = (n: number = 1, filter: RGB[] = []): RGB[] => {

		const tolerance = 0.1
		const filterTolerance = 0.1
		const numThreshold = 0.1

		if (n === 0) {
			return [new RGB()]
		}
		else if (n < 1) {
			throw new Error('Number of colors must be non-negative.')
		}
		else if (n > this.canvas.size()) {
			throw new Error('Not enough data to produce ' + n + ' colors.')
		}

		let buckets: Bucket[] = []
		let pixels: RGB[] = this.canvas.data
		let output: RGB[] = []
		for (let i = 0; i < this.canvas.size(); i ++) {
			for (let j = 0; j < buckets.length; j ++) {
				if (buckets[j].peek().distanceTo(pixels[i]) <= tolerance) {
					buckets[j].push(pixels[i])
					j = 0
					i ++
				}
			}
			buckets.push(new Bucket(pixels[i]))
		}
		buckets.sort((a, b) => {
			return a.size() - b.size()
		})
		if (filter.length) {
			buckets = buckets.reduce((arr: Bucket[], bucket: Bucket) => {
				for (let i = 0; i < filter.length; i ++) {
					if (bucket.peek().distanceTo(filter[i]) >= filterTolerance) {
						return arr
					}
				}
				arr.push(bucket)
				return arr
			}, [])
		}
		output.push(buckets[buckets.length - 1].swirl())
		buckets.pop()
		while (n - 1 > 0 && buckets.length) {
			while (output[output.length - 1].distanceTo(buckets[buckets.length - 1].swirl()) < numThreshold) {
				if (buckets.length) {
					buckets.pop()
				}
				else {
					return output
				}
			}
			output.push(buckets[buckets.length - 1].swirl())
			buckets.pop()			
			n --
		}
		return output
	}
}