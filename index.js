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
        let sumOfChildWidths = 0

        let maxHeight = getFrameWithBiggestHeight(this.childElements).element.height

        this.element.height = maxHeight

        this.childElements.forEach(i => {
            i.initRatio()
            i.setHeight(maxHeight)
            sumOfChildWidths += i.element.width
        })
        this.element.width = sumOfChildWidths
    }

    setWidth(width) {
        this.adjustByWidth(width)
    }

    fillGaps() {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV')
                i.fillGaps()
        })

        let highestFrame = getFrameWithBiggestHeight(this.childElements)
        let height = highestFrame.element.height

        this.childElements.forEach(i => {
            if (i.element.height !== height) {
                if (i.element.hasAttribute('src'))
                    i.element.height = height
                else
                    i.setOnlyHeight(height)
            }
        })
    }

    setOnlyWidth(width) {
        let elementWidth = this.element.width
        let highestRatioFrame;
        let highestRatio = 0

        this.childElements.forEach(i => {
            let ratio = parseFloat(i.element.width / i.element.height)
            if (ratio > highestRatio) {
                highestRatioFrame = i
                highestRatio = ratio
            }
        })

        let newWidestFrameWidth  = highestRatioFrame.element.width + (width - elementWidth)

        if (highestRatioFrame.element.hasAttribute('src')) {
            highestRatioFrame.element.width = newWidestFrameWidth
        }
        else {
            highestRatioFrame.setOnlyWidth(newWidestFrameWidth)
        }

        this.element.width = width
        this.element.style.maxWidth = `${this.element.width}px`
    }

    setOnlyHeight(height) {
        this.childElements.forEach(i => {
            if (i.element.hasAttribute('src'))
                i.element.height = height
            else
                i.setOnlyHeight(height)
        })

        this.element.height = height
        this.element.style.maxHeight = `${this.element.height}px`
    }

    makeRectangle() {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV') {
                i.makeRectangle()
            } else {
                i.initRatio()
            }
        })

        let highestElement = getFrameWithBiggestHeight(this.childElements)

        // Adjusting all frames to the same maxHeight
        let maxHeight = highestElement.element.height
        let sumOfChildrenWidths = 0
        this.childElements.forEach(i => {
            i.setHeight(maxHeight)
            sumOfChildrenWidths += i.element.width
        })

        this.element.width = sumOfChildrenWidths
        this.element.height = maxHeight
    }

    adjustByWidth(width) {
        // if (this.element.id === 'main')
        this.makeRectangle()

        // return

        // Reducing children widths till the current row's width reaches the needed width
        let highestElement = getFrameWithBiggestHeight(this.childElements)
        if (this.element.width > width) {
            while (this.element.width > width) {
                let widthDifference = highestElement.decreaseHeight()
                this.element.width -= widthDifference
                highestElement = getFrameWithBiggestHeight(this.childElements)
                this.element.height = highestElement.element.height
            }
        } else {
            let minHeightFrame = getFrameWithLeastHeight(this.childElements)
            while (this.element.width < width) {
                let widthDifference = minHeightFrame.increaseHeight()
                this.element.width += widthDifference
                minHeightFrame = getFrameWithLeastHeight(this.childElements)
                this.element.height = getFrameWithBiggestHeight(this.childElements).element.height
            }
        }


        //
        // Settings width and border to row
        this.element.style.maxWidth = `${this.element.width}px`
        if (this.id === 'main') {
            this.element.style.border = '1px solid darkcyan'
            console.log(this.element.width)
        }
    }

    decreaseWidth() {
        let heightBefore = this.element.height
        let frame = getFrameWithBiggestHeight(this.childElements)
        frame.decreaseWidth()
        this.element.width--
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.element.height = currentFrameWithBiggestHeight.element.height
        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        return heightBefore - this.element.height
    }

    decreaseHeight() {
        let heightDifference = 0
        let widthBefore = this.element.width
        while (heightDifference === 0) {
            let heightBefore = this.element.height
            let maxHeightFrame = getFrameWithBiggestHeight(this.childElements)
            let widthDifference = maxHeightFrame.decreaseHeight()
            maxHeightFrame = getFrameWithBiggestHeight(this.childElements)
            this.element.width -= widthDifference
            this.element.height = maxHeightFrame.element.height
            this.element.style.maxWidth = `${this.element.width}px`
            this.element.style.maxHeight = `${this.element.height}px`
            heightDifference = heightBefore - this.element.height
        }

        return widthBefore - this.element.width
    }

    increaseHeight() {
        let heightDifference = 0
        let widthBefore = this.element.width
        while (heightDifference === 0) {
            let heightBefore = this.element.height
            let minHeightFrame = getFrameWithLeastHeight(this.childElements)
            let widthDifference = minHeightFrame.increaseHeight()
            this.element.width += widthDifference
            this.element.height = getFrameWithBiggestHeight(this.childElements).element.height
            this.element.style.maxWidth = `${this.element.width}px`
            this.element.style.maxHeight = `${this.element.height}px`
            heightDifference = this.element.height - heightBefore
        }

        return this.element.width - widthBefore
    }

    increaseWidth() {
        let heightBefore = this.element.height
        let frame = getFrameWithLeastHeight(this.childElements)
        frame.increaseWidth()
        this.element.width++
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.element.height = currentFrameWithBiggestHeight.element.height
        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        return this.element.height - heightBefore
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

    fillGaps() {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV')
                i.fillGaps()
        })

        let widestFrame = getFrameWithBiggestWidth(this.childElements)
        let maxWidth = widestFrame.element.width

        this.childElements.forEach(i => {
            if (i.element.width < maxWidth) {
                if (i.element.hasAttribute('src'))
                    i.element.width = maxWidth
                else
                    i.setOnlyWidth(maxWidth)
            }
        })
    }

    setOnlyHeight(height) {
        let elementHeight = this.element.height
        let lowestRatioFrame;
        let lowestRatio = 1000

        this.childElements.forEach(i => {
            let ratio = parseFloat(i.element.width / i.element.height)
            if (ratio < lowestRatio) {
                lowestRatioFrame = i
                lowestRatio = ratio
            }
        })

        let newLowestFrameHeight = lowestRatioFrame.element.height + (height - elementHeight)
        if (lowestRatioFrame.element.hasAttribute('src')) {
            lowestRatioFrame.element.height = newLowestFrameHeight
        }
        else {
            lowestRatioFrame.setOnlyHeight(newLowestFrameHeight)
        }

        this.element.height = height
        this.element.style.maxHeight = `${this.element.height}px`
    }

    setOnlyWidth(width) {
        this.childElements.forEach(i => {
            if (i.element.hasAttribute('src'))
                i.element.width = width
            else
                i.setOnlyWidth(width)
        })

        this.element.width = width
        this.element.style.maxWidth = `${this.element.width}px`
    }

    makeRectangle() {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV') {
                i.makeRectangle()
            } else {
                i.initRatio()
            }
        })
        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        let maxWidth = maxWidthFrame.element.width

        let sumOfChildHeights = 0
        this.childElements.forEach(i => {
            i.setWidth(maxWidth)
            sumOfChildHeights += i.element.height
        })

        this.element.height = sumOfChildHeights
        this.element.width = maxWidth
    }

    setHeight(height) {
        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        if (this.element.height > height) {
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
        this.makeRectangle()

        if (this.element.width > width) {
            let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            while (this.element.width > width) {
                let heightDifference = maxWidthFrame.decreaseWidth()
                this.element.height = this.element.height - heightDifference
                maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
                this.element.width = maxWidthFrame.element.width
            }
        } else {
            let minWidthFrame = getFrameWithLeastWidth(this.childElements)
            while (this.element.width < width) {
                let heightDifference = minWidthFrame.increaseWidth()
                this.element.height += heightDifference
                minWidthFrame = getFrameWithLeastWidth(this.childElements)
                this.element.width = getFrameWithBiggestWidth(this.childElements).element.width
            }
        }

        console.log(this.element.width)
        this.element.width = getFrameWithBiggestWidth(this.childElements).element.width
        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        this.element.style.border = '1px solid darkcyan'
    }

    decreaseHeight() {

        let widthBefore = this.element.width
        let frame = getFrameWithBiggestWidth(this.childElements)
        this.element.height--
        frame.decreaseHeight()
        console.log(this.childElements)
        let currentFrameWithBiggestWidth = getFrameWithBiggestWidth(this.childElements)
        this.element.width = currentFrameWithBiggestWidth.element.width
        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        return widthBefore - this.element.width
    }

    decreaseWidth() {
        let widthDifference = 0
        let heightBefore = this.element.height
        while (widthDifference === 0) {
            let widthBefore = this.element.width
            let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            let heightDifference = maxWidthFrame.decreaseWidth()
            maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            this.element.height -= heightDifference
            this.element.width = maxWidthFrame.element.width
            this.element.style.maxWidth = `${this.element.width}px`
            this.element.style.maxHeight = `${this.element.height}px`
            widthDifference = widthBefore - this.element.width
        }
        return heightBefore - this.element.height
    }

    increaseHeight() {
        let widthBefore = this.element.width
        let frame = getFrameWithLeastWidth(this.childElements)
        this.element.height++
        frame.increaseHeight()
        this.element.width = getFrameWithBiggestWidth(this.childElements).element.width
        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.maxHeight = `${this.element.height}px`
        // throw new Error('idi nahui')
        // if (this.element.height > 5000)
        //     throw new Error('idi nahui')
        return this.element.width - widthBefore
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
        let widthBefore = this.element.width
        this.element.height--
        this.element.width = Math.ceil(parseFloat(this.element.height * this.ratio))
        return widthBefore - this.element.width
    }

    decreaseWidth() {
        let heightBefore = this.element.height
        this.element.width--
        this.element.height = Math.ceil(parseFloat(this.element.width * this.reverseRatio))
        return heightBefore - this.element.height
    }

    increaseWidth() {
        let heightBefore = this.element.height
        this.element.width++
        this.element.height = Math.ceil(parseFloat(this.element.width * this.reverseRatio))
        // debugger;
        return this.element.height - heightBefore
    }

    increaseHeight() {
        let widthBefore = this.element.width
        this.element.height++
        this.element.width = Math.ceil(parseFloat(this.element.height * this.ratio))
        // debugger;
        return this.element.width - widthBefore
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

    // frames.forEach(i =>
    //     console.log(i.element.width))

    frames.forEach(i => {
        if (i.element.width < minWidth) {
            minWidthFrame = i
            minWidth = i.element.width
        }
    })
    return minWidthFrame
}

let r;
let c;

const testAll1 = () => {
    let img1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let img2 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let img3 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let img4 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    let img5 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let img6 = img('https://img.freepik.com/free-photo/fluffy-kitten-sitting-grass-staring-sunset-playful-generated-by-artificial-intelligence_25030-67836.jpg')
    let img7 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*')
    let img8 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let rc = new row()
    let cr = new column()
    c = new column()
    r = new row('main')

    rc.add(img2).add(img3)
    cr.add(img7).add(img8)
    rc.add(cr)

    c.add(img5).add(rc).add(img6)
    r.add(img1).add(c).add(img4)

    showStoryboard(r, 'images')
}

const testAll2 = () => {
    let sideImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let sideImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let colImg1 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let colImg2 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    let colRowImg1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let colRowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let colRowColImg1 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*')
    let colRowColImg2 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let cr = new row()
    let crc = new column()
    c = new column()
    r = new row('main')

    crc.add(colRowColImg1).add(colRowColImg2)
    cr.add(colRowImg1).add(colRowImg2).add(crc)
    c.add(colImg1).add(cr).add(colImg2)
    r.add(sideImg1).add(c).add(sideImg2)

    showStoryboard(r, 'images')
}

const testAll3 = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowColImg1 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let rowColImg2 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    let rowColRowImg1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let rowColRowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let colImg1 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*')
    let colImg2 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let rcr = new row()
    let rc = new column()
    c = new column('main')
    r = new row()

    rcr.add(rowColRowImg1).add(rowColRowImg2)
    rc.add(rowColImg1).add(rcr).add(rowColImg2)
    r.add(rowImg1).add(rc).add(rowImg2)
    c.add(colImg1).add(r).add(colImg2)

    showStoryboard(c, 'images')
}

const testAll4 = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowColImg1 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let rowColImg2 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    let rowColRowImg1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let rowColRowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let colImg1 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*')
    let colImg2 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let rcr = new row()
    let rc1 = new column()
    let rc2 = new column()
    c = new column('main')
    r = new row()

    rcr.add(rowColRowImg1).add(rowColRowImg2)
    rc1.add(rowColImg1).add(rcr).add(rowColImg2)
    rc2.add(rowImg1).add(rowImg2)
    r.add(rc1).add(rc2)
    c.add(colImg1).add(r).add(colImg2)

    showStoryboard(c, 'images')
}

const columnRowWithOnlyColumn = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let colImg1 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg')
    let colImg2 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let rc = new column()
    c = new column('main')
    r = new row()

    rc.add(rowImg1).add(rowImg2)
    r.add(rc)
    c.add(colImg1).add(r).add(colImg2)
    showStoryboard(c, 'images')
}

const rowColWithOnlyRow = () => {
    let rowColRowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowColRowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg1 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg')
    let rowImg2 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let cr = new row()
    c = new column()
    r = new row('main')

    cr.add(rowColRowImg1).add(rowColRowImg2)
    c.add(cr)
    r.add(rowImg1).add(c).add(rowImg2)
    showStoryboard(r, 'images')
}

const rowIncrease = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    c = new column('main')
    r = new row()

    r.add(rowImg1).add(rowImg2)
    c.add(r)
    showStoryboard(c, 'images')
}

const columnIncrease = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    c = new column()
    r = new row('main')

    c.add(rowImg1).add(rowImg2)
    r.add(c)
    showStoryboard(r, 'images')
}

let drawRow = () => {
    let toFillGaps = document.getElementById('toFillGaps').value === 'on'
    let width = parseInt(document.getElementById('width').value)
    drawStoryboard(r, {width: width})
    if (toFillGaps)
        r.fillGaps()
}

let drawCol = () => {
    let width = parseInt(document.getElementById('width').value)
    let toFillGaps = document.getElementById('toFillGaps').value === 'on'
    drawStoryboard(c, {width: width})
    if (toFillGaps)
        c.fillGaps()
}