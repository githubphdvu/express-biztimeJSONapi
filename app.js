const express = require("express")
const ExpressError = require("./expressError")
const companiesRoutes = require("./routes/companies")
const invoicesRoutes = require("./routes/invoices")
const app = express()
app.use(express.json())
app.use("/companies", companiesRoutes)
app.use("/invoices", invoicesRoutes)

app.use((req, res, next)=>{//404 handler
    const err = new ExpressError("Not Found", 404)
    return next(err)
})
app.use((err, req, res, next) => {//general error handler
    res.status(err.status || 500)
    return res.json({error: err,message: err.message})
})
module.exports = app
