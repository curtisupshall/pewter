import RGB from './RGB'
import { Canvas, Image } from './Canvas';
import { Bucket } from './Bucket';

export interface PaletteOptions {
	tolerance: number,
	filterTolerance: number,
	threshold: number
}

export const defaultOptions: PaletteOptions = {
	tolerance: 40,
	filterTolerance: 70,
	threshold: 40
}

export default class Palette {
	private canvas: Canvas
	private options: PaletteOptions

	constructor(image?: any, options?: PaletteOptions) {
		this.setImage(image)
		this.setOptions(options)
	}

	/**
	 * @TODO Make a timer for gathering/calculating
	 */
	getColors = (n: number = 1, filter: RGB[] = []): RGB[] => {
		if (this.canvas.data.length === 0) {
			return []
		}

		const { tolerance, filterTolerance, threshold } = this.options

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
				// try {
					let distance: number = buckets[j].swirl().distanceTo(pixels[i])
					sum += distance
					count ++
					if (distance <= tolerance) {
						buckets[j].push(pixels[i])
						// j = 0
						
						break
					}
				/*} catch (e) {
					console.log('bad i:', i)
				}*/
			}
			if (pixels[i]) {
				buckets.push(new Bucket(pixels[i]))
			}
		}
		const DEBUG_AVG_DIST = sum / count
		console.log('Average dist:', DEBUG_AVG_DIST)
		buckets.sort((a, b) => {
			return a.size() - b.size()
		})
		// console.log('buckets', buckets)
		buckets.forEach(bucket => {
			// console.log(`Count: ${bucket.size()}, color: ${bucket.swirl().toCSS()}`)
		})
		// console.log('num buckets after sort:', buckets.length)

		// Buckets are removed from the list based on the filtered color
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
		console.log('threshold = ', threshold)
		for (n --; n > 0 && buckets.length; n --) {
			let color: RGB = buckets.pop().swirl()
			let exceedsThreshold = true
			output.forEach((outputColor: RGB) => {
				if (color.distanceTo(outputColor) < threshold) {
					exceedsThreshold = false
					return
				}
			})
			if (exceedsThreshold) {
				output.push(color)
			}	
		}
		return output
	}

	setImage = (image?: any) => {
		this.canvas = new Canvas(image)
	}

	resetOptions = () => {
		this.setOptions()
	}

	setOptions = (options?: any) => {
		if (!options) {
			this.options = defaultOptions
		} else {
			/**
			 * @TODO Test without using spread operator, e.g.
			 * `this.options = options`.
			 */
			this.options = {
				...this.options,
				...options
			}
		}
	}
}