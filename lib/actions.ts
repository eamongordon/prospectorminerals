"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL } from "@/lib/utils";
import type { ArticlesFilterObj, LocalitiesFilterObj, MineralsFilterObj, PhotosFilterObj, PhotosSortObj } from "@/types/types";
import { Post, Prisma } from '@prisma/client';
import { del, put } from "@vercel/blob";
import { hash } from "bcrypt";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";
import type { MineralDisplayFieldset, MineralFullFieldset } from "@/types/prisma";

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

export const createPhotoBulk = async (
  input: string
) => {
  const session = await getSession();
  if (!session?.user.id || session.user.email !== process.env.ADMIN_EMAIL) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    console.log("itemsArray");
    const itemArray = JSON.parse(input);
    console.log(itemArray);
    const newItems = await Promise.all(itemArray.map(async (obj: any) => {
      const fetchRes = await fetch(obj.image);
      const imageBlob = await fetchRes.blob();
      const filename = `${obj.id}.${obj.fileExtension.split("/")[1]}`;

      const { url } = await put(filename, imageBlob, {
        access: "public",
      });
      const blurhash = await getBlurDataURL(url);
      obj.fileExtension = undefined;
      if (obj.specimen_height) {
        obj.specimen_height = new Prisma.Decimal(obj.specimen_height)
      };
      if (obj.specimen_width) {
        obj.specimen_width = new Prisma.Decimal(obj.specimen_width)
      };
      if (obj.specimen_length) {
        obj.specimen_length = new Prisma.Decimal(obj.specimen_length)
      };
      return {
        ...obj,
        image: url,
        imageBlurhash: blurhash
      }
    }));
    console.log("new items");
    console.log(newItems);
    const response = prisma.photo.createMany({ data: newItems });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};


export const createPhoto = async (
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
      if (session.user.image && new URL(session.user.image).hostname === "ousfgajmtaam7m3j.public.blob.vercel-storage.com") {
        await del(session.user.image);
      }
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

type FetchMineralsReturn<T extends string> = T extends 'display'
  ? { results: MineralDisplayFieldset[], next: number | undefined }
  : { results: MineralFullFieldset[], next: number | undefined };

export async function fetchMinerals<T extends string>({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj?: MineralsFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: T }): Promise<FetchMineralsReturn<T>> {
  // Function body remains the same until the selectObj definition
  let queryArray: Prisma.MineralWhereInput[] = [];
  function pushArrayField(propertyArray: string[], property: string) {
    let filterArray: { [property: string]: { contains: string, mode?: string } }[] = [];
    propertyArray.forEach((propertyItem) => {
      let pushObj = { [property]: { contains: propertyItem, mode: 'insensitive' } }
      filterArray.push(pushObj);
    })
    queryArray.push({ OR: filterArray })
  }
  const { name, minHardness, maxHardness, lusters, streaks, mineralClasses, crystalSystems, chemistry, associates, id } = Object(filterObj);
  if (id) {
    queryArray.push({ id: { equals: id } });
  }
  if (name) {
    queryArray.push({ name: { contains: name, mode: 'insensitive' } });
  }
  if (minHardness || minHardness === 0) {
    queryArray.push({ hardness_min: { lte: maxHardness } })
  }
  if (maxHardness || maxHardness === 0) {
    queryArray.push({ hardness_max: { gte: minHardness } })
  }
  if (lusters) {
    pushArrayField(lusters, "luster");
  }
  if (crystalSystems) {
    pushArrayField(crystalSystems, "crystal_system");
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
    associates.forEach((associate: string) => {
      let pushObj = { name: { contains: associate } }
      associatesArray.push(pushObj);
    })
    queryArray.push({ associates: { some: { OR: [] } } })
  }
  let selectObj: Prisma.MineralSelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = Prisma.validator<Prisma.MineralSelect>()({
      name: true,
      photos: {
        take: 1,
        select: {
          photo: {
            select: {
              title: true,
              image: true,
              imageBlurhash: true,
            }
          }
        },
        orderBy: {
          photo: {
            number: "asc"
          }
        }
      },
      number: true,
      id: true
    });
  } else if (fieldset === "full") {
    selectObj = Prisma.validator<Prisma.MineralSelect>()({
      name: true,
      hardness_max: true,
      hardness_min: true,
      crystal_system: true,
      mineral_class: true,
      chemical_formula: true,
      streak: true,
      luster: true,
      description: true,
      uses: true,
      localities_description: true,
      photos: {
        take: 3,
        select: {
          photo: {
            select: {
              title: true,
              image: true,
              imageBlurhash: true,
            }
          }
        },
        orderBy: {
          photo: {
            number: "asc"
          }
        }
      },
      number: true,
      id: true
    });
  }

  const results = await prisma.mineral.findMany({
    skip: cursor ? 1 : 0,
    cursor: cursor ? { number: cursor } : undefined,
    where: { AND: queryArray },
    select: selectObj,
    orderBy: [
      sortObj ? { [sortObj.property]: sortObj.order } : {},
      {
        number: "asc",
      },
    ],
    ...(limit ? { take: limit } : {}),
  });

  return {
    results: results,
    next: results.length === limit ? results[results.length - 1].number : undefined
  } as FetchMineralsReturn<T>;
}

export async function fetchLocalities({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj?: LocalitiesFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: string }) {
  let queryArray = [];
  const { name, minerals, id } = Object(filterObj);
  if (id) {
    queryArray.push({ id: { equals: id } });
  }
  if (name) {
    queryArray.push({ name: { contains: name, mode: 'insensitive' } });
  }
  if (minerals && minerals.length > 0) {
    let mineralsArray: { name: { contains: string } }[] = [];
    minerals.forEach((associate: string) => {
      let pushObj = { name: { contains: associate } }
      mineralsArray.push(pushObj);
    })
    queryArray.push({ minerals: { some: { OR: [] } } })
  }
  const cursorObj = !cursor ? undefined : { number: cursor };
  let selectObj;
  if (!fieldset || fieldset === "display") {
    selectObj = {
      name: true,
      latitude: true,
      longitude: true,
      type: true,
      coordinates_known: true,
      id: true,
      minerals: {
        select: {
          mineral: {
            select: {
              name: true
            }
          }
        }
      },
    }
  } else if (fieldset === "full") {
    selectObj = undefined;
  }
  const results = await prisma.locality.findMany(
    {
      skip: !cursor ? 0 : 1,
      cursor: cursorObj,
      take: limit,
      where: { AND: queryArray as Prisma.LocalityWhereInput[] },
      select: selectObj,
      orderBy: [
        sortObj ? { [sortObj.property]: sortObj.order } : {},
        {
          number: "asc",
        },
      ],
      ...(limit ? { take: limit } : {}),
    }
  );
  /*
  let returnArray;
  if (fieldset === "display") {
    returnArray = results.map((result) => {return {name: result.name, number: result.number, id: result.id, photo: result.photos[0].image}});
  }
  */
  return {
    results: results,
    next: results.length === limit ? results[results.length - 1].number : undefined
  };
};

export async function fetchPosts({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj?: ArticlesFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: string }) {
  const { title } = Object(filterObj)
  const cursorObj = !cursor ? undefined : { number: cursor };
  let selectObj;
  if (!fieldset || fieldset === "display") {
    selectObj = {
      title: true,
      image: true,
      imageBlurhash: true,
      createdAt: true,
      number: true,
      description: true
    }
  }
  const results = await prisma.post.findMany(
    {
      skip: !cursor ? 0 : 1,
      cursor: cursorObj,
      take: limit,
      where: {
        published: true,
        title: {
          contains: title,
          mode: 'insensitive'
        }
      },
      select: selectObj,
      orderBy: [
        sortObj ? { [sortObj.property]: sortObj.order } : {},
        {
          number: "asc",
        },
      ],
      ...(limit ? { take: limit } : {}),
    }
  );
  /*
  let returnArray;
  if (fieldset === "display") {
    returnArray = results.map((result) => {return {name: result.name, number: result.number, id: result.id, photo: result.photos[0].image}});
  }
  */
  return {
    results: results,
    next: results.length === limit ? results[results.length - 1].number : undefined
  };
};

export async function fetchPhotos({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj: PhotosFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: string }) {
  if (!limit) {
    limit = 10;
  }
  const cursorObj = !cursor ? undefined : { number: cursor };
  const { name } = Object(filterObj);
  let selectObj;
  if (!fieldset || fieldset === "display") {
    selectObj = {
      title: true,
      image: true,
      imageBlurhash: true,
      number: true,
      id: true
    }
  }
  const results = await prisma.photo.findMany(
    {
      skip: !cursor ? 0 : 1,
      cursor: cursorObj,
      take: limit,
      where: {
        title: {
          contains: name,
          mode: 'insensitive'
        }
      },
      select: selectObj,
      orderBy: [
        sortObj ? { [sortObj.property]: sortObj.order } : {},
        {
          number: "asc",
        },
      ],
      ...(limit ? { take: limit } : {}),
    }
  );
  /*
  let resultsCopy = [...results];
  if (results.length > 1) {
    resultsCopy.length = results.length - 1;
  }
  */
  return {
    results: results,
    next: results.length === limit ? results[results.length - 1].number : undefined
  };
};

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Post) => {
  const session = await getSession();
  if (!session?.user.id || session.user.email !== process.env.ADMIN_EMAIL) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }
  try {
    const response = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });
    await revalidateTag(
      `post-${post.slug}`,
    );
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePostMetadata = async (
  formData: any,
  slug: string,
  key: string,
) => {
  const value = formData;
  try {
    const session = await getSession();
    if (!session?.user.id || session.user.email !== process.env.ADMIN_EMAIL) {
      return {
        error: "Not authenticated",
      };
    }
    let response;
    if (key === "image") {
      const file = formData.get("image") as File;
      const filename = `${nanoid()}.${file.type.split("/")[1]}`;

      const { url } = await put(filename, file, {
        access: "public",
      });

      const blurhash = await getBlurDataURL(url);

      response = await prisma.post.update({
        where: {
          slug: slug,
        },
        data: {
          image: url,
          imageBlurhash: blurhash,
        },
      });
    } else {
      response = await prisma.post.update({
        where: {
          slug: slug,
        },
        data: {
          [key]: key === "published" ? value === "true" : value,
        },
      });
    }
    await revalidateTag(
      `post-${slug}`,
    );
    return response;
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        error: `This slug is already in use`,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
}

export const createPost = async (_?: FormData) => {
  const session = await getSession();
  if (!session?.user.id || session.user.email !== process.env.ADMIN_EMAIL) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.post.create({
    data: {
      userId: session.user.id,
    },
  });
  await revalidateTag(
    `posts`,
  );
  return response;
};

export const deletePost = async (_: FormData, postSlug: string) => {
  try {
    const session = await getSession();
    if (!session?.user.id || session.user.email !== process.env.ADMIN_EMAIL) {
      return {
        error: "Not authenticated",
      };
    }
    const response = await prisma.post.delete({
      where: {
        slug: postSlug
      },
    });
    await revalidateTag(
      `posts`,
    );
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};