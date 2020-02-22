import * as React from 'react'

import { toHex, canvasWriter, invertColors } from '../../../src/util'
import Pewter, { getImageData } from '../../../src/Pewter'
import Cluster from '../../../src/Cluster/Cluster'

interface IState {
    data: number[][]
}

class Demo extends React.Component<{}, IState> {
    state: IState = {
        data: []
    }
    imageRef: React.RefObject<HTMLImageElement> = React.createRef()

    componentDidMount() {

        this.imageRef.current.onload = () => {
            console.log('Image loaded.')
            // this.setState({ data: getImageData(image)})

            canvasWriter(this.imageRef.current, invertColors(getImageData(this.imageRef.current)))
            this.forceUpdate()
        }
        this.imageRef.current.src = 'demo/src/assets/images/image3.jpg'
    }

    render() {
        const pewter = new Pewter(this.state.data)
        return (
            <>
                <h6>pewter v2</h6>
                <img ref={this.imageRef} />
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
