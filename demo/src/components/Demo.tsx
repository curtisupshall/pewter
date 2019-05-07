import '../assets/styles/main.scss'

import * as React from 'react'
import Palette, { PaletteOptions, defaultOptions } from '../../../pewter/src/Palette'
import ColorNames from '../../../pewter/src/ColorNames'
import RGB from '../../../pewter/src/RGB'

import { ImageDialog } from './ImageDialog';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grow,
	Icon,
	IconButton,
	Radio,
	Snackbar,
	Switch,
	TextField
} from '@material-ui/core'
// import { CloseIcon } from '@material-ui/icons'
import { Slider } from '@material-ui/lab'

interface IFilter {
	enabled: boolean
}

interface IState {
	colors: RGB[]
	numColors: number
	options: PaletteOptions
	filter: IFilter
	src: string
	dialogOpen: boolean
	snackbarOpen: boolean
}

const demoImages: string[] = []
for (let i = 1; i <= 20; i ++) {
	demoImages.push(`sample (${i})`)
}

const copyToClipboard = (str: string) => {
	const el = document.createElement('textarea')
	el.value = str
	document.body.appendChild(el)
	el.select()
	document.execCommand('copy')
	document.body.removeChild(el)
	return 'Copied to clipboard!'
}

const MAX_COLORS = 8
const MIN_COLORS = 1

export const getSrc = (filename: string) => {
	return `src/assets/images/${filename}.jpg`
}

export class Demo extends React.Component<{}, IState> {
	state: IState = {
		colors: [],
		numColors: 3,
		options: defaultOptions,
		filter: { enabled: true },
		src: getSrc(demoImages[0]),
		dialogOpen: false,
		snackbarOpen: false 
	}

	palette = new Palette()
	
	handleDialogOpen = () => {
		this.setState({ dialogOpen: true })
	}

	handleDialogClose = () => {
		console.log('closing dialog')
		this.setState({ dialogOpen: false })
	}

	handleImageChange = (src: string) => {
		this.setState({ src })
	}

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

	incrementNumColors = () => {
		this.setState((state: IState) => {
			if (state.numColors >= MAX_COLORS) {
				return
			}

			return {
				...state, 
				numColors: state.numColors + 1
			}
		})
	}

	decrementNumColors = () => {
		this.setState((state: IState) => {
			if (state.numColors <= MIN_COLORS) {
				return
			}

			return {
				...state, 
				numColors: state.numColors - 1
			}
		})
	}

	handleFilterChange = (field: string, value: any) => {
		this.setState((state: IState) => {
			return { filter: { ...state.filter, [field]: value } }
		})
	}

	handleReset = () => {
		this.setState({ options: defaultOptions, numColors: 3 })
	}

	handleCopyToClipboard = (str: string) => {
		copyToClipboard(str)
		this.setState({ snackbarOpen: true })
	}

	handleSnackbarClose = (event: any, reason: string) => {
		if (reason === 'clickaway') {
			return
		}

		this.setState({ snackbarOpen: false })
	}

	render() {
		console.log('Demo.render()')
		const { tolerance, filterTolerance, threshold } = this.state.options

		// console.log(this.state)
		
		let image = new Image(64, 64) 
		image.src = this.state.src

		image.onload = () => {
			this.palette.setImage(image)
		}

		const colors = this.palette.getColors(this.state.numColors)
		const colorNames: string[] = new ColorNames(colors).names // Need to fix this

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
						<a href='https://github.com/curtisupshall/pewter'>
							<img className='octocat' src='src/assets/images/octocat.svg' />
						</a>
					</li>
				</ul>
				<div>
					<div className='image-container'>
						<img src={this.state.src} />
						<a onClick={() => this.handleDialogOpen()} className='image-cover'>
							<div className='image-cover__label'>Change Image</div>
						</a>
					</div>
					<ul className='demo-colors'>
						{colors.map((color: RGB, index: number) => (
							<li key={index} onClick={() => this.handleCopyToClipboard(color.toCSS())}>
								<div className='swatch' style={{backgroundColor: color.toCSS()}} />
								<div className='color-info'>
									<h3>{colorNames[index]}</h3>
									<h5>{color.toCSS()}</h5>
								</div>
							</li>
						))}
					</ul>
					{colors.length < this.state.numColors && (
						<div className='color-warning'>
							{`⚠️ For ${this.state.numColors} colors, try changing Tolerance`}
						</div>
					)}
				</div>
				<div>
					<div className='color-options'>
						<div className='color-counter'>
							<IconButton disabled={this.state.numColors === MIN_COLORS} onClick={() => this.decrementNumColors()}><Icon>remove</Icon></IconButton>
							<h3>{`${this.state.numColors} Colors`}</h3>
							<IconButton disabled={this.state.numColors === MAX_COLORS} onClick={() => this.incrementNumColors()}><Icon>add</Icon></IconButton>
						</div>
						<Button
							variant='contained'
							name='reset'
							className='reset=button'
							onClick={() => this.handleReset()}>Reset</Button>
					</div>
					<ul className='demo-options'>
						<li>
							<h4>Input Tolerance<span>{tolerance}</span></h4>
							<Slider
								name='tolerance'
								value={tolerance}
								onChange={(event: any, value: number) => this.handleValueChange('tolerance', value)}
								step={1}
							/>
						</li>
						<li>
							<h4>Output Tolerance<span>{threshold}</span></h4>
							<Slider
								name='threshold'
								value={threshold}
								onChange={(event: any, value: number) => this.handleValueChange('threshold', value)}
								step={1}
							/>
						</li>
						<Grow in={this.state.filter.enabled}>
							<li>
								<h4>Filter Tolerance<span>{filterTolerance}</span></h4>
								<Slider
									name='filterTolerance'
									value={filterTolerance}
									onChange={(event: any, value: number) => this.handleValueChange('filterTolerance', value)}
									step={1}
								/>
							</li>
						</Grow>
					</ul>
					<div>
					<Switch
						value={this.state.filter.enabled}
						onChange={(event: any, value: boolean) => this.handleFilterChange('enabled', value)}
					/>
					<span>Filter</span>
					{this.state.filter.enabled && (
						<div className='filter-options'>
							<div>
								<Radio />
								<span>Recursive</span>
							</div>
							<div>
								<Radio />
								<span>Custom Color</span>
								<input type='color' />
							</div>
						</div>
					)}
				</div>
				</div>
				<Dialog
					open={this.state.dialogOpen}
					scroll='paper'
				>
					<ImageDialog
						src={this.state.src}
						demoImages={demoImages}
						onImageChange={this.handleImageChange}
						onDialogClose={this.handleDialogClose}
					/>
				</Dialog>
				<Snackbar
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					style={{ color: '#FFF' }}
					open={this.state.snackbarOpen}
					onClose={this.handleSnackbarClose}
					autoHideDuration={6000}
					message={<span>Copied to Clipboard!</span>}
					action={[
						<IconButton
							onClick={this.handleSnackbarClose}
							key='close'
							aria-label='Close'
						>
							<a color='inherit'>close</a>
						</IconButton>
					]}
				/>
			</div>
		)
	}
}