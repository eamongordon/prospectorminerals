export type LustersList = "Silky" | "Vitreous" | "Waxy" | "Submetallic" | "Metallic" | "Resinous" | "Pearly" | "Greasy" | "Dull" | "Adamantine";

export type MineralClassesList = "Silicates" | "Phosphates" | "Carbonates" | "Sulfates" | "Sulfides" | "Halides" | "Oxides" | "Native Elements";

export type CrystalSystemsList = "Tetragonal" | "Isometric" | "Hexagonal" | "Triclinic" | "Monoclinic" | "Trigonal" | "Orthorhombic";

export type MineralsFilterObj = {
    name?: string,
    minHardness?: number,
    maxHardness?: number,
    lusters?: LustersList[],
    streaks?: string[],
    mineralClasses?: MineralClassesList[],
    crystalSystems?: CrystalSystemsList[],
    chemistry?: string[],
    associates?: string[],
    id?: string
}

export type LocalitiesFilterObj = {
    name?: string,
    type_code?: string,
    latitude?: number,
    longitude?: number,
    minerals?: string[]
}

export type ArticlesFilterObj = {
    title?: string
}


export type LocalitiesQueryParams = {
    name?: string,
    type_code?: string,
    latitude?: number,
    longitude?: number,
    minerals?: {name: string, image: string}[]
}

export type mineralListItem = {
    name: string,
    image?: string
}

export type PhotosFilterObj = {
    name: string | undefined
}

export type PhotosSortObj = {
    property: string
    order: string
}