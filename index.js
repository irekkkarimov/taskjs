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

        console.log(this.element.width)
        this.element.width = sumOfChildrenWidths
        this.element.height = maxHeight
    }

    adjustByWidth(width) {
        this.makeRectangle()
        // Reducing children widths till the current row's width reaches the needed width
        let highestElement = getFrameWithBiggestHeight(this.childElements)
        console.log(this.element.width)
        console.log(width)
        if (this.element.width > width) {
            while (this.element.width > width) {
                let widthDifference = highestElement.decreaseHeight()
                this.element.width -= widthDifference
                highestElement = getFrameWithBiggestHeight(this.childElements)
            }
        } else {
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
        if (this.id === 'main') {
            this.element.style.border = '1px solid darkcyan'
            console.log(this.element.width)
        }
    }

    decreaseWidth() {
        let heightBefore = this.element.height
        let frame = getFrameWithBiggestHeight(this.childElements)
        console.log(frame)
        console.log(frame.element.width)
        frame.decreaseWidth()
        console.log(frame.element.width)
        this.element.width--
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.element.height = currentFrameWithBiggestHeight.element.height
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
            heightDifference = heightBefore - this.element.height
        }

        return widthBefore - this.element.width
    }

    increaseWidth() {
        let heightBefore = this.element.height
        let frame = getFrameWithLeastHeight(this.childElements)
        frame.increaseWidth()
        this.element.width++
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.element.height = currentFrameWithBiggestHeight.element.height
        console.log(this.element.width)
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

        this.childElements.forEach(i =>
            console.log(i.element.width))

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
        console.log(this.element.width)
    }

    decreaseHeight() {

        let widthBefore = this.element.width
        let frame = getFrameWithBiggestWidth(this.childElements)
        frame.decreaseHeight()
        this.element.height--
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
            widthDifference = widthBefore - this.element.width
        }
        console.log(widthDifference)
        return heightBefore - this.element.height
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
        console.log(this.element)
        console.log(this.element.width)
        this.element.width++
        console.log(this.element.width)
        this.element.height = Math.ceil(parseFloat(this.element.width * this.reverseRatio))
        return this.element.height - heightBefore
    }

    increaseHeight() {
        let widthBefore = this.element.width
        this.element.height++
        this.element.width = Math.ceil(parseFloat(this.element.height * this.ratio))
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
    console.log(minWidthFrame)
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
    let img6 = img('https://img.freepik.com/free-photo/fluffy-kitten-sitting-grass-staring-sunset-playful-generated-by-artificial-intelligence_25030-67836.jpg')
    let img7 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*')
    let img8 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')
    let rc = new row()
    rc.add(img2).add(img3)
    let cr = new column()
    cr.add(img7).add(img8)
    rc.add(cr)

    c.add(img5).add(rc).add(img6)
    r.add(img1).add(c).add(img4)

    // c.add(img5).add(r).add(img6)

    console.log(r)
    // console.log(c)
    // clearElement('root')
    showStoryboard(r, 'images')
    // showStoryboard(c, 'images')
}

let testAll2 = () => {
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

    crc.add(colRowColImg1).add(colRowColImg2)

    cr.add(colRowImg1).add(colRowImg2).add(crc)

    c.add(colImg1).add(cr).add(colImg2)

    r.add(sideImg1).add(c).add(sideImg2)

    showStoryboard(r, 'images')
}

let testAll3 = () => {
    let rowImg1 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let rowColImg1 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    let rowColImg2 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    let rowColRowImg1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    let rowColRowImg2 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    let colImg1 = img('https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*')
    let colImg2 = img('https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg')

    let rcr = new row()
    rcr.add(rowColRowImg1).add(rowColRowImg2)
    let rc = new column()
    rc.add(rowColImg1).add(rcr).add(rowColImg2)
    r.add(rowImg1).add(rc).add(rowImg2)
    c.add(colImg1).add(r).add(colImg2)

    showStoryboard(c, 'images')
}

let drawRow = () => {
    drawStoryboard(r, {width: 2000})
    // drawStoryboard(c, {width: 1000})
}

let drawCol = () => {
    drawStoryboard(c, {width: 1000})

}