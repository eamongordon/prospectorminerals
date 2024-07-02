import { Prisma } from '@prisma/client';

export type MineralFullFieldset = Prisma.MineralGetPayload<{
    include: {
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
    }
}>

export type MineralDisplayFieldset = Prisma.MineralGetPayload<{
    select: {
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
    }
}>