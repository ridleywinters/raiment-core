export type DatetimeVariant = "YYYY-MM-DD";

export function datetime(variant: DatetimeVariant): string {
    if (variant === "YYYY-MM-DD") {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    throw new Error(`Unsupported DatetimeVariant: ${variant}`);
}
