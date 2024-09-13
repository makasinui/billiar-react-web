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
import moment from "moment";
import getTableName from "../tableenum";

export default function AddProduct({ id, open, onClose, type, inputValue }) {
    const [currentList, setCurrentList] = useState(
        JSON.parse(localStorage.getItem(`list_${id}`)) ?? []
    );
    const [openModal, setOpenModal] = useState(false);
    const [amount, setAmount] = useState(0);
    const [item, setItem] = useState({});
    const [byTime, setByTime] = useState(0);
    const [stopTime, setStopTime] = useState(false);

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

    let text = getTableName(id);

    const allAmount = () => {
        let amount = currentList.map((item) => item.amount * item.price);
        
        amount = amount.reduce((acc, cur) => acc + cur, 0);
        amount = +amount + (+byTime)
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
        width: 700,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const clearItems = () => {
        localStorage.removeItem(`list_${id}`);
        localStorage.removeItem(`${id}_time`)
        localStorage.removeItem(`${id}_time_value`);
        localStorage.removeItem(`proccessable_${id}`);
        localStorage.removeItem(`${id}_startTime`);
        localStorage.removeItem(`${id}_moneyTime`)
        localStorage.removeItem(`${id}_moneyTime_value`)
        setCurrentList([]);
        handleClose();
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

    const SetTimer = () => {
        const [hours, setHours] = useState();
        const [min, setMin] = useState();
        const [sec, setSec] = useState();

        let countDownDate;
        if(localStorage.getItem(`${id}_time`)) {
            countDownDate = JSON.parse(localStorage.getItem(`${id}_time`));
            countDownDate = new Date(countDownDate).getTime();
            
        } else {
            countDownDate = new Date(new Date().getTime() + inputValue * 60000).getTime();
            localStorage.setItem(`${id}_time`, JSON.stringify(countDownDate));
            localStorage.setItem(`${id}_time_value`, inputValue);
        }
        setByTime((400 / 60) * (+localStorage.getItem(`${id}_time_value`)))
        
        const a = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;
            
            setByTime((400 / 60) * +localStorage.getItem(`${id}_time_value`));
            

            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSec(Math.floor((distance % (1000 * 60)) / 1000));
            
            if(distance < 0) {
                clearInterval(a)
                setByTime((400 / 60) * +localStorage.getItem(`${id}_time_value`));
            }
        }, 1000);
        return (
            <>
                {hours}:{min}:{sec}
            </>
        )
    };

    const SetFact = () => {
        const [hours, setHours] = useState();
        const [min, setMin] = useState();
        const [sec, setSec] = useState();

        let dateStart;
        if(localStorage.getItem(`${id}_startTime`)) {
            dateStart = localStorage.getItem(`${id}_startTime`)
        } else {
            localStorage.setItem(`${id}_startTime`, new Date());
        }

        const a = setInterval(() => {
            
            const date1 = moment(new Date());
            const date2 = moment(dateStart);
            const duration = moment.duration(date1.diff(date2))
            
            setHours(duration.hours());
            setMin(duration.minutes());
            setSec(duration.seconds());
            
            
        }, 1000);
        if(min) {
            setByTime(parseFloat((400 / 60) * min).toFixed())
        }
        if(stopTime) {
            clearInterval(a);
        }

        return (
            <>
            {hours} час: {min} мин: {sec} сек <br />
            <Button onClick={() => setStopTime(true)}>СТОП</Button>
            </>
        )
    }

    const SetMoney = () => {
        const [hours, setHours] = useState();
        const [min, setMin] = useState();
        const [sec, setSec] = useState();

        let countDownDate;
        if(localStorage.getItem(`${id}_moneyTime`)) {
            countDownDate = JSON.parse(localStorage.getItem(`${id}_moneyTime`));
            countDownDate = new Date(countDownDate).getTime();
            
        } else {
            const amountOfMin = parseFloat((inputValue / (400 / 60)).toFixed());
            console.log(amountOfMin)
            countDownDate = new Date(new Date().getTime() + amountOfMin * 60000).getTime();
            localStorage.setItem(`${id}_moneyTime`, JSON.stringify(countDownDate));
            localStorage.setItem(`${id}_moneyTime_value`, inputValue);
        }
        setByTime(localStorage.getItem(`${id}_moneyTime_value`))
        
        const a = setInterval(() => {
            const now = new Date().getTime();

            const distance = countDownDate - now;

            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMin(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSec(Math.floor((distance % (1000 * 60)) / 1000));
            
            if(distance < 0) {
                clearInterval(a)
            }
        }, 1000);
        return (
            <>
                {hours}:{min}:{sec}
            </>
        )
    }

    return (
        <>
            <Drawer
                sx={{ minWidth: "500px" }}
                anchor="right"
                open={open}
                onClose={handleClose}
            >
                
                <Typography align="center" fontSize="45px">
                    {text} <br />
                    {localStorage.getItem(`${id}_time`) || type === 'time' ? <SetTimer /> : ''} 
                    
                    {localStorage.getItem(`${id}_startTime`) || type === 'fact' ? <SetFact /> : ''}
                    {localStorage.getItem(`${id}_moneyTime`) || type === 'money' ? <SetMoney /> : ''} 
                </Typography>
                <Divider />
                <List>
                    {currentList.map((item) => (
                        <ListItem key={item.id}>
                            <div className="flex w-full justify-between">
                                <Badge
                                    badgeContent={item.amount}
                                    color="secondary"
                                    className="!text-[45px]"
                                >
                                    <Typography fontSize="44px">
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
                    <Typography fontSize={"44px"} textAlign={"center"}>
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
                    fontSize={"45px"}
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
                        sx={{ ...style, width: 700, height: 400 }}
                        className=""
                    >
                        <span
                            onClick={() => setOpenModal(false)}
                            className="cursor-pointer absolute right-0 text-[24px] -top-2"
                        >
                            ✕
                        </span>
                        <Typography align="center" fontSize={"45px"}>
                            Введите Количество
                        </Typography>
                        <div className="h-full flex flex-col gap-3 justify-center items-center">
                            <TextField
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                                label="Количество"
                                className="!text-[45px] p-[20]"
                                type="number"
                                sx={{fontSize: '45px'}}
                            />
                            <Button
                                className="!min-w-[100px] !max-w-[150px]"
                                fontSize="45px"
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
