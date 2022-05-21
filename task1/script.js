const fs = require('fs');
const dirname = __dirname;
const path = require('path');

const root = `${dirname}\\Root`
const dependence = {}
const arrSortedFile = []
const objTxt = {}
let gluingStr = []

function parsFile(file, name) {
    const regexp = /require/i;
    const arrDependence = []
    objTxt[name] = file

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
}  // находим зависимости и делаес структурированный обект из всех файлов

function readFile(address) {
    const parsEl = path.parse(address)
    const data = fs.readFileSync(address, 'utf-8')
    dependence[parsEl.name] = [...parsFile(data, parsEl.name)]

    return dependence
}  // Читаем txt

function parsFolder(urlFolder) {

    fs.readdirSync(urlFolder).forEach((el) => {
        if (el === 'allText.txt') return
        const URL_ADDRESS = `${urlFolder}\\${el}`
        const parsEl = path.parse(URL_ADDRESS)
        if (!!parsEl.ext) {
            return readFile(URL_ADDRESS)

        } else return parsFolder(URL_ADDRESS)
    });
}  // Просматриваем все папки и ищем в них txt

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
}  // Смотрим если ли циклическая зависимость у файлах

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
}   //  Сортируем файлы по их вызываемости

function gluing(files, data) {
    files.forEach((el) => {
        for (const key in data) {
            if (el === key) {
                gluingStr.push(data[key])
            }
        }
    })
    gluingStr = gluingStr.join(',').trim()
    const urlFile = path.join(root, 'allText.txt')

    fs.readdirSync(root).forEach((el) => {
        if (el === 'allText.txt') fs.unlink(urlFile, (err) => {
            if (err) console.log(err)
        })
    })

    fs.writeFileSync(urlFile, gluingStr);
} // Склеивание в один текстовый файл который будет находиться в папке Root

parsFolder(root)
sortFile(dependence)
gluing(arrSortedFile, objTxt)


