// import dependence sqlite3
const sqlite3 = require("sqlite3").verbose()

// create the object that will do operations on database
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// we will use the database object for our operations
db.serialize(() => {
//     // with sql commands i will

//     // 1 create a table
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             adress TEXT,
//             adress2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // 2 insert data
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         adress,
//         adress2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData) // will be executed just after execute all


//     // 3 query table data
//     // db.all(`SELECT name FROM places`, function (err, rows) {
//     //     if (err) {
//     //         return console.log(err)
//     //     }

//     //     console.log("Aqui estão os seus registros")
//     //     console.log(rows)
//     // })


//     // 4 delete table data
        // db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
        //     if (err) {
        //         return console.log(err)
        //     }

        //     console.log("Registro deletado com sucesso")
        // })



})