import { Prisma } from '@prisma/client';

export type MineralFullFieldset = Prisma.MineralGetPayload<{
    include: {
        photos: {
            take: 1,
            select: {
                photo: {
                    take: 1,
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
        associates: {
            select: {
                name: true,
                id: true,
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
        },
        associatedWith: {
            select: {
                name: true,
                id: true,
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

export type LocalityDisplayFieldset = Prisma.LocalityGetPayload<{
    select: {
        name: true,
        number: true,
        id: true,
        latitude: true,
        longitude: true,
        type: true,
        coordinates_known: true,
        photos: {
            take: 1,
            select: {
                title: true,
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
        },
        photos: {
            take: 3,
            select: {
                title: true,
                image: true,
                imageBlurhash: true,
            }
        }
    },
}>