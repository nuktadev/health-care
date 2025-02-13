import { z } from "zod";

const createAdminValidation = z.object({
  body: z.object({
    name: z.string(),
    contactNumber: z.string(),
  }),
});
const updateAdminValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

export const AdminValidation = {
  createAdminValidation,
  updateAdminValidation,
};
