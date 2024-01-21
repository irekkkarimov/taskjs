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