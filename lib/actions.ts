"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

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
      } else if (key === "image" || key === "avatar") {
          if (!process.env.BLOB_READ_WRITE_TOKEN) {
            return {
              error:
                "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
            };
          }
  
          const file = formData.get(key) as File;
          const filename = `${nanoid()}.${file.type.split("/")[1]}`;
          const { url } = await put(filename, file, {
            access: "public",
          });
          value = url;
          key = "image";
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