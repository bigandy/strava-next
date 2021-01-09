import { PrismaClient } from "@prisma/client";

var prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query"],
    });
  }

  prisma = global.prisma;
}

export default prisma;
export { PrismaClient };
