import '../assets/styles/demo.scss'

import * as React from 'react'
import Palette from '../../../pewter/src/Palette'
import RGB from '../../../pewter/src/RGB'

interface IState {
	colors: RGB[]
}

export class Demo extends React.Component<{}, IState> {
	state: IState = {
		colors: []
	}

	palette = new Palette()
	src = 'src/assets/images/sample.jpg'
	componentDidMount() {
		let image = new Image(64, 64) 
		image.src = this.src

		image.onload = () => {
			this.palette.setImage(image)
			this.setState({ colors: this.palette.getColors(3) })
		}
	}

	render() {
		
		return (
			<div className='demo-container'>
				<h1>Pewter</h1>
				<h2>Intelligent color palettes from images.</h2>
				<img src={this.src} />
				<h6>{`Colors (${this.state.colors.length})`}</h6>
				<ul>
					{this.state.colors.map((color: RGB, index: number) => (
						<li><div className='swatch' style={{backgroundColor: color.toCSS()}} />{`Color ${index + 1}`}</li>
					))}
				</ul>
			</div>
		)
	}
}