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
import type { LocalityDisplayFieldset, LocalityFullFieldset, MineralDisplayFieldset, MineralFullFieldset, PhotoDisplayFieldset, PhotoFullFieldset } from "@/types/prisma";

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
  if (!session?.user.id || !session.user.roles.includes("Admin")) {
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
    console.log("itemsArray");
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
    console.log("itemsArray");
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

export const createPhoto = async (
  formData: any,
  _id: unknown,
  key: string,
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

type FetchMineralsReturn<T extends string> = T extends 'full'
  ? { results: MineralFullFieldset[], next: number | undefined }
  : { results: MineralDisplayFieldset[], next: number | undefined };

const photoSelectObject = {
  select: {
    name: true,
    image: true,
    imageBlurhash: true,
  } satisfies Prisma.PhotoSelect
};

const photoExplicitSelectObject = {
  take: 1,
  select: { photo: photoSelectObject },
  orderBy: {
    featured: "desc"
  }
}

const photoSelectObjectWithLocality = {
  select: {
    name: true,
    image: true,
    imageBlurhash: true,
    locality: {
      select: {
        name: true
      }
    },
    locality_fallback: true,
    id: true
  } satisfies Prisma.PhotoSelect
};

const photoExplicitSelectObjectWithLocality = {
  take: 1,
  select: { photo: photoSelectObjectWithLocality },
  orderBy: {
    featured: "desc"
  }
}

const mineralDisplaySelectObj = {
  name: true,
  photos: photoExplicitSelectObject,
  number: true,
  id: true,
  slug: true,
} as Prisma.MineralSelect;

const mineralFullSelectObj = {
  ...mineralDisplaySelectObj,
  photos: {
    ...photoExplicitSelectObjectWithLocality,
    take: 3
  },
  hardness_max: true,
  hardness_min: true,
  crystal_system: true,
  mineral_class: true,
  chemical_formula: true,
  streak: true,
  lusters: true,
  description: true,
  uses: true,
  localities_description: true,
  associates: {
    select: {
      name: true,
      id: true,
      slug: true,
      photos: photoExplicitSelectObject
    }
  },
  associatedWith: {
    select: {
      name: true,
      id: true,
      slug: true,
      photos: photoExplicitSelectObject
    }
  }
} as Prisma.MineralSelect;

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
  const { name, minHardness, maxHardness, lusters, streaks, mineralClasses, crystalSystems, chemistry, associates, id, slug } = Object(filterObj);
  if (id) {
    queryArray.push({ id: { equals: id } });
  }
  if (slug) {
    queryArray.push({ slug: { equals: slug } });
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
    queryArray.push({
      lusters: {
        hasSome: lusters
      }
    })
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
    queryArray.push({
      OR: [
        { associates: { some: { OR: associatesArray } } },
        { associatedWith: { some: { OR: associatesArray } } } // Add this line for associatedWith
      ]
    });
  }
  let selectObj: Prisma.MineralSelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = mineralDisplaySelectObj satisfies Prisma.MineralSelect;
  } else if (fieldset === "full") {
    selectObj = mineralFullSelectObj satisfies Prisma.MineralSelect;
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

/*
type FetchUniqueMineralReturn<T extends string> = T extends 'full'
  ? MineralFullFieldset : MineralDisplayFieldset;

export async function fetchUniqueMineral<T extends string>(slug: string, fieldset?: T): Promise<FetchUniqueMineralReturn<T>> {
  let selectObj: Prisma.MineralSelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = mineralDisplaySelectObj satisfies Prisma.MineralSelect;
  } else if (fieldset === "full") {
    selectObj = mineralFullSelectObj satisfies Prisma.MineralSelect;
  }
  const result = await prisma.mineral.findUnique({
    where: {
      slug: slug
    },
    select: selectObj
  });
  return result as FetchUniqueMineralReturn<T>;
}
*/

const localityDisplaySelectObj = {
  name: true,
  number: true,
  id: true,
  slug: true,
  latitude: true,
  longitude: true,
  type: true,
  coordinates_known: true,
  photos: photoSelectObject
}

const localityFullSelectObj = {
  ...localityDisplaySelectObj,
  description: true,
  photos: photoSelectObjectWithLocality,
  minerals: { select: mineralDisplaySelectObj }
}


type FetchLocalitiesReturn<T extends string> = T extends 'full'
  ? { results: LocalityFullFieldset[], next: number | undefined }
  : { results: LocalityDisplayFieldset[], next: number | undefined };


export async function fetchLocalities<T extends string>({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj?: LocalitiesFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: string }): Promise<FetchLocalitiesReturn<T>> {
  let queryArray = [];
  const { name, minerals, id, slug } = Object(filterObj);
  if (id) {
    queryArray.push({ id: { equals: id } });
  }
  if (slug) {
    queryArray.push({ slug: { equals: slug } });
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
    queryArray.push({ minerals: { some: { OR: mineralsArray } } })
  }
  const cursorObj = !cursor ? undefined : { number: cursor };
  let selectObj;
  if (!fieldset || fieldset === "display") {
    selectObj = localityDisplaySelectObj satisfies Prisma.LocalitySelect;
  } else if (fieldset === "full") {
    selectObj = localityFullSelectObj satisfies Prisma.LocalitySelect;
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
  return {
    results: results,
    next: results.length === limit ? results[results.length - 1].number : undefined
  } as FetchLocalitiesReturn<T>;
};

/*
type FetchUniqueLocalityReturn<T extends string> = T extends 'full'
  ? LocalityFullFieldset : LocalityDisplayFieldset;

export async function FetchUniqueLocality<T extends string>({ slug, fieldset }: { slug: string, fieldset?: T }): Promise<FetchUniqueLocalityReturn<T>> {
  let selectObj: Prisma.LocalitySelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = localityDisplaySelectObj satisfies Prisma.LocalitySelect;
  } else if (fieldset === "full") {
    selectObj = localityFullSelectObj satisfies Prisma.LocalitySelect;
  }
  const result = await prisma.locality.findUnique({
    where: {
      slug: slug
    },
    select: selectObj
  });
  return result as FetchUniqueLocalityReturn<T>;
}
*/

export async function fetchPosts({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj?: ArticlesFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: string }) {
  let queryArray = [];
  const { title, id } = Object(filterObj)
  if (id) {
    queryArray.push({ id: { equals: id } });
  }
  if (title) {
    queryArray.push({ title: { contains: title, mode: 'insensitive' } });
  }
  const cursorObj = !cursor ? undefined : { number: cursor };
  let selectObj;
  if (!fieldset || fieldset === "display") {
    selectObj = {
      title: true,
      image: true,
      imageBlurhash: true,
      createdAt: true,
      number: true,
      description: true,
      id: true,
      slug: true
    }
  }
  const results = await prisma.post.findMany(
    {
      skip: !cursor ? 0 : 1,
      cursor: cursorObj,
      where: { AND: [{ published: true }, ...queryArray as Prisma.PostWhereInput[]] },
      select: selectObj,
      orderBy: [
        sortObj ? { [sortObj.property]: sortObj.order } : {},
        {
          publishedAt: "desc",
        },
        {
          number: "asc",
        }
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


type FetchPhotosReturn<T extends string> = T extends 'full'
  ? { results: PhotoFullFieldset[], next: number | undefined }
  : { results: PhotoDisplayFieldset[], next: number | undefined };

const photoDisplaySelectObject = {
  name: true,
  image: true,
  imageBlurhash: true,
  number: true,
  id: true,
  locality: {
    select: {
      name: true
    }
  },
  locality_fallback: true
} satisfies Prisma.PhotoSelect;

const photoFullSelectObject = {
  ...photoDisplaySelectObject,
  description: true,
  specimen_height: true,
  specimen_length: true,
  specimen_width: true,
  minerals: {
    select: {
      mineral: { select: mineralDisplaySelectObj }
    }
  }
} satisfies Prisma.PhotoSelect;

export async function fetchPhotos<T extends string>({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj: PhotosFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: string }): Promise<FetchPhotosReturn<T>> {
  if (!limit) {
    limit = 10;
  }
  let queryArray = [];
  const { name, id } = Object(filterObj);
  if (id) {
    queryArray.push({ id: { equals: id } });
  }
  if (name) {
    queryArray.push({ name: { contains: name, mode: 'insensitive' } });
  }
  const cursorObj = !cursor ? undefined : { number: cursor };
  let selectObj;
  if (!fieldset || fieldset === "display") {
    selectObj = photoDisplaySelectObject satisfies Prisma.PhotoSelect;
  } else {
    selectObj = photoFullSelectObject satisfies Prisma.PhotoSelect;
  }
  const results = await prisma.photo.findMany(
    {
      skip: !cursor ? 0 : 1,
      cursor: cursorObj,
      take: limit,
      where: { AND: queryArray as Prisma.PhotoWhereInput[] },
      select: selectObj,
      orderBy: [
        sortObj ? { [sortObj.property]: sortObj.order } : {},
        {
          number: "asc",
        },
      ],
      ...(limit ? { take: limit } : {}),
    }
  )
  /*
  let resultsCopy = [...results];
  if (results.length > 1) {
    resultsCopy.length = results.length - 1;
  }
  */
  return {
    results: results,
    next: results.length === limit ? results[results.length - 1].number : undefined
  } as FetchPhotosReturn<T>
};

/*
type FetchUniquePhotoReturn<T extends string> = T extends 'full'
  ? PhotoFullFieldset : PhotoDisplayFieldset;

export async function FetchUniquePhotoReturn<T extends string>({ id, fieldset }: { id: string, fieldset?: T }): Promise<FetchUniquePhotoReturn<T>> {
  let selectObj: Prisma.PhotoSelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = photoDisplaySelectObject satisfies Prisma.PhotoSelect;
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
  console.log(session);
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
  formData: any,
  slug: string,
  key: string,
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

export const deletePost = async (_: FormData, postSlug: string) => {
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