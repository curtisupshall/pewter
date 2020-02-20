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
    let meanVector: number[] = []
    const count: number = set.length
    for (let i: number = 0; i < meanVector.length; i ++) {
        meanVector[i] = 0
    }
    for (let i: number = 0; i < count; i ++) {
        for (let j: number = 0; j < set[i].length; i ++) {
            meanVector[j] += set[i][j]
        }
    }
    return meanVector.map((component: number) => component / count)
} 

export const fromHex = (hex: string): number[] => {
    return [
        parseInt(hex.substr(0, 2), 16),
        parseInt(hex.substr(2, 2), 16),
        parseInt(hex.substr(4, 2), 16)
    ]
}
