class row {
    id = 'main'
    element
    childElements

    constructor() {
        this.element = document.createElement('div')
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

    adjust(width) {
        let highestElement = getFrameWithBiggestHeight(this.childElements)

        // Adjusting all frames to the same height
        let height = highestElement.element.height
        this.childElements.forEach(i => i.setHeight(height))

        // Setting current row's width to sum of children widths
        let sumOfChildrenWidths = 0
        this.childElements.forEach(i => sumOfChildrenWidths += i.element.width)
        this.element.width = sumOfChildrenWidths

        // Reducing children widths till the current row's width reaches the needed width
        while (this.element.width > width) {
            let widthDifference = highestElement.decreaseHeight()
            this.element.width = parseFloat(this.element.width - widthDifference)
            highestElement = getFrameWithBiggestHeight(this.childElements)
        }

        // Re-rendering row
        this.element.style.maxWidth = `${this.element.width}px`
        this.element.style.border = '1px solid darkcyan'
        this.element.innerHTML = ''
        this.childElements.forEach(i => this.element.appendChild(i.element))
        console.log(this.element.width)
    }

    setChildElementsAfterRender() {
        let r = document.getElementById(this.id)
        this.element = r
        this.childElements = []

        for (let item of r.children) {
            if ('src' in item.attributes) {
                let image = img(item.attributes['src'].value)
                image.element = item
                this.childElements.push(image)
                console.log(image)
            }
            else {
                let newColumn = new column()
                newColumn.setChildElementsAfterRender(item)
                this.childElements.push(newColumn)
            }
        }

        let sumOfChildrenWidths = 0
        this.childElements.forEach(i => sumOfChildrenWidths += i.element.width)
        this.element.width = sumOfChildrenWidths
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

    setHeight(height) {
        let minWidthFrame = getFrameWithLeastWidth(this.childElements)

        while (this.element.height < height) {
            let difference = minWidthFrame.increaseHeight()
            this.element.width += difference
            this.element.height++
            minWidthFrame = getFrameWithLeastWidth(this.childElements)
        }
    }

    adjust(width) {


        // let highestElement = getFrameWithBiggestHeight(this.childElements)
        //
        // // Adjusting all frames to the same height
        // let height = highestElement.element.height
        // this.childElements.forEach(i => i.setHeight(height))
        //
        // // Setting current row's width to sum of children widths
        // let sumOfChildrenWidths = 0
        // this.childElements.forEach(i => sumOfChildrenWidths += i.element.width)
        // this.element.width = sumOfChildrenWidths
        //
        // // Reducing children widths till the current row's width reaches the needed width
        // while (this.element.width > width) {
        //     let widthDifference = highestElement.decreaseHeight()
        //     this.element.width = parseFloat(this.element.width - widthDifference)
        //     highestElement = getFrameWithBiggestHeight(this.childElements)
        // }
        //
        // // Re-rendering row
        // this.element.style.maxWidth = `${this.element.width}px`
        // this.element.style.border = '1px solid darkcyan'
        // this.element.innerHTML = ''
        // this.childElements.forEach(i => this.element.appendChild(i.element))
        // console.log(this.element.width)
    }

    decreaseHeight() {
        let widthBefore = this.element.width
        let frame = getFrameWithBiggestHeight(this.childElements)
        frame.decreaseHeight()
        let currentFrameWithBiggestWidth = getFrameWithBiggestWidth(this.childElements)
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
        this.element.width = currentFrameWithBiggestWidth.element.width
        this.element.height = currentFrameWithBiggestHeight.element.height
        return parseFloat(widthBefore - this.element.width)
    }

    setChildElementsAfterRender(element) {
        element = document.getElementById('col')
        this.element = element
        this.childElements = []

        let img1 = document.getElementById('5')
        let img2 = document.getElementById('6')

        let img1frame = img(img1.attributes['src'])
        let img2frame = img(img2.attributes['src'])

        this.childElements.push(img1frame)
        this.childElements.push(img2frame)

        let sumOfChildrenWidths = 0
        this.childElements.forEach(i => sumOfChildrenWidths += i.element.width)
        this.childElements.forEach(i => console.log(i.element.width))

        this.element.width = sumOfChildrenWidths
        let sumOfChildrenHeights = 0
        this.childElements.forEach(i => sumOfChildrenHeights += i.element.height)
        this.element.height = sumOfChildrenHeights
        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)

        this.childElements.forEach(i => i.setWidth(maxWidthFrame.width))
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
        this.ratio = this.element.width / this.element.height
        this.reverseRatio = this.element.height / this.element.width
    }

    updateElement(element) {
        this.element = element
        this.ratio = this.element.width / this.element.height
        this.reverseRatio = this.element.height / this.element.width
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
        console.log(this.element.width)
        this.element.height = width * this.reverseRatio
        console.log(this.element.height)
    }

    decreaseHeight() {
        let widthBefore = this.element.width
        this.element.height--
        this.element.width = this.element.height * this.ratio
        return parseFloat(widthBefore - this.element.width)
    }

    increaseHeight () {
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
    obj.adjust(width)
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
    console.log(frames)
    frames.forEach(i => {
        if (i.element.height > maxHeight) {
            maxHeightFrame = i
            maxHeight = i.element.height
        }
    })
    console.log(maxHeightFrame)
    return maxHeightFrame
}

let getFrameWithBiggestWidth = (frames) => {
    let maxWidth = 0
    let maxWidthFrame;
    frames.forEach(i => {
        console.log(i)
        if (i.element.width > maxWidth) {
            maxWidthFrame = i
            maxWidth = i.element.width
        }
    })
    console.log(maxWidthFrame)
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

let r = new row()

let testAll1 = () => {
    let img1 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    img1.element.id = '1'
    let img2 = img('https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg')
    img2.element.id = '2'
    let img3 = img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8OdwAomKCWIpt2NwJ6gnjvf_LuND39nMAzaEmf9kPw&s')
    img3.element.id = '3'
    let img4 = img('https://static.vecteezy.com/system/resources/thumbnails/028/339/934/small/portrait-of-a-cute-ragdoll-cat-against-a-pastel-pink-background-generative-ai-photo.jpg')
    img4.element.id = '4'
    let c = new column()
    c.element.setAttribute('id', 'col')
    let img5 = img('https://img.freepik.com/free-photo/cute-domestic-kitten-sits-window-staring-outside-generative-ai_188544-12519.jpg')
    img5.element.id = '5'
    let img6 = img('https://img.freepik.com/free-photo/fluffy-kitten-sitting-grass-staring-sunset-playful-generated-by-artificial-intelligence_25030-67836.jpg')
    img6.element.id = '6'
    c.add(img5).add(img6)
    r.add(img1).add(img2).add(c).add(img4)
    console.log(r)
    // clearElement('root')
    showStoryboard(r, 'images')
}

let draw = () => {
    r.setChildElementsAfterRender()
    drawStoryboard(r, {width: 600})
}