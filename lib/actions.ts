"use server";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getBlurDataURL } from "@/lib/utils";
import { Post, Prisma } from '@prisma/client';
import { del, put } from "@vercel/blob";
import { hash } from "bcrypt";
import { customAlphabet } from "nanoid";
import { revalidateTag } from "next/cache";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export interface FormSubmitObj {
  formData: any;
  key: string;
  slug?: string;
};

export const editUser = async (
  { formData, key }: FormSubmitObj
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
      if (session.user.image && new URL(session.user.image).hostname === process.env.BLOB_HOSTNAME) {
        await del(session.user.image);
      }
      if (formData) {
        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });
        value = url;
      } else {
        value = null;
      }
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
      console.error(error);
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
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const itemArray = JSON.parse(input);
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
    const response = prisma.photo.createMany({ data: newItems });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};


export const createMineralBulk = async (
  input: string
) => {
  const session = await getSession();
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const itemArray = JSON.parse(input);
    const newItems = itemArray;
    const response = prisma.mineral.createMany({ data: newItems });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createLocalityBulk = async (
  input: string
) => {
  const session = await getSession();
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const itemArray = JSON.parse(input);
    const newItems = itemArray.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        type: item.type,
        coordinates_known: item.coordinates_known,
        description: item.description,
        latitude: new Prisma.Decimal(item.latitude),
        longitude: new Prisma.Decimal(item.longitude),
        /*
        minerals: {
          connect: item.minerals.map((mineral: any) => {return {id: mineral._id}})
        },
        photos: {
          connect: item.photos.map((photo: any) => {return {id: photo._id}})
        }
          */
      }
    })
    const response = prisma.locality.createMany({ data: newItems });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const createRelationsBulk = async (
  input: string
) => {
  const session = await getSession();
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const itemArray = JSON.parse(input);
    const newItems = itemArray.map((obj: any) => {
      return {
        mineralId: obj.mineral,
        photoId: obj.photo
      }
    });
    const response = prisma.photoOnMineral.createMany({ data: newItems });
    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
/*
export const addPhotoFallbackLocality = async(
  input: string
) => {
  const session = await getSession();
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }
  const prismaAllPhotos = await prisma.photo.findMany();
  const itemArray = JSON.parse(input);
  try {
    prismaAllPhotos.forEach(async (photo) => {
      await prisma.photo.update({
        where: {
          id: photo.id,
        },
        data: {
          locality_fallback: itemArray.find((item: any) => item._id === photo.id).locality,
        },
      });
    });
    return { success: true, message: "Migration completed successfully." };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, message: "Migration failed." };
  }
}

export async function addPhotoLocalityRelations() {
  const prismaAllPhotos = await prisma.photo.findMany();
  const prismaAllLocalities = await prisma.locality.findMany();
  try {
    prismaAllPhotos.forEach(async (photo) => {
      const localityId = prismaAllLocalities.find((locality: any) => locality.name.includes(photo.locality_fallback?.slice(0, 5)))?.id
      await prisma.photo.update({
        where: {
          id: photo.id,
        },
        data: {
          localityId: localityId
        },
      });
    });
    return { success: true, message: "Migration completed successfully." };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, message: "Migration failed." };
  }
}
  */

/*
export const createPhoto = async (
  { formData, key }: FormSubmitObj
) => {
  const session = await getSession();
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
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
*/

export const createUser = async (userdata: { email: string; password: string; name?: string }) => {
  const { email, password, name } = userdata;

  try {
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exists) {
      throw new Error("User already exists");
    } else {
      const user = await prisma.user.create({
        data: {
          email,
          password: await hash(password, 10),
          name,
        },
      });
      return user;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user.id) {
      throw new Error("Not authenticated");
    } else {
      if (session.user.image && new URL(session.user.image).hostname === process.env.BLOB_HOSTNAME) {
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
    throw new Error(error.message);
  }
};

/*
const photoUniqueDisplaySelectObject = {
  ...hotoUniqueDisplaySelectObject,
  description: true,
} satisfies Prisma.PhotoSelect;

type FetchUniquePhotoReturn<T extends string> = T extends 'full'
  ? PhotoFullFieldset : PhotosUniqueDisplayFieldset;

export async function FetchUniquePhotoReturn<T extends string>(id: string, fieldset?: T): Promise<FetchUniquePhotoReturn<T>> {
  let selectObj: Prisma.PhotoSelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = photoUniqueDisplaySelectObject satisfies Prisma.PhotoSelect;
  } else if (fieldset === "full") {
    selectObj = photoFullSelectObject satisfies Prisma.PhotoSelect;
  }
  const result = await prisma.photo.findUnique({
    where: {
      id: id
    },
    select: selectObj
  });
  return result as FetchUniquePhotoReturn<T>;
}
*/

/*
export async function migrateTitleToName() {
  const prismaAllPhotos = await prisma.photo.findMany();
  try {
    prismaAllPhotos.forEach(async (photo) => {
      await prisma.photo.update({
        where: {
          id: photo.id,
        },
        data: {
          name: photo.name,
        },
      });
    });
    return { success: true, message: "Migration completed successfully." };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, message: "Migration failed." };
  }
}
*/

/*
export async function addSlug() {
  const prismaAllPhotos = await prisma.locality.findMany();
  try {
    prismaAllPhotos.forEach(async (photo) => {
      const slug = photo.name
      .toLowerCase() // Step 1: Convert to lowercase
      .replace(/[^a-z0-9\s]/g, '') // Step 2: Remove special characters
      .replace(/\s+/g, '-') // Step 3: Replace spaces with hyphens
      .replace(/^-+|-+$/g, ''); // Step 4: Trim leading/trailing hyphens
      await prisma.locality.update({
        where: {
          id: photo.id,
        },
        data: {
          slug: slug,
        },
      });
    });
    return { success: true, message: "Migration completed successfully." };
  } catch (error) {
    console.error("Migration failed:", error);
    return { success: false, message: "Migration failed." };
  }
}
*/

// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Post) => {
  const session = await getSession();
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
  });
  if (!post) {
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
  { formData, key, slug }: FormSubmitObj
) => {
  const value = formData;
  try {
    const session = await getSession();
    if (!session?.user.id || !session.user.roles.includes("Admin")) {
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
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
    return {
      error: "Not authenticated",
    };
  }
  const response = await prisma.post.create({
    data: {},
  });
  await revalidateTag(
    `posts`,
  );
  return response;
};

export const deletePost = async (postSlug: string) => {
  try {
    const session = await getSession();
    if (!session?.user.id || !session.user.roles.includes("Admin")) {
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