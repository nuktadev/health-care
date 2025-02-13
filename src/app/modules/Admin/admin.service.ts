import { paginationHelper } from "./../../../helpers/paginationHelper";
import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { prisma } from "../../../shared/prisma";

const getAllFromDb = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { limit, skip, page, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.AdminWhereInput[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const admins = await prisma.admin.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: admins,
  };
};

const getAdminById = async (id: string): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return admin;
};

const updateAdmin = async (id: string, payload: any): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const admin = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });
  return admin;
};

const deleteAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const admin = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: admin.email,
      },
    });

    return admin;
  });

  return result;
};

const softDeleteFromDBAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (transactionClient) => {
    const admin = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: admin.email,
      },
      data: {
        status: UserStatus.BLOCKED,
      },
    });

    return admin;
  });

  return result;
};

export const AdminService = {
  getAdminById,
  getAllFromDb,
  updateAdmin,
  deleteAdmin,
  softDeleteFromDBAdmin,
};
