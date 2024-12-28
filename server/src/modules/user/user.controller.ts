import { Prisma, PrismaClient } from "@prisma/client"; // Importing PrismaClient
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { mailer } from "../../services/mailer";
import { getReturn } from "../../types/type";
const prisma = new PrismaClient();

const createUser = async (
  payload: Prisma.UserCreateInput,
): Promise<Prisma.UserCreateInput | null> => {
  try {
    const { password, ...rest } = payload as {
      password: string;
      roles?: string[];
      [key: string]: any;
    };
    rest.password = await hashPassword(password);
    rest.isEmailVerified = true;
    rest.isActive = true;

    const result = await prisma.user.create({
      data: rest as Prisma.UserUncheckedCreateInput,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

const getUser = async (
  limit?: number,
  page?: number,
  search?: { roles?: string },
): Promise<getReturn> => {
  try {
    const pageNum = page as number;
    const size = limit as number;

    const whereCondition: any = {
      isActive: true,
      isArchived: false,
    };
    if (search?.roles) {
      whereCondition.roles = search.roles;
    }

    // Get total count
    const total = await prisma.user.count({
      where: whereCondition,
    });

    // Fetch paginated data
    const data = await prisma.user.findMany({
      where: whereCondition,
      skip: (pageNum - 1) * size,
      take: size,
    });

    return { data, total, limit: size, page: pageNum };
  } catch (err) {
    throw err;
  }
};

const getById =async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw err;
  }
};

const updateById = async (id: string, payload: Prisma.UserUpdateInput) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        fullName: payload?.fullName,
      },
    });
  } catch (err) {
    throw err;
  }
};

    const changePassword= async(id: string, oldPassword: string, newPassword: string)=> {
     try{

         const user = await prisma.user.findUnique({ where: { id } });
       if (!user)
         throw new Error("User not found");
       const isValidOldPass = await comparePassword(
         oldPassword,
         user?.password,
       );
       if (!isValidOldPass)
         throw new Error("Old password is incorrect");
       const newPass = await hashPassword(newPassword);
 
       return await prisma.user.update({
         where: { id },
         data: { password: newPass },
       });
     }catch(err){
         throw err;
      }
    }

    const resetPassword=async(id: string, password: string)=> {
        try{

            const user = await prisma.user.findUnique({ where: { id } });
            if (!user)
              throw new Error("User not found");
            const newPass = await hashPassword(password);
      
            return await prisma.user.update({
              where: { id },
              data: { password: newPass },
            });
        }catch(err){
            throw err;
        }
    }
    const block=async(id: string, isActive: boolean)=> {
        try{

            const user = await prisma.user.findUnique({ where: { id } });
            if (!user)
              throw new Error("User not found");
            return await prisma.user.update({
              where: { id },
              data: { isActive },
            });
        }catch(err){
            throw err;
        }
    }
    const archive=async(id: string, isArchived:boolean) =>{
        try{
            
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user)
              throw new Error("User not found");
            return await prisma.user.update({
              where: { id },
              data: { isArchived },
            });
        }catch(err){
            throw err;
        }
    }

    export { createUser, getUser, getById, updateById, changePassword, resetPassword, block, archive };