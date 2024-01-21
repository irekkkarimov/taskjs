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
        }
    }

    decreaseWidth() {
        let heightBefore = this.allHeight
        let frame = getFrameWithBiggestHeight(this.childElements)
        frame.decreaseWidth()
        this.element.width--
        this.UpdateSize()
        let currentFrameWithBiggestHeight = getFrameWithBiggestHeight(this.childElements)
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