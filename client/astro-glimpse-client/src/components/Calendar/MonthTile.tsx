import { CometCard } from "../ui/comet-card"

interface MonthTileProps {
    month: number;
    year: number;
}

export function MonthTile({ month, year }: MonthTileProps) {
    return (
        <CometCard>
            <h2 className="text-xl font-bold text-white">
            {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
            </h2>
        </CometCard>
    )
}