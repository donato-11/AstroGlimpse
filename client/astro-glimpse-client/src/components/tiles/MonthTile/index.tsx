import { CometCard } from "@/components/ui/CometCard";

interface MonthTileProps {
    month: number;
    year: number;
}

export function MonthTile({ month, year }: MonthTileProps) {
    return (
        <CometCard>
            <div className="text-xl font-normal text-white capitalize liquidGlassEffect p-4 rounded-lg "
                style={{
                backgroundImage: 'url("/tile-month.png")',
                backgroundSize: "100% 102%", // Somehow increasing this gives the background image a 3d effect
                objectFit: "cover",
                }}
            >
                <p className="drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {new Date(year, month).toLocaleString("en-US", { month: "long", year: "numeric" })}
                </p>
            </div>
        </CometCard>
    )
}