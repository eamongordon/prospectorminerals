export type MineralsFilterObj = {
    name: string | undefined,
    minHardness?: number | undefined,
    maxHardness?: number | undefined,
    lusters?: string[] | undefined,
    streaks?: string[] | undefined,
    mineralClasses?: string[] | undefined,
    crystalSystems?: string[] | undefined,
    chemistry?: string[] | undefined,
    associates?: string[] | undefined
}

export type PhotosFilterObj = {
    name: string | undefined
}

export type PhotosSortObj = {
    property: string
    order: string
}