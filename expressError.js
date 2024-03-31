//xtends normal JS error so we can easily add a status when we make an instance of it.
//error-handling middleware will return this
class ExpressError extends Error {
    constructor(message, status) {
        super()
        this.message = message
        this.status = status
        console.error(this.stack)
    }
}
module.exports = ExpressError