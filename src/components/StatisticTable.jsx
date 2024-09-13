import { DataGrid } from "@mui/x-data-grid";

export default function StatisticTable({ rows, product }) {
    const productCols = [
        {
            field: "name",
            headerName: "Товар",
            minWidth: 600,
            cellClassName: "font-bold text-[45px]",
            headerClassName: "text-[20px] text-[45px]",
        },
        {
            field: "amount",
            headerName: "Куплено",
            width: 500,
            cellClassName: "bg-green-500 text-[45px]",
            headerClassName: "text-[20px] text-[45px]",
            renderCell: ({ value }) => <>{value}</>,
        },
        {
            field: "total",
            headerName: "Выручка",
            width: 540,
            cellClassName: "bg-green-500 text-[45px]",
            headerClassName: "text-[20px] text-[45px]",
            renderCell: ({ value, row }) => {
                return <>{value} р.</>
            }
        },
    ];

    const tableCols = [
        {
            field: "table",
            headerName: "Стол",
            minWidth: 600,
            cellClassName: "font-bold text-[45px]",
            headerClassName: "text-[20px] text-[45px]",
        },
        {
            field: "price",
            headerName: "Выручка",
            minWidth: 800,
            cellClassName: "bg-green-500 text-[45px]",
            headerClassName: "text-[20px] text-[45px]",
            editable: true,
            renderCell: ({ value }) => <>{value} р.</>,
        }
    ]
    return (
        <DataGrid
            columns={product ? productCols : tableCols}
            sx={{
                fontSize: "24px",
                
            }}
            density="comfortable"
            rows={rows}
            hideFooterPagination
            hideFooter
            disableRowSelectionOnClick
        />
    );
}
