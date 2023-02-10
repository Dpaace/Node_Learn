function reverse(string) {
    return string.split('').reverse().join('')
}



function sum(a, b) {
    return a+b
}

module.exports = {reverse, sum}
// For testing 
// npm install jest --save-dev