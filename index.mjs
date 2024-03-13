import express from 'express'
import cros from 'cors'

import routes from './routes/index.mjs'
import db from './config/db.mjs'
import { PORT } from './config/environment.mjs'

const app = express()

const port = PORT || 3001

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

app.listen(PORT, function(){
    console.log(`Server is running at port ${port}`)

})

app.use(cros())

app.use(express.json())

app.use('/',routes)
