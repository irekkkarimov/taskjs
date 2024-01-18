class row {
    id = ''
    element
    childElements

    constructor(id) {
        this.element = document.createElement('div')
        if (id !== null)
            this.id = id
        this.element.id = this.id
        this.element.style.display = 'flex'
        this.element.style.flexDirection = 'row'
        this.element.style.alignItems = 'flex-start'
        this.childElements = []

    }

    add(frame) {
        this.element.appendChild(frame.element)
        this.childElements.push(frame)
        return this
    }

    initRatio() {
        let sumOfChildHeights = 0
        let sumOfChildWidths = 0
        this.childElements.forEach(i => {
            i.initRatio()
            sumOfChildHeights += i.element.height
            sumOfChildWidths += i.element.width
        })

        this.element.height = sumOfChildHeights
        this.element.width = sumOfChildWidths
    }

    setWidth(width) {
        // let maxHeightFrame = getFrameWithBiggestHeight()
        // let maxHeight = maxHeightFrame.element.height
        //
        // let sumOfChildWidths = 0
        // let sumOfChildHeights = 0
        //
        // this.childElements.forEach(i => {
        //     i.setWidth(maxWidth)
        //     sumOfChildWidths += i.element.width
        //     sumOfChildHeights += i.element.height
        // })
        //
        // if (this.element.width > width) {
        //     while (this.element.width > width) {
        //
        //     }
        // }
        this.adjustByWidth(width)
    }

    adjustByWidth(width) {
        this.childElements.forEach(i =>
            i.initRatio())

        let highestElement = getFrameWithBiggestHeight(this.childElements)

        // Adjusting all frames to the same height
        let height = highestElement.element.height
        this.childElements.forEach(i =>
            i.setHeight(height))

        // Setting current row's width to sum of children widths
        let sumOfChildrenWidths = 0
        this.childElements.forEach(i => {
            sumOfChildrenWidths += i.element.width
        })
        this.element.width = sumOfChildrenWidths

        // Reducing children widths till the current row's width reaches the needed width
        if (this.element.width > width) {
            while (this.element.width > width) {
                let widthDifference = highestElement.decreaseHeight()
                this.element.width -= widthDifference
                highestElement = getFrameWithBiggestHeight(this.childElements)
            }
        }
        else {
            let minHeightFrame = getFrameWithLeastHeight(this.childElements)
            while (this.element.width < width) {
                let widthDifference = minHeightFrame.increaseHeight()
                this.element.width += widthDifference
                highestElement = getFrameWithLeastHeight(this.childElements)
            }
        }


        //
        // Settings width and border to row
        this.element.style.maxWidth = `${this.element.width}px`
        if (this.id === 'main')
            this.element.style.border = '1px solid darkcyan'
        console.log(this.element.width)
    }

    decreaseWidth() {
        // let widthBefore = this.element.width
        // let frame = getFrameWithBiggestWidth(this.childElements)
        // frame.decreaseHeight()
        // this.element.height--
        // let currentFrameWithBiggestWidth = getFrameWithBiggestWidth(this.childElements)
        // this.element.width = currentFrameWithBiggestWidth.element.width
        // return parseFloat(widthBefore - this.element.width)

        let heightBefore = this.element.height
        let frame = getFrameWithBiggestHeight(this.childElements)
        frame.decreaseWidth()
        this.element.width--
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.element.height = currentFrameWithBiggestHeight.element.height
        return heightBefore - this.element.height
    }
}


class column {
    element
    childElements

    constructor() {
        this.element = document.createElement('div')
        this.element.style.display = 'flex'
        this.element.style.flexDirection = 'column'
        this.element.style.alignItems = 'flex-start'
        this.childElements = []
    }

    add(frame) {
        this.element.appendChild(frame.element)
        this.childElements.push(frame)
        return this
    }

    initRatio() {
        let sumOfChildHeights = 0
        this.childElements.forEach(i => {
            i.initRatio()
            sumOfChildHeights += i.element.height
        })

        this.element.height = sumOfChildHeights
    }

    setHeight(height) {
        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        let maxWidth = maxWidthFrame.element.width

        this.childElements.forEach(i => {
            i.setWidth(maxWidth)
        })

        let sumOfChildHeights = 0
        this.childElements.forEach(i => sumOfChildHeights += i.element.height)
        this.element.height = sumOfChildHeights

        let sumOfChildWidths = 0
        this.childElements.forEach(i => sumOfChildWidths += i.element.width)
        this.element.width = sumOfChildWidths

        if (sumOfChildHeights > height) {
            while (this.element.height > height) {
                let difference = maxWidthFrame.decreaseHeight()
                this.element.width -= difference
                this.element.height--
                maxWidthFrame = getFrameWithLeastWidth(this.childElements)
            }
        } else {
            let minWidthFrame = getFrameWithLeastWidth(this.childElements)
            while (this.element.height < height) {
                let difference = minWidthFrame.increaseHeight()
                this.element.width += difference
                this.element.height++
                minWidthFrame = getFrameWithLeastWidth(this.childElements)
            }
        }

        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        // this.element.style.border = '1px solid darkcyan'
    }

    adjustByWidth(width) {

        // let highestElement = getFrameWithBiggestHeight(this.childElements)
        let maxWidthElement = getFrameWithBiggestWidth(this.childElements)

        console.log(maxWidthElement.element.width)

        console.log(this.childElements)

        // Adjusting all frames to the same width
        let maxWidth = maxWidthElement.element.width
        this.childElements.forEach(i => {
            i.initRatio()
            i.setWidth(maxWidth)
        })

        while (maxWidthElement.element.width > width) {
            console.log(maxWidthElement.element.width)
            let heightDifference = maxWidthElement.decreaseWidth()
            console.log(maxWidthElement)
            this.element.height = this.element.height - heightDifference
            maxWidthElement = getFrameWithBiggestWidth(this.childElements)
        }

        this.childElements.forEach(i => console.log(i.element.width))
        console.log(this.element.offsetWidth)

        this.element.width = maxWidthElement.element.width

        // // Adjusting all frames to the same height
        // let height = highestElement.element.height
        // this.childElements.forEach(i => i.setHeight(height))

        // // Setting current row's width to sum of children widths
        // let sumOfChildrenWidths = 0
        // this.childElements.forEach(i => sumOfChildrenWidths += i.element.width)
        // this.element.width = sumOfChildrenWidths

        // // Reducing children widths till the current row's width reaches the needed width
        // while (this.element.width > width) {
        //     let widthDifference = highestElement.decreaseHeight()
        //     this.element.width = parseFloat(this.element.width - widthDifference)
        //     highestElement = getFrameWithBiggestHeight(this.childElements)
        // }

        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        this.element.style.border = '1px solid darkcyan'
        console.log(this.element.width)
    }

    decreaseHeight() {
        let widthBefore = this.element.width
        let frame = getFrameWithBiggestWidth(this.childElements)
        frame.decreaseHeight()
        this.element.height--
        let currentFrameWithBiggestWidth = getFrameWithBiggestWidth(this.childElements)
        this.element.width = currentFrameWithBiggestWidth.element.width
        return parseFloat(widthBefore - this.element.width)
    }

    increaseHeight() {
        let widthBefore = this.element.width
        let frame = getFrameWithLeastWidth(this.childElements)
        frame.increaseHeight()
        this.element.height++
        let currentFrameWithBiggestWidth = getFrameWithBiggestWidth(this.childElements)
        this.element.width = currentFrameWithBiggestWidth.element.width
        return parseFloat(this.element.width - widthBefore)
    }
}


class image {
    element
    ratio
    reverseRatio

    constructor(uri) {
        this.element = document.createElement('img')
        this.element.setAttribute('src', uri)
        this.element.style.alignSelf = 'start'
    }

    initRatio() {
        this.ratio = parseFloat(this.element.width / this.element.height)
        this.reverseRatio = parseFloat(this.element.height / this.element.width)
    }

    adjust(width) {
        this.element.width = width
        this.element.width = this.element.height * this.ratio
    }

    setHeight(height) {
        this.element.height = height
        this.element.width = this.element.height * this.ratio
    }

    setWidth(width) {
        this.element.width = width
        this.element.height = width * this.reverseRatio
    }

    decreaseHeight() {
        if (this.element.id === '5') {
            console.log(this.element.height)
            console.log(this.element.width)
        }
        let widthBefore = this.element.width
        this.element.height--
        this.element.width = Math.ceil(parseFloat(this.element.height * this.ratio))
        if (this.element.id === '5') {
            console.log(this.element.height)
            console.log(this.element.width)
        }
        return widthBefore - this.element.width
    }

    decreaseWidth() {
        let heightBefore = this.element.height
        this.element.width--
        this.element.height = Math.ceil(parseFloat(this.element.width * this.reverseRatio))
        console.log(this.element.height)
        return heightBefore - this.element.height
    }

    increaseHeight() {
        let widthBefore = this.element.width
        this.element.height++
        this.element.width = this.element.height * this.ratio
        return parseFloat(this.element.width - widthBefore)
    }
}

let img = (filename) => {
    return new image(filename)
}

let drawStoryboard = (obj, props) => {
    const {width} = props
    obj.adjustByWidth(width)
}

let showStoryboard = (obj, elementId) => {
    document.getElementById(elementId).appendChild(obj.element)
}

let clearElement = (elementId) => {
    document.getElementById(elementId).innerHTML = ""
}

let getFrameWithBiggestHeight = (frames) => {
    let maxHeight = 0
    let maxHeightFrame;
    frames.forEach(i => {
        if (i.element.height > maxHeight) {
            maxHeightFrame = i
            maxHeight = i.element.height
        }
    })
    return maxHeightFrame
}

let getFrameWithLeastHeight = (frames) => {
    let minHeight = 1000000
    let minHeightFrame;

    frames.forEach(i => {
        if (i.element.height < minHeight) {
            minHeightFrame = i
            minHeight = i.element.height
        }
    })

    return minHeightFrame
}

let getFrameWithBiggestWidth = (frames) => {
    let maxWidth = 0
    let maxWidthFrame;
    frames.forEach(i => {
        if (i.element.width > maxWidth) {
            maxWidthFrame = i
            maxWidth = i.element.width
        }
    })
    return maxWidthFrame
}

let getFrameWithLeastWidth = (frames) => {
    let minWidth = 1000000
    let minWidthFrame;

    frames.forEach(i => {
        if (i.element.height < minWidth) {
            minWidthFrame = i
            minWidth = i.element.width
        }
    })

    return minWidthFrame
}

let testImagePut = () => {
    let image = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    document.getElementById('root').appendChild(image.element)
}

let testRow1 = () => {
    let r = new row()
    let img1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    r.add(img1)
    let img2 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    r.add(img2)

    document.getElementById('root').appendChild(r.element)
}

let r = new row('main')
let c = new column()

let testAll1 = () => {
    let img1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    img1.element.id = '1'
    let img2 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    img2.element.id = '2'
    let img3 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    img3.element.id = '3'
    let img4 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    img4.element.id = '4'
    c.element.setAttribute('id', 'col')
    let img5 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    img5.element.id = '5'
    let img6 = img('https://img.freepik.com/free-photo/fluffy-kitten-sitting-grass-staring-sunset-playful-generated-by-artificial-intelligence_25030-67836.jpg')
    img6.element.id = '6'
    c.add(img5).add(img6)
    r.add(img1).add(img2).add(c).add(img4)

    let rc = new row()
    rc.add(img1).add(img3)
    c.add(img5).add(rc).add(img6)

    // console.log(r)
    console.log(c)
    // clearElement('root')
    // showStoryboard(r, 'images')
    showStoryboard(c, 'images')
}

let draw = () => {
    // drawStoryboard(r, {width: 1000})
    drawStoryboard(c, {width: 500})
}