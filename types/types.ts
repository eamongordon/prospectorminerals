export type MineralsFilterObj = {
    name: string | undefined,
    minHardness?: number | undefined,
    maxHardness?: number | undefined,
    lusters?: ("Silky" | "Vitreous" | "Waxy" | "Submetallic" | "Metallic" | "Resinous" | "Pearly" | "Greasy" | "Dull" | "Adamantine")[] | undefined,
    streaks?: string[] | undefined,
    mineralClasses?: ("Silicates" | "Phosphates" | "Carbonates" | "Sulfates" | "Sulfides" | "Halides" | "Oxides" | "Native Elements")[] | undefined,
    crystalSystems?: ("Tetragonal" | "Isometric" | "Hexagonal" | "Triclinic" | "Monoclinic" | "Trigonal" | "Orthorhombic")[] | undefined,
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