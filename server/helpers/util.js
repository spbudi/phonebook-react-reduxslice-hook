class Response {
    constructor(data, status = 'SUCCESS'){
        this.status = status
        this.data = data
    }
}

module.exports = {
    Response
}