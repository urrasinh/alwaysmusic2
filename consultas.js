const nuevo = async (nombre, rut, curso, nivel, client) => {
    const SQLQuery = {
        text: `INSERT INTO alumnos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4);`,
        values: [nombre, rut, curso, nivel],
    }
    try {
        await client.query(SQLQuery)
        console.log(`Estudiante ${nombre} agregado con éxito`)
    } catch (error_consulta) {
        console.log(error_consulta.code)
    }
}

const consulta = async (client) => {
    const SQLQuery = {
        name: 'consultar-todos',
        text: `SELECT * FROM alumnos;`,
        rowMode: 'array'
    }
    try {
        const res = await client.query(SQLQuery)
        console.log('Registro actual: ', res.rows)
    } catch (error_consulta) {
        console.log(error_consulta.code)
    }


}

const editar = async (nombre, rut, curso, nivel, client) => {
    const SQLQuery = {
        name: 'consultar-editar',
        text: `UPDATE alumnos SET nombre = $1, curso = $3, nivel = $4 WHERE rut = $2;`,
        values: [nombre, rut, curso, nivel],
    }
    try {
        await client.query(SQLQuery)
        console.log(`Estudiante ${nombre} editado con éxito`)
    } catch (error_consulta) {
        console.log(error_consulta.code)
    }
}

const rut = async (rut, client) => {
    const SQLQuery = {
        name: 'consultar-rut',
        text: `SELECT * FROM alumnos WHERE rut = $1;`,
        values: [rut],
        rowMode: 'array'
    }
    try {
        const res = await client.query(SQLQuery)
        console.log(res.rows)
    } catch (error_consulta) {
        console.log(error_consulta.code)
    }
}


const eliminar = async (rut, client) => {
    const SQLQuery = {
        name: 'eliminar',
        text: `DELETE FROM alumnos WHERE rut = $1;`,
        values: [rut],
    }
    try {
        await client.query(SQLQuery)
        console.log(`Registro de estudiante con rut ${rut} eliminado`)
    }
    catch (error_consulta) {
        console.log(error_consulta.code)
    }
}



module.exports = {
    nuevo,
    consulta,
    editar,
    rut,
    eliminar,
}