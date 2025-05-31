"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const deleteAllData = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      // Delete child records first
      yield prisma.attendance.deleteMany();
      yield prisma.token.deleteMany();
      yield prisma.auth.deleteMany();
      yield prisma.event.deleteMany();
      yield prisma.faculty.deleteMany();
      yield prisma.school.deleteMany(); // Schools depend on Users (schoolAdminId)
      yield prisma.user.deleteMany(); // Delete users last
      console.log("All data has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      yield prisma.$disconnect();
    }
  });
deleteAllData().catch((e) => {
  console.error(e);
  process.exit(1);
});
