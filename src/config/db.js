// import { PrismaClient } from "../../generated/prisma/client.ts";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "info", "warn"]
      : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error("Error disconnecting from database: ", error);
  }
};

// export { prisma, connectDB, disconnectDB };
module.exports = { prisma, connectDB, disconnectDB };
