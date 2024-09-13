import { Card as Crd, CardContent, Typography } from "@mui/material";

export default function Card({
    name,
    width,
    height,
    onClick,
    className,
    textClassName
}) {
    return (
        <Crd
            onClick={onClick}
            sx={{ minWidth: 100, minHeight: 240 }}
            className={`!bg-green-700 !text-white cursor-pointer flex items-center justify-center ${className}`}
        >
            <CardContent className="h-full flex justify-center items-center">
                <Typography sx={{ fontSize: 60 }} className={textClassName}>{name}</Typography>
            </CardContent>
        </Crd>
    );
}
