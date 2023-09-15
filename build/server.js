"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./config/database");
const User_1 = require("./models/User");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Initialize models
(0, User_1.initUser)(database_1.sequelize);
app.use(routes_1.default);
// Sync the database (create tables)
database_1.sequelize.sync({ force: false }).then(() => {
    console.log("Database is synced.");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
