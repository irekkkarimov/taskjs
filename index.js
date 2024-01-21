class row {
    id = ''
    element
    childElements
    allWidth
    allHeight

    constructor(id) {
        this.element = document.createElement('div')
        if (id !== undefined && id !== null) {
            this.id = id
            console.log(this.id)
        }
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

    UpdateSize() {
        this.allHeight = this.element.height
        this.allWidth = this.element.width
    }

    UpdateWidth(width) {
        this.element.width = width
        this.allWidth = this.element.width
    }

    UpdateHeight(height) {
        this.element.height = height
        this.allHeight = this.element.height
    }

    UpdateMaxSize() {
        this.element.style.maxWidth = `${this.allWidth}px`
        this.element.style.maxHeight = `${this.allHeight}px`
    }

    initRatio() {
        let sumOfChildWidths = 0
        let maxHeight = getFrameWithBiggestHeight(this.childElements).allHeight

        this.childElements.forEach(i => {

            i.initRatio()
            i.setHeight(maxHeight)
            sumOfChildWidths += i.allWidth
        })

        this.UpdateWidth(sumOfChildWidths)
        this.UpdateHeight(maxHeight)
        this.UpdateMaxSize()
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
        let height = highestFrame.allHeight

        this.childElements.forEach(i => {
            if (i.allHeight !== height) {
                if (i.element.hasAttribute('src'))
                    i.UpdateHeight(height)
                else
                    i.setOnlyHeight(height)
            }
        })
    }

    setOnlyWidth(width) {
        let elementWidth = this.allWidth
        let highestRatioFrame;
        let highestRatio = 0

        this.childElements.forEach(i => {
            let ratio = parseFloat(i.allWidth / i.allHeight)
            if (ratio > highestRatio) {
                highestRatioFrame = i
                highestRatio = ratio
            }
        })

        let newWidestFrameWidth = highestRatioFrame.allWidth + (width - elementWidth)

        if (highestRatioFrame.element.hasAttribute('src')) {
            highestRatioFrame.UpdateWidth(newWidestFrameWidth)
        } else {
            highestRatioFrame.setOnlyWidth(newWidestFrameWidth)
        }

        this.UpdateWidth(width)
        this.UpdateMaxSize()
    }

    setOnlyHeight(height) {
        this.childElements.forEach(i => {
            if (i.element.hasAttribute('src'))
                i.UpdateHeight(height)
            else
                i.setOnlyHeight(height)
        })

        this.UpdateHeight(height)
        this.UpdateMaxSize()
    }

    makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft) {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV') {
                i.makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft)
            } else {
                i.initRatio(paddingTop, paddingRight, paddingBottom, paddingLeft)
            }
        })

        let highestElement = getFrameWithBiggestHeight(this.childElements)
        // Adjusting all frames to the same maxHeight
        let maxHeight = highestElement.allHeight
        let sumOfChildrenWidths = 0
        this.childElements.forEach(i => {
            i.setHeight(maxHeight)
            sumOfChildrenWidths += i.allWidth
        })

        this.UpdateWidth(sumOfChildrenWidths)
        this.UpdateHeight(maxHeight)
        this.UpdateMaxSize()
    }

    adjustByWidth(width, paddingTop, paddingRight, paddingBottom, paddingLeft) {
        if (this.element.id === 'main')
            this.makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft)

        // Reducing children widths till the current row's width reaches the needed width
        let highestElement = getFrameWithBiggestHeight(this.childElements)
        if (this.allWidth > width) {
            while (this.allWidth > width) {
                let widthDifference = highestElement.decreaseHeight()
                this.element.width -= widthDifference
                this.UpdateSize()
                highestElement = getFrameWithBiggestHeight(this.childElements)
                this.UpdateHeight(highestElement.allHeight)
                this.UpdateMaxSize()
            }
        } else {
            let minHeightFrame = getFrameWithLeastHeight(this.childElements)
            while (this.allWidth < width) {
                console.log(this)
                let widthDifference = minHeightFrame.increaseHeight()
                this.element.width += widthDifference
                this.UpdateSize()
                minHeightFrame = getFrameWithLeastHeight(this.childElements)
                this.UpdateHeight(getFrameWithBiggestHeight(this.childElements).allHeight)
                this.UpdateMaxSize()
            }
        }

        // Settings width and border to row
        this.UpdateMaxSize()
        if (this.id === 'main') {
            this.element.style.border = '1px solid darkcyan'
            this.element.style.backgroundColor = '#000'
            console.log(this.allWidth)
        }
    }

    decreaseWidth() {
        let heightBefore = this.allHeight
        let frame = getFrameWithBiggestHeight(this.childElements)
        console.log(frame)
        frame.decreaseWidth()
        console.log(frame)
        this.element.width--
        this.UpdateSize()
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        console.log(currentFrameWithBiggestHeight)
        console.log(frame.allWidth)
        console.log(this.element.width)
        this.UpdateHeight(currentFrameWithBiggestHeight.allHeight)
        this.UpdateMaxSize()
        return heightBefore - this.allHeight
    }

    decreaseHeight() {
        let heightDifference = 0
        let widthBefore = this.allWidth
        while (heightDifference === 0) {
            let heightBefore = this.allHeight
            let maxHeightFrame = getFrameWithBiggestHeight(this.childElements)
            let widthDifference = maxHeightFrame.decreaseHeight()
            maxHeightFrame = getFrameWithBiggestHeight(this.childElements)
            this.element.width -= widthDifference
            this.UpdateSize()
            this.UpdateHeight(maxHeightFrame.allHeight)
            this.UpdateMaxSize()
            heightDifference = heightBefore - this.allHeight
        }

        return widthBefore - this.allWidth
    }

    increaseHeight() {
        let heightDifference = 0
        let widthBefore = this.allWidth
        while (heightDifference === 0) {
            let heightBefore = this.allHeight
            let minHeightFrame = getFrameWithLeastHeight(this.childElements)
            let widthDifference = minHeightFrame.increaseHeight()
            this.element.width += widthDifference
            this.UpdateSize()
            this.UpdateHeight(getFrameWithBiggestHeight(this.childElements).allHeight)
            this.UpdateMaxSize()
            heightDifference = this.allHeight - heightBefore
        }

        return this.allWidth - widthBefore
    }

    increaseWidth() {
        let heightBefore = this.allHeight
        let frame = getFrameWithLeastHeight(this.childElements)
        frame.increaseWidth()
        this.element.width++
        this.UpdateSize()
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.UpdateHeight(currentFrameWithBiggestHeight.allHeight)
        this.UpdateMaxSize()
        return this.allHeight - heightBefore
    }
}


class column {
    id
    element
    childElements
    allHeight = 0
    allWidth = 0

    constructor(id) {
        this.element = document.createElement('div')
        if (id !== undefined && id !== null) {
            this.id = id
            console.log(this.id)
        }
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

    UpdateSize() {
        this.allHeight = this.element.height
        this.allWidth = this.element.width
    }

    UpdateWidth(width) {
        this.element.width = width
        this.allWidth = this.element.width
    }

    UpdateHeight(height) {
        this.element.height = height
        this.allHeight = this.element.height
    }

    UpdateMaxSize() {
        this.element.style.maxWidth = `${this.allWidth}px`
        this.element.style.maxHeight = `${this.allHeight}px`
    }

    initRatio() {
        let sumOfChildHeights = 0
        this.childElements.forEach(i => {
            i.initRatio()
            sumOfChildHeights += i.allHeight
        })
        this.UpdateHeight(sumOfChildHeights)
        this.UpdateMaxSize()
    }

    fillGaps() {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV')
                i.fillGaps()
        })

        let widestFrame = getFrameWithBiggestWidth(this.childElements)
        let maxWidth = widestFrame.allWidth

        this.childElements.forEach(i => {
            if (i.allWidth < maxWidth) {
                if (i.element.hasAttribute('src'))
                    i.UpdateWidth(maxWidth)
                else
                    i.setOnlyWidth(maxWidth)
            }
        })
    }

    setOnlyHeight(height) {
        let elementHeight = this.allHeight
        let lowestRatioFrame;
        let lowestRatio = 1000

        this.childElements.forEach(i => {
            let ratio = parseFloat(i.allWidth / i.allHeight)
            if (ratio < lowestRatio) {
                lowestRatioFrame = i
                lowestRatio = ratio
            }
        })

        let newLowestFrameHeight = lowestRatioFrame.allHeight + (height - elementHeight)
        if (lowestRatioFrame.element.hasAttribute('src')) {
            lowestRatioFrame.UpdateHeight(newLowestFrameHeight)
        } else {
            lowestRatioFrame.setOnlyHeight(newLowestFrameHeight)
        }

        this.UpdateHeight(height)
        this.UpdateMaxSize()
    }

    setOnlyWidth(width) {
        this.childElements.forEach(i => {
            if (i.element.hasAttribute('src'))
                i.UpdateWidth(width)
            else
                i.setOnlyWidth(width)
        })

        this.UpdateWidth(width)
        this.UpdateMaxSize()
    }

    makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft) {
        this.childElements.forEach(i => {
            if (i.element.tagName === 'DIV') {
                i.makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft)
            } else {
                i.initRatio(paddingTop, paddingRight, paddingBottom, paddingLeft)
            }
        })

        console.log('pizda3')
        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        let maxWidth = maxWidthFrame.allWidth
        let sumOfChildHeights = 0
        this.childElements.forEach(i => {
            i.setWidth(maxWidth)
            sumOfChildHeights += i.allHeight
        })
        console.log(this)
        this.UpdateHeight(sumOfChildHeights)
        this.UpdateWidth(maxWidth)
        this.UpdateMaxSize()
    }

    setHeight(height) {
        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        if (this.allHeight > height) {
            while (this.allHeight > height) {
                let difference = maxWidthFrame.decreaseHeight()
                this.element.width -= difference
                this.element.height--
                this.UpdateSize()
                this.UpdateMaxSize()
                maxWidthFrame = getFrameWithLeastWidth(this.childElements)
            }
        } else {
            let minWidthFrame = getFrameWithLeastWidth(this.childElements)
            while (this.allHeight < height) {
                let difference = minWidthFrame.increaseHeight()
                this.element.width += difference
                this.element.height++
                this.UpdateSize()
                this.UpdateMaxSize()
                minWidthFrame = getFrameWithLeastWidth(this.childElements)
            }
        }

        this.UpdateMaxSize()
    }

    adjustByWidth(width, paddingTop, paddingRight, paddingBottom, paddingLeft) {
        console.log(paddingBottom)
        this.makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft)

        if (this.allWidth > width) {
            let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            while (this.allWidth > width) {
                console.log('pizda')
                let heightDifference = maxWidthFrame.decreaseWidth()
                this.element.height -= heightDifference
                this.UpdateSize()
                maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
                this.UpdateWidth(maxWidthFrame.allWidth)
                this.UpdateMaxSize()
            }
        } else {
            let minWidthFrame = getFrameWithLeastWidth(this.childElements)
            while (this.allWidth < width) {
                console.log('pizda')
                let heightDifference = minWidthFrame.increaseWidth()
                this.element.height += heightDifference
                this.UpdateSize()
                minWidthFrame = getFrameWithLeastWidth(this.childElements)
                this.UpdateWidth(getFrameWithBiggestWidth(this.childElements).allWidth)
                this.UpdateMaxSize()
            }
        }

        let maxWidthFrame =  getFrameWithBiggestWidth(this.childElements)
        this.UpdateWidth(maxWidthFrame.allWidth)
        this.UpdateMaxSize()
        if (this.id === 'main') {
            this.element.style.border = '1px solid darkcyan'
            this.element.style.backgroundColor = '#000'
            console.log(this.allWidth)
        }
    }

    decreaseHeight() {

        let widthBefore = this.allWidth
        let frame = getFrameWithBiggestWidth(this.childElements)
        frame.decreaseHeight()
        this.element.height--
        this.UpdateSize()
        let currentFrameWithBiggestWidth = getFrameWithBiggestWidth(this.childElements)
        this.UpdateWidth(currentFrameWithBiggestWidth.allWidth)
        this.UpdateMaxSize()
        return widthBefore - this.allWidth
    }

    decreaseWidth() {
        let widthDifference = 0
        let heightBefore = this.allHeight
        while (widthDifference === 0) {
            let widthBefore = this.allWidth
            let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            let heightDifference = maxWidthFrame.decreaseWidth()
            maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            this.element.height -= heightDifference
            this.UpdateSize()
            this.UpdateWidth(maxWidthFrame.allWidth)
            this.UpdateMaxSize()
            widthDifference = widthBefore - this.allWidth
        }
        return heightBefore - this.allHeight
    }

    increaseHeight() {
        let widthBefore = this.allWidth
        let frame = getFrameWithLeastWidth(this.childElements)
        frame.increaseHeight()
        this.element.height++
        this.UpdateSize()
        this.UpdateWidth(getFrameWithBiggestWidth(this.childElements).allWidth)
        this.UpdateMaxSize()
        return this.allWidth - widthBefore
    }
}


class image {
    element
    ratio
    reverseRatio
    heightPaddings = 0
    widthPaddings = 0
    allHeight = 0
    allWidth = 0

    constructor(uri) {
        this.element = document.createElement('img')
        this.element.setAttribute('src', uri)
        this.element.style.alignSelf = 'start'
    }

    UpdateSize() {
        this.allHeight = this.element.height + this.heightPaddings
        this.allWidth = this.element.width + this.widthPaddings
    }

    UpdateWidth(width) {
        this.element.width = width - this.widthPaddings
        this.allWidth = width
    }

    UpdateHeight(height) {
        this.element.height = height - this.heightPaddings
        this.allHeight = height
    }

    initRatio(paddingTop, paddingRight, paddingBottom, paddingLeft) {
        if (paddingTop !== 0) {
            this.element.style.paddingTop = `${paddingTop}px`
        }
        if (paddingRight !== 0) {
            this.element.style.paddingRight = `${paddingRight}px`
        }
        if (paddingBottom !== 0) {
            this.element.style.paddingBottom = `${paddingBottom}px`
        }
        if (paddingLeft !== 0) {
            this.element.style.paddingLeft = `${paddingLeft}px`
        }

        this.heightPaddings += paddingTop
        this.heightPaddings += paddingBottom
        this.widthPaddings += paddingRight
        this.widthPaddings += paddingLeft
        this.UpdateSize()
        this.ratio = parseFloat(this.element.width / this.element.height)
        this.reverseRatio = parseFloat(this.element.height / this.element.width)
    }

    setHeight(height) {
        this.UpdateHeight(height)
        this.UpdateWidth(Math.ceil(parseFloat(this.element.height * this.ratio)))
    }

    setWidth(width) {
        this.UpdateWidth(width)
        this.UpdateHeight(Math.ceil(parseFloat(this.element.width * this.reverseRatio)))
    }

    decreaseHeight() {
        let widthBefore = this.allWidth
        this.element.height--
        this.element.width = Math.ceil(parseFloat(this.element.height * this.ratio))
        this.UpdateSize()
        return widthBefore - this.allWidth
    }

    decreaseWidth() {
        let heightBefore = this.allHeight
        this.element.width--
        this.element.height = Math.ceil(parseFloat(this.element.width * this.reverseRatio))
        this.UpdateSize()
        return heightBefore - this.allHeight
    }

    increaseWidth() {
        let heightBefore = this.allHeight
        this.element.width++
        this.element.height = Math.ceil(parseFloat(this.element.width * this.reverseRatio))
        this.UpdateSize()
        return this.allHeight - heightBefore
    }

    increaseHeight() {
        let widthBefore = this.allWidth
        this.element.height++
        this.element.width = Math.ceil(parseFloat(this.element.height * this.ratio))
        this.UpdateSize()
        return this.allWidth - widthBefore
    }
}

let img = (filename) => {
    return new image(filename)
}

let drawStoryboard = (obj, props) => {
    let {width, paddingTop, paddingRight, paddingBottom, paddingLeft} = props

    if (paddingTop === undefined)
        paddingTop = 0
    if (paddingRight === undefined)
        paddingRight = 0
    if (paddingBottom === undefined)
        paddingBottom = 0
    if (paddingLeft === undefined)
        paddingLeft = 0

    obj.adjustByWidth(width, paddingTop, paddingRight, paddingBottom, paddingLeft)
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
        if (i.allHeight > maxHeight) {
            maxHeightFrame = i
            maxHeight = i.allHeight
        }
    })
    return maxHeightFrame
}

let getFrameWithLeastHeight = (frames) => {
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

let getFrameWithBiggestWidth = (frames) => {
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

let getFrameWithLeastWidth = (frames) => {
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
    let rowImg1 = img('./images/highcat.jpeg')
    let rowImg2 = img('./images/highcat.jpeg')
    let rowColImg1 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let rowColImg2 = img('./images/pinkcat.jpg')
    let rowColRowImg1 = img('./images/catonwhitebackground.jpg')
    let rowColRowImg2 = img('./images/highcat.jpeg')
    let colImg1 = img('./images/orangecatlying.jpg')
    let colImg2 = img('./images/littlecatsmiling.jpg')
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

const rowPadding = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let colImg1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let colImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')

    r = new row('main')
    c = new column()
    c.add(colImg1).add(colImg2)
    r.add(c)
    showStoryboard(r, 'images')
}

const drawRow = () => {
    let width = parseInt(document.getElementById('width').value)
    let toFillGaps = document.getElementById('toFillGaps').checked
    drawStoryboard(r, {
        width: width,
        // paddingTop: 5,
        // paddingRight: 10,
        // paddingBottom: 5,
        // paddingLeft: 10
    })
    if (toFillGaps) {
        r.fillGaps()
    }
}

const drawCol = () => {
    let width = parseInt(document.getElementById('width').value)
    let toFillGaps = document.getElementById('toFillGaps').checked
    drawStoryboard(c, {
        width: width,
        // paddingTop: 5,
        // paddingRight: 10,
        // paddingBottom: 5,
        // paddingLeft: 10
    })
    if (toFillGaps)
        c.fillGaps()
}

const draw = () => {
    if (r.element.id === 'main') {
        drawRow()
    }
    else {
        drawCol()
    }
}