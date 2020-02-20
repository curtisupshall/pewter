import * as React from 'react'

import { fromHex } from '../../../src/util'
import Pewter from '../../../src/Pewter'
import KMeansCluster from '../../../src/KMeansCluster'
import ImageDataHelper from '../../../src/ImageDataHelper'

interface IState {
    data: number[][]
}

class Demo extends React.Component<{}, IState> {
    state: IState = {
        data: []
    }

    componentDidMount() {
        const image: HTMLImageElement = new Image()
        image.onload = () => {
            console.log('Image loaded.')
            this.setState({ data: ImageDataHelper.getImageData(image)})
        }
        image.src = 'demo/src/assets/images/image1.jpg'
    }

    render() {
        const img = new Image()
        
        const clustere: KMeansCluster = new KMeansCluster(this.state.data)
        clustere.getClusters(2)
        const test: string = 'eed2d7'
        return (
            <>
                <h6>pewter v2</h6>
                <img src='demo/src/assets/images/image1.jpg' />
            </>
        )
    }
}

export default Demo
