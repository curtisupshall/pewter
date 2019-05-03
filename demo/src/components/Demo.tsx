import '../assets/styles/main.scss'

import * as React from 'react'
import Palette, { PaletteOptions, defaultOptions } from '../../../pewter/src/Palette'
import RGB from '../../../pewter/src/RGB'

import { Slider } from '@material-ui/lab'
import {
	Icon,
	Switch,
	TextField
} from '@material-ui/core'

interface IFilter {
	enabled: boolean
}

interface IState {
	colors: RGB[]
	numColors: number
	options: PaletteOptions
	filter: IFilter
}

export class Demo extends React.Component<{}, IState> {
	state: IState = {
		colors: [],
		numColors: 3,
		options: defaultOptions,
		filter: { enabled: false }
	}

	palette = new Palette()
	src = 'src/assets/images/sample2.jpg'

	handleValueChange = (field: string, value: number) => {
		this.setState((state: IState) => {
			return {
				'options': {
					...state.options,
					[field]: value
				}
			}
		}, () => {
			this.palette.setOptions(this.state.options)
		})
	}

	handleNumColorsChange = (event: any) => {
		this.setState({ numColors: event.target.value })
	}

	render() {		
		const { tolerance, filterTolerance, threshold } = this.state.options
		
		let image = new Image(64, 64) 
		image.src = this.src

		image.onload = () => {
			this.palette.setImage(image)
		}
		
		const colors = this.palette.getColors(this.state.numColors)

		return (
			<div className='demo-container'>
				<ul className='demo-header'>
					<li>
						<div className='demo-header__title'>
							<h2><span>pewter</span> - Intelligent color palettes from images.</h2>
							<a href='https://github.com/curtisupshall'><h5>By @curtisupshall</h5></a>
						</div>
					</li>
					<li>
						<a href='https://github.com/curtisupshall'>GitHub logo here</a>
					</li>
				</ul>
				<div>
					<img src={this.src} />
					<h6>{`Colors (${colors.length})`}</h6>
					<ul className='demo-colors'>
						{colors.map((color: RGB, index: number) => (
							<li key={index}>
								<div className='swatch' style={{backgroundColor: color.toCSS()}} />
								<div className='color-info'>
									<h3>{`Color ${index + 1}`}</h3>
									<h5>{color.toCSS()}</h5>
								</div>
							</li>
						))}
					</ul>
					<div className='color-warning'>
						{`⚠️ For ${this.state.numColors} colors, try changing Tolerance`}
					</div>
				</div>
				<div>
					<ul className='demo-options'>
						<li>
							<h4>Tolerance<span>{tolerance}</span></h4>
							<Slider
								name='tolerance'
								value={tolerance}
								onChange={(event: any, value: number) => this.handleValueChange('tolerance', value)}
								step={1}
							/>
						</li>
						<li>
							<h4>Filter Tolerance<span>{filterTolerance}</span></h4>
							<Slider
								name='filterTolerance'
								value={filterTolerance}
								onChange={(event: any, value: number) => this.handleValueChange('filterTolerance', value)}
								step={1}
							/>
						</li>
						<li>
							<h4>Threshold<span>{threshold}</span></h4>
							<Slider
								name='threshold'
								value={threshold}
								onChange={(event: any, value: number) => this.handleValueChange('threshold', value)}
								step={1}
							/>
						</li>
					</ul>
					<div className='color-options'>
						<TextField
							name='numColors'
							label='Colors'
							value={this.state.numColors}
							min={1}
							max={8}
							onChange={this.handleNumColorsChange}
						/>
						<Switch value={this.state.filter.enabled} />
					</div>
				</div>
			</div>
		)
	}
}