const date_fns = require('date-fns')
const uuid = require('uuid')
const os = require('os')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises 

// console.log(new Date())
// console.log(uuid.v4())
// console.log(date_fns.format(new Date(), 'yyyy/MM/dd\tHH:mm:SS'))

// console.log("Hello World")

// log events(msg) => log.txt
// uuid -> date -> time -> message (To store it in a log.txt File)

// const fileOperations = async() => {
//     try{
//         data = await fsPromises.readFile(path.join(__dirname, 'example.txt'),'utf-8')
//         console.log(data)
//         await fsPromises.writeFile(path.join(__dirname, 'reply.txt'), data)
//         await fsPromises.appendFile(path.join(__dirname, 'reply.txt'), "\nThis is better, Don't you think")
//     } catch(err){
//         console.error(err)
//     }
// }


const eventMsgStore = async(message) => {
    try {
        const id = uuid.v4()
        console.log(id)
        var dateTime = date_fns.format(new Date(), 'yyyy/MM/dd\thh:mm:SS')
        await fsPromises.appendFile(path.join(__dirname, 'log.txt'), `\n${dateTime}`)
        await fsPromises.appendFile(path.join(__dirname, 'log.txt'), `\n${id}`)
        await fsPromises.appendFile(path.join(__dirname, 'log.txt'), `\n${message}`)
    } catch (err) {
        console.error(err)
    }
}
eventMsgStore("Okey Then, Let me check it for first time")
eventMsgStore("Okey Then, Let me check it for second time")



const logger = require('./logger')

logger.log("Hello World")