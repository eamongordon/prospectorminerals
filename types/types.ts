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
    associates?: string[] | MineralListItem[],
    id?: string,
    slug?: string
}

export type LocalitiesFilterObj = {
    name?: string,
    type_code?: string,
    latitude?: number,
    longitude?: number,
    minerals?: string[],
    id?: string,
    slug?: string
}

export type ArticlesFilterObj = {
    title?: string,
    id?: string
}


export type LocalitiesQueryParams = {
    name?: string,
    type_code?: string,
    latitude?: number,
    longitude?: number,
    minerals?: {name: string, image: string}[]
}

export type MineralListItem = {
    name: string,
    image?: string,
    slug?: string,
}

export type PhotosFilterObj = {
    name?: string,
    id?: string
}

export type PhotosSortObj = {
    property: string
    order: string
}