import '../assets/styles/demo.scss'

import * as React from 'react'
import Palette, { PaletteOptions, defaultOptions } from '../../../pewter/src/Palette'
import RGB from '../../../pewter/src/RGB'

import { Slider } from '@material-ui/lab'

interface IState {
	colors: RGB[]
	options: PaletteOptions
}

export class Demo extends React.Component<{}, IState> {
	state: IState = {
		colors: [],
		options: defaultOptions
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

	componentDidMount() {
		
	}

	render() {		
		const { tolerance, filterTolerance, threshold } = this.state.options
		
		let image = new Image(64, 64) 
		image.src = this.src

		image.onload = () => {
			this.palette.setImage(image)
			this.setState({ colors: this.palette.getColors(3) })
		}

		return (
			<div className='demo-container'>
				<img src={this.src} />
				<h6>{`Colors (${this.state.colors.length})`}</h6>
				<ul>
					{this.state.colors.map((color: RGB, index: number) => (
						<li key={index}><div className='swatch' style={{backgroundColor: color.toCSS()}} />{`Color ${index + 1}`}</li>
					))}
				</ul>
				<ul className='demo-options'>
					<li>
						<h6>Tolerance</h6>
						<Slider
							name='tolerance'
							value={tolerance}
							onChange={(event: any, value: number) => this.handleValueChange('tolerance', value)}
						/>
					</li>
				</ul>
			</div>
		)
	}
}