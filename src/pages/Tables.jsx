import { Link } from "react-router-dom";
import {
    Grid,
    Modal,
    Radio,
    Typography,
    RadioGroup,
    FormControlLabel,
    Box,
    FormControl,
    TextField,
} from "@mui/material";
import Button from "../components/Button";
import Card from "../components/Card";
import { useEffect, useRef, useState } from "react";
import AddProduct from "../components/AddProduct";

export default function Tables() {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [id, setId] = useState();
    const [value, setValue] = useState(1);
    const [refresh, setRefresh] = useState();
    const inputRef = useRef(null);

    const [amount, setAmount] = useState();
    const [type, setType] = useState();

    const handleClick = (id) => {
        if(localStorage.getItem(`proccessable_${id}`) === 'true') {
            setOpen(true)
            setId(id);
            return;
        }
        setOpenModal(true);
        setId(id);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        height: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const process = (typeFact) => {
        //console.log(value)
        if(typeFact === 'asd') {
            setType('fact')
        }
        setRefresh(new Date());
        setOpenModal(false);
        setOpen(true);
        localStorage.setItem(`proccessable_${id}`, 'true')
    };

    const GetContent = () => {
        setType(value === 1 ? 'time' : 'money');
        console.log(type)
        if (value === 1)
            return (
                <div style={{ fontSize: "45px" }}>
                    Введите время в минутах
                    <input
                        ref={inputRef}
                        className="w-full"
                        label="Время"
                    />
                </div>
            );

        if (value === 3)
            return (
                <div style={{ fontSize: "45px" }}>
                    Введите количество денег
                    <input
                        ref={inputRef}
                        className="w-full"
                        style={{outline: '1px solid black'}}
                        label="Деньги"
                    />
                </div>
            );
    };

    return (
        <div className="p-1 bg-blue-400">
            <Modal
                children={
                    <div className="absolute w-full h-full">
                        <Box
                            sx={{ ...style }}
                            className="flex gap-1 flex-col justify-between"
                        >
                            <Button onClick={() => setValue(1)}>
                                По времени
                            </Button>
                            <Button onClick={() => process('asd')}>По факту</Button>
                            <Button onClick={() => setValue(3)}>
                                По деньгам
                            </Button>
                            <GetContent />
                            <Button
                                className="w-full py-24 mt-12"
                                onClick={process}
                            >
                                ОК
                            </Button>
                        </Box>
                    </div>
                }
                open={openModal}
                onClose={() => setOpenModal(false)}
            />
            <AddProduct type={type} inputValue={inputRef?.current?.value} id={id} open={open} onClose={() => setOpen(false)} />
            <div className="">
                <div>
                    <Link to="/">
                        <Button fontSize="20px" className="!min-w-[150px] m-2">
                            Назад
                        </Button>
                    </Link>
                </div>
                <Grid display={"flex"} container spacing={2} className="py-6">
                    <Grid item xs={4}>
                        <Card
                            onClick={() => handleClick(1)}
                            name={"Стол 1"}
                            alt=""
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Card
                            onClick={() => handleClick(2)}
                            name={"Стол 7"}
                            className="pl-12"
                            alt=""
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Card
                            onClick={() => handleClick(3)}
                            src="/stol5.png"
                            alt=""
                            name={"2 Пул"}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Card
                            onClick={() => handleClick(4)}
                            src="/stol1.png"
                            alt=""
                            className={"rotate-90 mb-60 mt-44"}
                            textClassName={"-rotate-90"}
                            name={"1 Пул"}
                        />
                    </Grid>
                    <Grid item xs={4} justifyContent={"flex-end"}>
                        <Card
                            onClick={() => handleClick(5)}
                            className="absolute left-[1000px] top-[850px] rotate-90 ml-6"
                            textClassName={"-rotate-90"}
                            alt=""
                            name={"СТОЛ 3"}
                        />
                    </Grid>
                    <Grid item xs={4} justifyContent={"flex-end"}>
                        <Card
                            onClick={() => handleClick(6)}
                            className="absolute right-[400px] top-[400px] rotate-90 ml-6"
                            textClassName={"-rotate-90"}
                            alt=""
                            name={"VIP русс"}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Card
                            onClick={() => handleClick(7)}
                            src="/stol4.png"
                            className={"absolute top-[400px] right-20"}
                            alt=""
                            name={"VIP ПУЛ"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Card
                            onClick={() => handleClick(8)}
                            className="absolute w-[720px] top-[600px]"
                            src="/stol2.png"
                            alt=""
                            name={"2 СТОЛ"}
                        />
                    </Grid>
                    <Grid container xs={12} className="mt-48 gap-4">
                        <Grid item xs={2} className="">
                            <img
                                src="/bar.png"
                                className="w-[300px] h-full object-fill"
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <Card
                                onClick={() => handleClick(9)}
                                width={100}
                                height={100}
                                name={"Стол 8"}
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <Card
                                onClick={() => handleClick(10)}
                                width={100}
                                height={100}
                                name={"Стол 9"}
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <Card
                                onClick={() => handleClick(11)}
                                width={100}
                                height={100}
                                name={"Тен 3"}
                            />
                        </Grid>
                        <Grid item xs={1.5}>
                            <Card
                                onClick={() => handleClick(12)}
                                width={100}
                                height={100}
                                name={"Тен 4"}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
