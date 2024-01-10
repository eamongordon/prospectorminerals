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
  formData: any,
  _id: unknown,
  key: string,
) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  let value = formData;

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

export const deleteUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    } else {
      const response = await prisma.user.delete({
        where: {
          id: session.user.id,
        },
      });
      return response;
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const fetchMinerals = async (
  names: [],
  minHardness?: number,
  maxHardness?: number,
  lusters?: [],
  streaks?: [],
  mineralClasses?: [],
  chemistry?: [],
  associates?: []
) => {
  let queryArray = [];
  function pushArrayField(propertyArray: [], property: string) {
    let filterArray: { property: { contains: string } }[] = [];
    propertyArray.forEach((propertyItem) => {
      let pushObj = { property: { contains: propertyItem } }
      filterArray.push(pushObj);
    })
    queryArray.push({ OR: filterArray })
  }
  if (names && names.length > 0) {
    let filterArray: { name: { contains: string } }[] = [];
    names.forEach((name) => {
      let pushObj = { name: { contains: name } }
      filterArray.push(pushObj);
    })
    queryArray.push({ OR: filterArray })
  }
  if (minHardness) {
    queryArray.push({ hardness_min: { equals: minHardness } })
  }
  if (maxHardness) {
    queryArray.push({ hardness_max: { equals: maxHardness } })
  }
  if (lusters) {
    pushArrayField(lusters, "luster");
  }
  if (streaks) {
    pushArrayField(streaks, "streak");
  }
  if (mineralClasses) {
    pushArrayField(mineralClasses, "mineral_class");
  }
  if (chemistry) {
    pushArrayField(chemistry, "chemical_formula");
  }
  if (associates && associates.length > 0) {
    let associatesArray: { name: { contains: string } }[] = [];
    associates.forEach((associate) => {
      let pushObj = { name: { contains: associate } }
      associatesArray.push(pushObj);
    })
    queryArray.push({ associates: { some: { OR: [] } } })
  }
  const results = await prisma.mineral.findMany(
    {
      //@ts-expect-error;
      where: { AND: queryArray },
      select: {
        name: true
      },
      include: {
        photos: {
          include: {
            photo: {
              select: {
                title: true
              }
            }
          }
        }
      }
    }
  );
  return results;
}; 