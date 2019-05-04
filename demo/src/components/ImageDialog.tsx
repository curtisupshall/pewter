import * as React from 'react'

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
                        <img src={this.props.src} />
                        <ul>
                            {this.props.demoImages.map((demoImage: string) => (
                                <li><img src={`src/assests/images/${demoImage}`} /></li>
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