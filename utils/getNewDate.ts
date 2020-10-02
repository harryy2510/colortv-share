const getNewDate = () => {
    let date = new Date().toString()
    const index = date.indexOf('(')
    date = date.slice(0, index).trim()
    return date
}

export default getNewDate
