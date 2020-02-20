import * as React from 'react'

import { toHex } from '../../../src/util'
import Pewter, { getImageData } from '../../../src/Pewter'
import Cluster from '../../../src/Cluster/Cluster'

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
            this.setState({ data: getImageData(image)})
        }
        image.src = 'demo/src/assets/images/image3.jpg'
    }

    render() {
        const img = new Image()
        // console.log('STATE:', this.state)
        const pewter = new Pewter(this.state.data)
        return (
            <>
                <h6>pewter v2</h6>
                <img src='demo/src/assets/images/image3.jpg' />
                <div>
                    {pewter.getClusters().map((cluster: Cluster) => {
                        const style: React.CSSProperties = {
                            backgroundColor: toHex(cluster.getValue())
                        }
                        console.log('style:', style)
                        return (
                            <div className='swatch' style={style} />
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Demo
