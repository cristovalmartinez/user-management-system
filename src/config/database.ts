import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "mydatabase.db", // SQLite database file name
  define: {
    // Configure model options (e.g., timestamps, underscored, etc.)
    timestamps: true,
  },
})
