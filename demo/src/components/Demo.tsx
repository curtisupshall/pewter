import * as React from 'react'

import { toHex, invertColors } from '../../../src/util'
import Pewter, { getImageData } from '../../../src/Pewter'
import Cluster from '../../../src/Cluster/Cluster'

interface IState {
    data: number[][]
    imageLoaded: boolean
}

class Demo extends React.Component<{}, IState> {
    state: IState = {
        data: [],
        imageLoaded: false
    }
    imageRef: React.RefObject<HTMLImageElement> = React.createRef()
    // canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef()


    componentDidMount() {
        const image = this.imageRef.current
        image.src = 'demo/src/assets/images/image3.jpg'
        image.onload = () => {
            if (this.state.imageLoaded) {
                return
            }
            this.setState({ imageLoaded: true }, () => {
                console.log('Image loaded.')
                const { width, height } = image
                const canvas: HTMLCanvasElement = document.createElement('canvas')
                // console.log(canvas.toDataURL())
    
                // canvas writer
                const data: number[] = []
                const input = invertColors(getImageData(image))
                for (let i: number = 0; i < input.length; i ++) {
                    for (let j: number = 0; j < input[i].length; j ++) {
                        data.push(...[...input[i][j], 255])
                        // data.push(...[255, 0, 0, 255]) // TEST ONLY
                    }
                }
    
                const context: CanvasRenderingContext2D  = canvas.getContext('2d')
                canvas.width = width
                canvas.height = height
    
                const newData: ImageData = new ImageData(Uint8ClampedArray.from(data), width, height)
                console.log('newData:', newData)

                context.putImageData(newData, 0, 0)
                // console.log(canvas.toDataURL())
                image.src = canvas.toDataURL()
            })
        }
    }

    render() {
        const pewter = new Pewter(this.state.data)
        return (
            <>
                <img ref={this.imageRef}/>
                <h6>pewter v2</h6>
                <div>
                    {pewter.getClusters().map((cluster: Cluster) => {
                        const style: React.CSSProperties = {
                            backgroundColor: toHex(cluster.getValue())
                        }
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
