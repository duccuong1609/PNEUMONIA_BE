// import { DataSource } from "typeorm"
// import dotenv from 'dotenv'
// import { User } from "../models/user"

// dotenv.config()

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST || "localhost",
//     port: parseInt(process.env.DB_PORT || "5432"),
//     username: process.env.DB_USERNAME || "postgres",
//     password: process.env.DB_PASSWORD || "postgres",
//     database: process.env.DB_NAME || "nirvana_db",
//     synchronize: true, // Đặt false trong production
//     logging: ["error", "warn"], // hoặc false để tắt hoàn toàn
//     entities: [User],
//     migrations: ["src/migrations/**/*.ts"],
//     subscribers: ["src/subscribers/**/*.ts"],
//     cache: true,
//     ssl: {
//         rejectUnauthorized: false // Trong môi trường development
//     },
//     extra: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     }
//     // ssl: false,  // Thay đổi từ { rejectUnauthorized: false } sang false
//     // extra: {
//     //     ssl: false  // Loại bỏ cấu hình SSL
//     // }
// }) 