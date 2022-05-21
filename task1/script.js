const fs = require('fs');
const dirname = __dirname;
const path = require('path');

const root = `${dirname}\\Root`
const dependence = {}
const arrSortedFile = []

function parsFile(file) {
    const regexp = /require/i;
    const arrDependence = []
    if (regexp.test(file)) {

        const arrFiles = file.split('require')

        arrFiles.forEach((text, index) => {  // устанавливаем зависимость файлов
            const regexpForText = /Folder/i;
            if (regexpForText.test(text)) {
                let str = arrFiles[index]
                str = str.replace(/‘/i, '')
                str = str.replace(/’/i, '')
                const file = str.split('/')
                arrDependence.push(file[1].trim())
            }
        })
    }
    return arrDependence
}

function readFile(address) {
    const parsEl = path.parse(address)
    const data = fs.readFileSync(address, 'utf-8')
    dependence[parsEl.name] = [...parsFile(data, parsEl.name)]

    return dependence
}

function parsFolder(urlFolder) {
    debugger
    fs.readdirSync(urlFolder).forEach((el) => {
        const URL_ADDRESS = `${urlFolder}\\${el}`
        const parsEl = path.parse(URL_ADDRESS)
        if (!!parsEl.ext) {
            return readFile(URL_ADDRESS)

        } else return parsFolder(URL_ADDRESS)
    });
}

function findError(objFile) {
    let Error = false
    const arr = []
    for (const keyRoot in objFile) {
        const arrFileInKey = objFile[keyRoot]
        arrFileInKey.forEach((el) => {
            for (const key in objFile) {
                if (key === el) {
                    objFile[key].forEach((element) => {
                        if (element === keyRoot) {
                            arr.push(element)
                            arr.push(keyRoot)
                            Error = true
                        }
                    })
                }
            }
        })
    }
    if (Error) console.error(`Циклическая зависимость файлов: ${arr} `)
    return Error
}

function sortFile(objFile) {
    if (!findError(objFile)) {
        return false
    } else {
        for (const key in objFile) {
            const arrFileInKey = objFile[key]

            if (arrFileInKey.length === 0) {
                arrSortedFile.push(key)
                continue
            }
            arrFileInKey.reverse();

            arrFileInKey.forEach((el) => {
                let isPush = true
                arrSortedFile.forEach((file) => {
                    if (el === file) isPush = false
                })

                if (isPush) arrSortedFile.push(el)

            })
            arrSortedFile.push(key)

        }
        return arrSortedFile;
    }
}


parsFolder(root)


console.log(sortFile(dependence))
