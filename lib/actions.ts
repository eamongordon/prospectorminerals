"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

export const editUser = async (
    formData: FormData,
    _id: unknown,
    key: string,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    let value = formData.get(key) as string;
  
    try {
      if (key === 'password') {
        value = await hash(value, 10);
      }
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          [key]: value,
        },
      });
      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  };