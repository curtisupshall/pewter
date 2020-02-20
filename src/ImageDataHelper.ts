class ImageDataHelper {
    static getImageData = (image: HTMLImageElement): number[][] => {
        // console.log('IMG.width:', image.width)
        const data: number[][] = []

        if (image) {
            const canvas: HTMLCanvasElement = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height

            const context: CanvasRenderingContext2D = canvas.getContext('2d')
            context.drawImage(image, 0, 0)

            const imageData: Uint8ClampedArray = context.getImageData(0, 0, image.width, image.height).data
            for (let i: number = 0; i < imageData.length; i += 4) {
                const x = imageData.slice(i, i + 2)
                data.push(Array.from(imageData.slice(i, i + 2)))
            }
        }
        console.log('data:', data)
        return data
    }
}

export default ImageDataHelper
