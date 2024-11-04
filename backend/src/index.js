import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mogo.js'
import {config} from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'

config()

async function main() {
    const hostname ='localhost'
    const port =3000

    const app = express()

    const mongoConnection = await Mongo.connect({mongoConectionString: process.env.MONG_CS, mongoDbName: process.env.MONGO_DB_NAME})
    console.log(mongoConnection)

    app.use(express.json())
    app.use(cors())

    app.get('/',(req, res) =>{
    res.send({
        success: true,
        statusCode: 200,
        body: 'Wecome to Rola.bet!'
        })
    
    })

    app.use('/auth', authRouter)
    app.use('/users', usersRouter)

    app.listen(port, () => {

        console.log(`Server running on: http:// ${hostname}:${port}`)
    })
    
}

main()