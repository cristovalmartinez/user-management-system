import express from "express"
import api from "./routes"
import { sequelize } from "./config/database"
import { initUser } from "./models/User"
import bodyParser from "body-parser"

const app = express()
const port = process.env.PORT || 3000

// Initialize models
initUser(sequelize)

app.use(bodyParser.json())
app.use(api)

// Sync the database (create tables)
sequelize.sync({ force: false }).then(() => {
  console.log("Database is synced.")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
