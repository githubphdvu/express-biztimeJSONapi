const { Client } = require("pg")

let DB_URI
process.env.NODE_ENV === "test" 
    ? DB_URI = "postgresql:///biztime_test"
    : DB_URI = "postgresql:///biztime"
let db = new Client({connectionString: DB_URI})
db.connect()
module.exports = db