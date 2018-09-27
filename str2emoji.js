const emojiMap = [
{
    id: 'm_1',
    name: '微笑',
    file: 'emotion_001.png'
},
{
    id: 'm_2',
    name: '憨笑',
    file: 'emotion_002.png'
}
]


function str2Emoji(str) {
    const domain = 'http://lsxim.linkin.cn:9999/imgs/'
    let start, end   //记录emoji字符串开始结束的位置
    let positionArr = []    //存储所有emoji的位置
    for(let i = 0; i < str.length; i++) {
        if(str[i] === '[') {
            start = i
            for(let j = i + 1; j < str.length; j++) {
                if(str[j] === ']') {
                    end = j
                    positionArr.push({start, end})
                    i = j + 1
                    break
                }
                else if(str[j] === '[') {
                    start = j
                }
            }
        }
    }

    let resultArr = []  //把str根据emoji分解成数组
    let slicePosition = 0  
    for(let i = 0; i < positionArr.length; i++) {     //分割字符串
        resultArr.push(str.substring(slicePosition, positionArr[i].start))
        resultArr.push(str.substring(positionArr[i].start, positionArr[i].end + 1))
        slicePosition = positionArr[i].end + 1
    }

    resultArr.push(str.substring(slicePosition))

    for(let i = 0;i < resultArr.length; i++) {
        if(/^\[.+\]$/.test(resultArr[i])) {
            resultArr[i] = findMap(resultArr[i])
        }
    }

    //根据对应数据获取emoji路径
    function findMap(emojiStr) {
        let key = emojiStr.slice(1, -1)
        for(let emoji of emojiMap) {
            if(emoji.name === key) {
                return `<img src="${domain + emoji.file}" alt="" />`
            }
        }
    }

    return resultArr.join('')
}



let str = '1[[微笑]]2[[憨笑]]3'
console.log(str2Emoji(str))