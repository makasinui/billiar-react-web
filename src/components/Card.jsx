import { Card as Crd, CardContent, Typography } from "@mui/material";

export default function Card({
    name,
    width,
    height,
    onClick
}) {
    return (
        <Crd
            onClick={onClick}
            sx={{ minWidth: width, minHeight: height, maxWidth: width }}
            className="!bg-blue-200 cursor-pointer flex items-center justify-center"
        >
            <CardContent className="h-full flex justify-center items-center">
                <Typography sx={{ fontSize: 20 }}>{name}</Typography>
            </CardContent>
        </Crd>
    );
}
