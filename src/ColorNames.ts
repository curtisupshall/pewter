
import RGB from './RGB'

import { dictionary } from './dictionary'

export default class ColorNames {
    public names: string[]

    /**
     * 
     * @param colors An array of hexidecimal colors
     * @return A corresponding array of color names
     */
    constructor(colors: RGB[]) {
        this.names = colors.map((color: RGB) => {
            let minDistance = color.distanceTo(new RGB(dictionary[0].r, dictionary[0].g, dictionary[0].b))
            let colorName = dictionary[0].name

            for (let i = 1; i < dictionary.length; i ++) {
                let distance = color.distanceTo(new RGB(dictionary[i].r, dictionary[i].g, dictionary[i].b))
                if (distance < minDistance) {
                    minDistance = distance
                    colorName = dictionary[i].name
                }
            }

            /**
             * @TODO Instead of returning a value, need to add a field
             */
            return colorName
        })
    }
}
