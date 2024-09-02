import {
    Badge,
    Divider,
    Drawer,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
    ButtonGroup,
    Button as Btn,
    Chip,
    Box,
    TextField,
} from "@mui/material";

import Modal from "@mui/material/Modal";
import { products, setProducts } from "../store";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Button from "./Button";

export default function AddProduct({ id, open, onClose }) {
    const [currentList, setCurrentList] = useState(
        JSON.parse(localStorage.getItem(`list_${id}`)) ?? []
    );
    const [openModal, setOpenModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const [item, setItem] = useState({});

    const handleClose = () => {
        setCurrentList([]);
        setAmount(0);
        setItem();
        onClose();
    };

    const addItem = () => {
        if (amount <= 0) {
            return;
        }
        let currentListClone = JSON.parse(JSON.stringify(currentList));
        const idx = currentList.findIndex((list) => list.id === item.id);
        //setCurrentList(currentList.filter((list) => list.id !== item.id));
        if (idx !== -1) {
            currentList[idx].amount = +amount;
        } else {
            if (currentList?.length) {
                setCurrentList((list) => [
                    ...list,
                    { ...item, amount: +amount },
                ]);
            } else {
                setCurrentList([{ ...item, amount: +amount }]);
            }
        }
        
        localStorage.setItem(
            `list_${id}`,
            JSON.stringify(currentList) ?? ""
        );
        setAmount(0);
    };

    useEffect(() => {
        if (currentList?.length)
            localStorage.setItem(`list_${id}`, JSON.stringify(currentList));
    }, [currentList]);

    let text = `Стол ${id}`;
    if (id === 13) {
        text = "Pool";
    }
    if (id === 10) {
        text = "Тен 3";
    }
    if (id === 11) {
        text = "Тен 4";
    }
    if (id === 12) {
        text = "Стол 10";
    }

    const allAmount = () => {
        let amount = currentList.map((item) => item.amount * item.price);
        amount = amount.reduce((acc, cur) => acc + cur, 0);
        return <span className="font-bold">{amount + " руб."}</span>;
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(`list_${id}`));
        if (items?.length) {
            setCurrentList(items);
        }
        if (!open) {
            handleClose();
        }
    }, [id, open]);

    const removeItemCount = (item, amount2) => {
        const cloned = JSON.parse(JSON.stringify(currentList));

        cloned.find((val) => val.id === item.id).amount = Math.max(
            amount2 - 1,
            1
        );
        setCurrentList(cloned);
        localStorage.setItem(`list_${id}`, JSON.stringify(cloned));
    };

    const addItemCount = (item, amount2) => {
        const cloned = JSON.parse(JSON.stringify(currentList));
        const original = products.find((val) => val.id === item.id);
        if (original.amount === amount2) {
            return;
        }
        cloned.find((val) => val.id === item.id).amount = amount2 + 1;
        setCurrentList(cloned);
        localStorage.setItem(`list_${id}`, JSON.stringify(cloned));
    };

    const deleteItem = (item) => {
        if (currentList?.length === 1) {
            setCurrentList([]);
            localStorage.setItem(`list_${id}`, JSON.stringify([]));
            return;
        }
        setCurrentList(currentList.filter((list) => list.id !== item.id));
        localStorage.setItem(`list_${id}`, JSON.stringify(currentList));
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const clearItems = () => {
        localStorage.removeItem(`list_${id}`);
        setCurrentList([]);
    };

    const handleDone = () => {
        const newProducts = products.map((item) => {
            const val = currentList.find((list) => list.id === item.id);
            if (val?.id) {
                item.amount -= val.amount;
                if (val.amount > item.amount) {
                    item.amount = 0;
                }
            }
            return item;
        });

        setProducts(newProducts);
        if (localStorage.getItem("stat")) {
            const stat = JSON.parse(localStorage.getItem("stat"));
            const lastId = stat[stat?.length]?.id ?? 1;
            const item = {
                id: lastId + 1,
                tableId: id,
                date: new Date(),
                products: currentList
            };
            
            stat.push(item);
            console.log(stat)
            localStorage.setItem("stat", JSON.stringify(stat));
            
        } else {
            const stat = [];
            
            const item = {
                id: 1,
                tableId: id,
                date: new Date(),
                products: currentList
            };
            
            stat.push(item);
            console.log(stat)
            localStorage.setItem("stat", JSON.stringify(stat));
        }
        clearItems();
        handleClose();
    };

    return (
        <>
            <Drawer
                sx={{ minWidth: "500px" }}
                anchor="right"
                open={open}
                onClose={handleClose}
            >
                <Typography align="center" fontSize="32px">
                    {text}
                </Typography>
                <Divider />
                <List>
                    {currentList.map((item) => (
                        <ListItem key={item.id}>
                            <div className="flex w-full justify-between">
                                <Badge
                                    badgeContent={item.amount}
                                    color="secondary"
                                >
                                    <Typography fontSize="24px">
                                        {item.name}
                                    </Typography>
                                </Badge>
                                <ButtonGroup>
                                    <Btn
                                        aria-label="reduce"
                                        onClick={() => {
                                            removeItemCount(item, item.amount);
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Btn>
                                    <Btn
                                        aria-label="increase"
                                        onClick={() => {
                                            addItemCount(item, item.amount);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Btn>
                                </ButtonGroup>
                                <IconButton
                                    onClick={() => deleteItem(item)}
                                    edge="end"
                                >
                                    <DeleteIcon color="dangerous" />
                                </IconButton>
                            </div>
                        </ListItem>
                    ))}
                </List>
                <div className="flex flex-col gap-2 px-4 pt-12">
                    <Typography fontSize={"24px"} textAlign={"center"}>
                        Добавить
                    </Typography>
                    {products.map((item) => (
                        <Chip
                            key={item.id}
                            size="medium"
                            onClick={() => {
                                setItem(item);
                                setOpenModal(true);
                            }}
                            className="!text-[20px]"
                            label={`${item.name} - ${item.amount}шт`}
                        />
                    ))}
                </div>
                <Typography
                    fontSize={"24px"}
                    className="pt-12 px-4"
                    textAlign={"left"}
                >
                    Итого: {allAmount()}
                </Typography>
                <Button
                    onClick={clearItems}
                    className="!mt-4 !mx-4"
                    color="error"
                >
                    Очистить
                </Button>
                <Button
                    onClick={handleDone}
                    className="!mt-4 !mx-4"
                    color="primary"
                >
                    Провести
                </Button>
            </Drawer>
            <Modal
                children={
                    <Box
                        sx={{ ...style, width: 300, height: 200 }}
                        className=""
                    >
                        <span
                            onClick={() => setOpenModal(false)}
                            className="cursor-pointer absolute right-0 text-[24px] -top-2"
                        >
                            ✕
                        </span>
                        <Typography align="center" fontSize={"20px"}>
                            Введите Количество
                        </Typography>
                        <div className="h-full flex flex-col gap-3 justify-center items-center">
                            <TextField
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                label="Количество"
                                type="number"
                            />
                            <Button
                                className="!min-w-[100px] !max-w-[150px]"
                                fontSize="15px"
                                onClick={() => {
                                    addItem();
                                    setOpenModal(false);
                                }}
                            >
                                ок
                            </Button>
                        </div>
                    </Box>
                }
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
}
