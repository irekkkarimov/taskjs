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

        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        let maxWidth = maxWidthFrame.allWidth
        let sumOfChildHeights = 0
        this.childElements.forEach(i => {
            i.setWidth(maxWidth)
            sumOfChildHeights += i.allHeight
        })
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
        this.makeRectangle(paddingTop, paddingRight, paddingBottom, paddingLeft)

        if (this.allWidth > width) {
            let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
            while (this.allWidth > width) {
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
                let heightDifference = minWidthFrame.increaseWidth()
                this.element.height += heightDifference
                this.UpdateSize()
                minWidthFrame = getFrameWithLeastWidth(this.childElements)
                this.UpdateWidth(getFrameWithBiggestWidth(this.childElements).allWidth)
                this.UpdateMaxSize()
            }
        }

        let maxWidthFrame = getFrameWithBiggestWidth(this.childElements)
        this.UpdateWidth(maxWidthFrame.allWidth)
        this.UpdateMaxSize()
        if (this.id === 'main') {
            this.element.style.border = '1px solid darkcyan'
            this.element.style.backgroundColor = '#000'
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