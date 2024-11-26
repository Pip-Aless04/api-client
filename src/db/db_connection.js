import sql from 'mssql';
import 'dotenv/config'
//usar .env despues

const sqlConfig = {
    user: process.env.DB_USER_LOCAL,
    password: process.env.DB_PWD_LOCAL,
    database: process.env.DB_NAME_LOCAL,
    server: process.env.DB_SERVER_LOCAL,
    port:parseInt(process.env.DB_PORT_LOCAL, 10),
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

async function connect () {
    try {
    const connection =  sql.connect(sqlConfig)
    console.log('connected')
    return connection
    } catch (err) {
    console.log('Error al conectarse a base de datos')
    throw err
    }
}

export const connection = await connect();