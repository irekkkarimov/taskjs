const getFrameWithBiggestHeight = (frames) => {
    let maxHeight = 0
    let maxHeightFrame;
    frames.forEach(i => {
        if (i.allHeight > maxHeight) {
            maxHeightFrame = i
            maxHeight = i.allHeight
        }
    })
    return maxHeightFrame
}

const getFrameWithLeastHeight = (frames) => {
    let minHeight = 1000000
    let minHeightFrame;

    frames.forEach(i => {
        if (i.allHeight < minHeight) {
            minHeightFrame = i
            minHeight = i.allHeight
        }
    })

    return minHeightFrame
}

const getFrameWithBiggestWidth = (frames) => {
    let maxWidth = 0
    let maxWidthFrame;
    frames.forEach(i => {
        if (i.allWidth > maxWidth) {
            maxWidthFrame = i
            maxWidth = i.allWidth
        }
    })
    return maxWidthFrame
}

const getFrameWithLeastWidth = (frames) => {
    let minWidth = 1000000
    let minWidthFrame;

    frames.forEach(i => {
        if (i.allWidth < minWidth) {
            minWidthFrame = i
            minWidth = i.allWidth
        }
    })
    return minWidthFrame
}