import dotenv from "dotenv";

dotenv.config();

export const PORT = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || '',
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5433/calendly_db?schema=public",
};