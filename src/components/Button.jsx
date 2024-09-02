import { Button as Btn } from "@mui/material";

export default function Button({
    children,
    className = "",
    startIcon = null,
    color = "primary",
    onClick = null,
    fontSize = "40px",
}) {
    return (
        <Btn
            className={`!min-w-[200px] ${className}`}
            size="large"
            sx={{
                fontSize: fontSize,
            }}
            color={color}
            startIcon={startIcon}
            variant="contained"
            onClick={onClick}
        >
            {children}
        </Btn>
    );
}
