import * as React from 'react'

import * as classNames from 'classnames'

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
    state: IState = {
        src: this.props.src
    }

    handleImagePreview = (src: string) => {
        this.setState({ src })
        // this.props.onImageChange(src)
    }

    handleImageChange = () => {
        this.props.onDialogClose()
        this.props.onImageChange(this.state.src)
    }

    render() {
        const imageOnLoad = ({target: img}: any) => {
            let ratio = img.offsetWidth / img.offsetHeight;
            let type = '--square'
            if (img.offsetWidth > img.offsetHeight) {
                type = '--horizontal'
            } else if (img.offsetHeight > img.offsetWidth) {
                type = '--vertical'
            }
            img.className = classNames('image-gallery__image', type)
            img.parentNode.className = classNames(type)
        }
        return (
            <>
                <DialogTitle>Choose Image</DialogTitle>
                <DialogContent>
                    <div className='image-gallery'>
                        <img className='image-gallery__selected' src={this.state.src} />
                        <ul className='image-gallery__list'>
                            {this.props.demoImages.map((demoImage: string) => {
                                // let image = new Image()
                                const src = getSrc(demoImage)
                                // let type = '--square'
                                /*image.onload = () => {
                                    
                                    // image.className = classNames('image-gallery__image', ratio > 1 ? '--horizontal' : '--vertical')
                                }*/
                                // image.src = src
                                return (
                                    <li onClick={() => this.handleImagePreview(src)}>
                                        <img
                                            // 
                                            src={src}
                                            onLoad={imageOnLoad}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => this.handleImageChange()}>Select</Button>
                    <Button variant='text' onClick={() => this.props.onDialogClose()}>Cancel</Button>
                </DialogActions>
            </>
        )
    }
}