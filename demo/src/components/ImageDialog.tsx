import * as React from 'react'

import { getSrc } from './Demo'

import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@material-ui/core'

interface IProps {
    src: string,
    demoImages: string[],
    onImageChange: (src: string) => void
    onDialogClose: () => void
}

interface IState {
    src: string
}

export class ImageDialog extends React.Component<IProps, IState> {
    render() {
        return (
            <>
                <DialogTitle>Choose Image</DialogTitle>
                <DialogContent>
                    <div className='image-gallery'>
                        <img className='image-gallery__selected' src={this.props.src} />
                        <ul className='image-gallery__list'>
                            {this.props.demoImages.map((demoImage: string) => (
                                <li><img className='image-gallery__image' src={getSrc(demoImage)} /></li>
                            ))}
                        </ul>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => this.props.onImageChange(this.state.src)}>Select</Button>
                    <Button variant='text' onClick={() => this.props.onDialogClose()}>Cancel</Button>
                </DialogActions>
            </>
        )
    }
}