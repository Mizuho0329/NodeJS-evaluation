import lowdb from 'lowdb'


const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')

const db = lowdb(adapter)

// Set some defaults
db.defaults({ results: [] })
    .write()



export default db;