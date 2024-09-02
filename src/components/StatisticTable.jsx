import { DataGrid } from "@mui/x-data-grid";

export default function StatisticTable({ rows, product }) {
    const productCols = [
        {
            field: "name",
            headerName: "Товар",
            minWidth: 200,
            cellClassName: "font-bold",
            headerClassName: "text-[20px]",
        },
        {
            field: "amount",
            headerName: "Куплено",
            width: 200,
            cellClassName: "bg-green-500",
            headerClassName: "text-[20px]",
            renderCell: ({ value }) => <>{value}</>,
        },
        {
            field: "total",
            headerName: "Выручка",
            width: 100,
            cellClassName: "bg-green-500",
            headerClassName: "text-[20px]",
            renderCell: ({ value, row }) => {
                return <>{value} р.</>
            }
        },
    ];

    const tableCols = [
        {
            field: "table",
            headerName: "Стол",
            minWidth: 200,
            cellClassName: "font-bold",
            headerClassName: "text-[20px]",
        },
        {
            field: "price",
            headerName: "Выручка",
            minWidth: 200,
            cellClassName: "bg-green-500",
            headerClassName: "text-[20px]",
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
