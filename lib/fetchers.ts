import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import type { ArticlesFilterObj, LocalitiesFilterObj, MineralsFilterObj, PhotosFilterObj, PhotosSortObj } from "@/types/types";
import { Prisma } from '@prisma/client';
import type { LocalityDisplayFieldset, LocalityFullFieldset, MineralDisplayFieldset, MineralFullFieldset, PhotoDisplayFieldset, PhotoFullFieldset } from "@/types/prisma";

export async function getPostData(slug: string) {
  return await unstable_cache(
    async () => {
      const data = await prisma.post.findFirst({
        where: {
          slug,
          published: true,
        }
      });

      if (!data) return null;

      const transformedContent = getTransformedContent(data.content!);

      return {
        ...data,
        transformedContent
      };
    },
    [`post-${slug}`],
    {
      revalidate: 900, // 15 minutes
      tags: [`post-${slug}`],
    },
  )();
}

const getTransformedContent = (postContents: string): string =>
  // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
  // https://mdxjs.com/docs/what-is-mdx/#markdown
  postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";

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
const mineralUniqueDisplayObject = {
  ...mineralDisplaySelectObj,
  description: true,
} as Prisma.MineralSelect;

type FetchUniqueMineralReturn<T extends string> = T extends 'full'
  ? MineralFullFieldset : MineralUniqueDisplayFieldset;

export async function fetchUniqueMineral<T extends string>(slug: string, fieldset?: T): Promise<FetchUniqueMineralReturn<T>> {
  let selectObj: Prisma.MineralSelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = mineralUniqueDisplayObject satisfies Prisma.MineralSelect;
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


export async function fetchLocalities<T extends string>({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj?: LocalitiesFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: T }): Promise<FetchLocalitiesReturn<T>> {
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
const localityUniqueDisplayObject = {
  ...localityDisplaySelectObj,
  description: true,
}

type FetchUniqueLocalityReturn<T extends string> = T extends 'full'
  ? LocalityFullFieldset : LocalityUniqueDisplayFieldset;

export async function FetchUniqueLocality<T extends string>(slug: string, fieldset?: T): Promise<FetchUniqueLocalityReturn<T>> {
  let selectObj: Prisma.LocalitySelect | undefined;
  if (!fieldset || fieldset === 'display') {
    selectObj = localityUniqueDisplayObject satisfies Prisma.LocalitySelect;
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

export async function fetchPhotos<T extends string>({ filterObj, cursor, limit, sortObj, fieldset }: { filterObj: PhotosFilterObj, cursor?: number, limit?: number, sortObj?: PhotosSortObj, fieldset?: T }): Promise<FetchPhotosReturn<T>> {
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