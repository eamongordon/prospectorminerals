export type LustersList = "Silky" | "Vitreous" | "Waxy" | "Submetallic" | "Metallic" | "Resinous" | "Pearly" | "Greasy" | "Dull" | "Adamantine";

export type MineralClassesList = "Silicates" | "Phosphates" | "Carbonates" | "Sulfates" | "Sulfides" | "Halides" | "Oxides" | "Native Elements";

export type CrystalSystemsList = "Tetragonal" | "Isometric" | "Hexagonal" | "Triclinic" | "Monoclinic" | "Trigonal" | "Orthorhombic";

export type MineralsFilterObj = {
    name: string | undefined,
    minHardness?: number | undefined,
    maxHardness?: number | undefined,
    lusters?: LustersList[] | undefined,
    streaks?: string[] | undefined,
    mineralClasses?: MineralClassesList[] | undefined,
    crystalSystems?: CrystalSystemsList[] | undefined,
    chemistry?: string[] | undefined,
    associates?: string[] | undefined
}

export type LocalitiesFilterObj = {
    name: string | undefined,
    associates?: string[] | undefined
}


export type PhotosFilterObj = {
    name: string | undefined
}

export type PhotosSortObj = {
    property: string
    order: string
}