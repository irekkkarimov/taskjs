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