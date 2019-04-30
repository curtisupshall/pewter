import RGB from './RGB'
import { Canvas, Image } from './Canvas';
import { Bucket } from './Bucket';

export default class Palette {
	private canvas: Canvas

	constructor(image?: any) {
		this.setImage(image)
	}

	/**
	 * @TODO Make a timer for gathering/calculating
	 */
	getColors = (n: number = 1, filter: RGB[] = []): RGB[] => {
		console.log('Palette.data.length: ', this.canvas.data.length)
		if (this.canvas.data.length === 0) {
			return []
		}

		const tolerance = 100
		const filterTolerance = 50
		const numThreshold = 30

		if (n === 0) {
			return [new RGB()]
		}
		else if (n < 1) {
			throw new Error('Number of colors must be non-negative.')
		}
		else if (n > this.canvas.data.length) {
			throw new Error('Not enough data to produce ' + n + ' color(s).')
		}

		let buckets: Bucket[] = []
		let pixels: RGB[] = this.canvas.data
		let output: RGB[] = []
		let sum: number = 0 // DEBUG
		let count: number = 0
		for (let i = 0; i < pixels.length; i ++) {
			for (let j = 0; j < buckets.length; j ++) {
				try {
					let distance: number = buckets[j].peek().distanceTo(pixels[i])
					sum += distance
					count ++
					if (distance <= tolerance) {
						buckets[j ++].push(pixels[i])
						if (++ i === pixels.length) {
							break
						}
					}
				} catch (e) {
					console.log('bad i:', i)
				}
			}
			buckets.push(new Bucket(pixels[i]))
		}
		console.log(`from ${pixels.length} pixels, there are ${buckets.length} buckets`);
		console.log('buckets before sort:', buckets)
		console.log('average color dist: ', sum / count)
		buckets.sort((a, b) => {
			return a.size() - b.size()
		})
		console.log('buckets after sort:', buckets)
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

	setImage = (image?: any) => {
		this.canvas = new Canvas(image)
	}
}