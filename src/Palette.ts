import RGB from './RGB'
import { Canvas, Image } from './Canvas';
import { Bucket } from './Bucket';
import { dictionary } from './dictionary'
import { KdTree, KdTreeNode } from './KdTree';

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
	private dictionary: KdTree<string>
	private options: PaletteOptions

	constructor(image?: any, options?: PaletteOptions) {
		//this.setImage(image)
		//this.setOptions(options)

		// Create dictionary tree
		const dict: KdTreeNode<string>[] =  dictionary.map((entry: any) => {
			return new KdTreeNode<string>(entry[0], entry[1])
		})
		this.dictionary = new KdTree<string>(3, dict)
	}

	public getNames = (colors: RGB[]): string[] => {
		return colors.map((color: RGB) => {
			return this.dictionary.nearest(color.toArray()).value
		})
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
		// console.log('Average dist:', DEBUG_AVG_DIST)
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
		// console.log('threshold = ', threshold)
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

	resetOptions = () => {
		this.setOptions()
	}

	setImage = (image?: any): void => {
		this.canvas = new Canvas(image)
	}

	setOptions = (options?: any): void => {
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
