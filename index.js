const { Pool } = require("pg")
const argumentos = process.argv // devuelve una matriz que contiene los argumentos pasados ​​en línea de comandos. 
const { consulta, nuevo, editar, rut, eliminar } = require('./consultas') // modulos importados

// process.argv[0] == "node"
// process.argv[1] == "index.js"
const accionSql = argumentos[2]
const param1 = argumentos[3]
const param2 = argumentos[4]
const param3 = argumentos[5]
const param4 = argumentos[6]

// conexión por propiedades
const config = {
    user: "postgres",
    host: "localhost",
    password: "1313",
    database: "alwaysmusic",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
}

const pool = new Pool(config) // Clase Pool
// “connect()”, el cual contiene una función callback asíncrona.
pool.connect(async (error_conexion, client, release) => {
    if (error_conexion) { // si hay error en la conxión
        console.error(error_conexion.code)
    } else { // todo Ok
        switch (accionSql) { // selección de argumentos
            case 'consulta':
                await consulta(client)
                break
            case 'nuevo':
                await nuevo(param1, param2, param3, param4, client)
                break
            case 'editar':
                await editar(param1, param2, param3, param4, client)
                break
            case 'rut':
                await rut(param1, client)
                break
            case 'eliminar':
                await eliminar(param1, client)
                break
            default:
                console.log('error')
                break
        }
        release() 
        pool.end() 
    }
})

