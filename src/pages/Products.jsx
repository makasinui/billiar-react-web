import {
    
    GridRowModes,
    DataGrid,
    
    GridToolbarContainer,
    GridActionsCellItem,
    
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { products } from "../store";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Products() {
    const [rowModesModel, setRowModesModel] = useState({});
    const [rows, setRows] = useState(products);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(rows));
    }, [rows]);

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = rows[rows.length - 1].id + 1;
            console.log(id);
            setRows((oldRows) => [
                ...oldRows,
                { id, name: "", price: 0, amount: 0 },
            ]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
            }));
        };

        return (
            <GridToolbarContainer>
                <Button
                    className="!text-[15px] !min-w-[10px]"
                    startIcon={<AddIcon />}
                    onClick={handleClick}
                    color="primary"
                >
                    Добавить новый товар
                </Button>
            </GridToolbarContainer>
        );
    }

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const columns = [
        {
            field: "name",
            headerName: "Товар",
            minWidth: 900,
            editable: true,
            cellClassName: "font-bold text-[56px]",
            headerClassName: "text-[65px]",
            hideable: true,
        },
        {
            field: "price",
            headerName: "Цена",
            width: 280,
            cellClassName: "bg-green-500 text-[55px]",
            headerClassName: "text-[65px]",
            editable: true,
            renderCell: ({ value }) => <>{value} р.</>,
        },
        {
            field: "amount",
            headerName: "Кол-во",
            width: 280,
            cellClassName: "bg-green-400 text-[55px]",
            headerClassName: "text-[65px]",
            editable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "",
            minWidth: 250,
            headerClassName: "text-[45px]",
            cellClassName: "actions",
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={
                            <Button className="!text-[50px]" color="error">
                                Удалить
                            </Button>
                        }
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow };
        setRows(rows.map(row => row.id === updatedRow.id ? {...updatedRow} : row));
        
        return updatedRow;
    }

    const handleEdit = ({row}) => {
        console.log(row)
    }
    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
      };

    return (
        <div className="flex flex-col">
            <Link to="/" className="p-3 max-w-[50px]">
                <Button className="!min-w-[200px]" fontSize="25px">
                    вернуться
                </Button>
            </Link>

            <DataGrid
                editMode="row"
                processRowUpdate={processRowUpdate}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                rows={rows}
                columns={columns}
                sx={{
                    fontSize: "35px",
                }}
                slots={{
                    toolbar: EditToolbar,
                }}
                onCellEditStop={handleEdit}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                hideFooterPagination
                disableRowSelectionOnClick
            />
        </div>
    );
}
