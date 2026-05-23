import { CometCard } from "@/components/ui/CometCard"

export function WeekTiles() {
    return (
        <>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <CometCard key={d}>
                <div
                    style={{
                        backgroundImage: 'url("/tile-week.png")',
                        backgroundSize: "100% 102%",
                        objectFit: "cover",
                    }}
                    className="liquidGlassEffect"
                >
                    <span className="drop-shadow-[0_0_14px_rgba(255,255,255,0.35)]">
                        {d}
                    </span>
                </div>
            </CometCard>
            ))}
        </>
    );
}