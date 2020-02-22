export const MAX_DISTANCE: number = 16581375 // 255^3

export const distance = (vector1: number[], vector2: number[]): number => {
    try {
        let distance: number = 0;
        for (let i = 0; i < vector1.length; i ++) {
            distance += Math.pow(vector1[i] - vector2[i], 2) 
        }
        return distance
    } catch {
        throw new Error('Vector lengths do not agree.')
    }
}

export const mean = (set: number[][]): number[] => {
    const length: number = set.length
    if (length === 0) {
        return
    }

    let meanVector: number[] = []
    let i: number
    for (i = 0; i < set[0].length; i ++) {
        meanVector[i] = 0
    }
    for (i = 0; i < length; i ++) {
        for (let j: number = 0; j < set[i].length; j ++) {
            meanVector[j] += set[i][j]
        }
    }

    return meanVector.map((component: number) => component / length)
} 

export const fromHex = (hex: string): number[] => {
    return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
    ]
}

export const toHex = (color: number[]) => {
    console.log('color:', color)
    return `#${color[0].toString(16)}${color[1].toString(16)}${color[2].toString(16)}`
}

export const invertColors = (data: number[][][]): number[][][] => {
    if (!data) {
        return
    }
    console.log('input:', data)
    for (let i: number = 0; i < data.length; i ++) {
        for (let j: number = 0; j < data[i].length; j ++) {
            for (let k: number = 0; k < data[i][j].length; k ++) {
                const inverse: number = 255 - data[i][j][k]
                data[i][j][k] = 255//inverse
            }
        }
    }
    console.log('output:', data)

    return data
}

export const canvasWriter = (image: HTMLImageElement, input: number[][][]) => {
    if (!input) {
        return
    }
    const data: number[] = []

    for (let i: number = 0; i < input.length; i ++) {
        for (let j: number = 0; j < input[i].length; j ++) {
            data.push(...[...input[i][j], 1])
        }
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height

    const context: CanvasRenderingContext2D = canvas.getContext('2d')
    context.drawImage(image, 0, 0)

    const imageData: ImageData = context.getImageData(0, 0, image.width, image.height)
    for (let i: number = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = data[i]
    }
    context.putImageData(imageData, image.width, image.height)
}

export const bilateralFilter = () => {

}
