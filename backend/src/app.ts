import { envs } from "./config"
import sequelize from "./data/mysql/mysql-database"

import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
  main()
})()

async function main() {

  await sequelize.sync()

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  }).start()
}
