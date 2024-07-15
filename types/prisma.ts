import { Prisma } from '@prisma/client';

export type MineralFullFieldset = Prisma.MineralGetPayload<{
    include: {
        photos: {
            take: 3,
            select: {
                photo: {
                    select: {
                        name: true,
                        image: true,
                        imageBlurhash: true,
                        id: true,
                        locality: {
                            select: {
                                name: true
                            }
                        },
                        locality_fallback: true,
                    }
                }
            },
            orderBy: {
                featured: "desc"
            }
        },
        associates: {
            select: {
                name: true,
                id: true,
                slug: true,
                photos: {
                    take: 1,
                    select: {
                        photo: {
                            select: {
                                name: true,
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
        },
        associatedWith: {
            select: {
                name: true,
                id: true,
                slug: true,
                photos: {
                    take: 1,
                    select: {
                        photo: {
                            select: {
                                name: true,
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
        }
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
                        name: true,
                        image: true,
                        imageBlurhash: true,
                    }
                }
            },
            orderBy: {
                featured: "desc"
            }
        },
        number: true,
        id: true,
        slug: true,
    }
}>
/*
export type MineralUniqueDisplayFieldset = Prisma.MineralGetPayload<{
    select: {
        name: true,
        photos: {
            take: 1,
            select: {
                photo: {
                    select: {
                        name: true,
                        image: true,
                        imageBlurhash: true,
                    }
                }
            },
            orderBy: {
                featured: "desc"
            }
        },
        number: true,
        id: true,
        slug: true,
        description: true,
    }
}>
*/
/*
export type LocalityUniqueDisplayFieldset = Prisma.LocalityGetPayload<{
    select: {
        name: true,
        number: true,
        id: true,
        slug: true,
        latitude: true,
        longitude: true,
        type: true,
        coordinates_known: true,
        photos: {
            take: 1,
            select: {
                name: true,
                image: true,
                imageBlurhash: true,
            }
        },
        description: true,
    }
}>
*/
export type LocalityDisplayFieldset = Prisma.LocalityGetPayload<{
    select: {
        name: true,
        number: true,
        id: true,
        slug: true,
        latitude: true,
        longitude: true,
        type: true,
        coordinates_known: true,
        photos: {
            take: 1,
            select: {
                name: true,
                image: true,
                imageBlurhash: true,
            }
        },
    }
}>

export type LocalityFullFieldset = Prisma.LocalityGetPayload<{
    include: {
        minerals: {
            select: {
                name: true,
                photos: {
                    take: 1,
                    select: {
                        photo: {
                            select: {
                                name: true,
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
                id: true,
                slug: true,
            }
        },
        photos: {
            take: 3,
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
            }
        }
    },
}>

/*
export type PhotoUniqueDisplayFieldset = Prisma.PhotoGetPayload<{
    select: {
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
        locality_fallback: true,
        description: true,
    }
}>
*/
export type PhotoDisplayFieldset = Prisma.PhotoGetPayload<{
    select: {
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
        locality_fallback: true,
    }
}>

export type PhotoFullFieldset = Prisma.PhotoGetPayload<{
    include: {
        locality: {
            select: {
                name: true
            }
        },
        minerals: {
            select: {
                mineral: {
                    select: {
                        name: true,
                        photos: {
                            select: {
                                photo: {
                                    select: {
                                        name: true,
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
                        id: true,
                        slug: true,
                    }
                }
            }
        }
    }
}>