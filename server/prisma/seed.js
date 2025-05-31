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
const bcrypt_1 = require("../src/utils/bcrypt");
const prisma = new client_1.PrismaClient();
const seed = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Create superadmin
    yield prisma.user.create({
      data: {
        fullName: "Super Admin",
        email: "superadmin@example.com",
        password: yield (0, bcrypt_1.hashPassword)("supersecurepassword"),
        roles: ["SUPERADMIN"], // Superadmin role
        isActive: true,
        isEmailVerified: true,
      },
    });
  });
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield prisma.$disconnect();
    }),
  );
