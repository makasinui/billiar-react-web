import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Button from "../components/Button";
import Card from "../components/Card";
import { useState } from "react";
import AddProduct from "../components/AddProduct";

export default function Tables() {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();

    const handleClick = (id) => {
        setOpen(true);
        setId(id);
    }

    return (
        <div className="p-1 bg-orange-300">
            <AddProduct id={id} open={open} onClose={() => setOpen(false)} />
            <div className="">
                <div>
                    <Link to="/">
                        <Button fontSize="20px" className="!min-w-[150px] m-2">
                            Назад
                        </Button>
                    </Link>
                </div>
                <Grid display={'flex'} container spacing={2} className="py-6">
                    <Grid item xs={4}>
                        <img onClick={() => handleClick(7)} src="/stol7.png" alt="" />
                    </Grid>
                    <Grid item xs={4}>
                        <img onClick={() => handleClick(13)} className="pl-12" src="/pool.png" alt="" />
                    </Grid>
                    <Grid item xs={4}>
                        <img onClick={() => handleClick(5)} src="/stol5.png" alt="" />
                    </Grid>
                    <Grid item xs={4}>
                        <img onClick={() => handleClick(1)} src="/stol1.png" alt="" />
                    </Grid>
                    <Grid item xs={4} justifyContent={'flex-end'}>
                        <img onClick={() => handleClick(3)} className="absolute mt-12 ml-6" src="/stol3.png" alt="" />
                    </Grid>
                    <Grid item xs={4}>
                        <img onClick={() => handleClick(4)} src="/stol4.png" alt="" />
                    </Grid>
                    <Grid item xs={12}>
                        <img onClick={() => handleClick(2)} className="" src="/stol2.png" alt="" />
                    </Grid>
                    <Grid item xs={4}>
                        <img src="/bar.png" className="w-[300px] h-full object-fill" />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Card onClick={() => handleClick(8)} width={100} height={100} name={'Стол 8'} />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Card onClick={() => handleClick(9)} width={100} height={100} name={'Стол 9'} />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Card onClick={() => handleClick(10)} width={100} height={100} name={'Тен 3'} />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Card onClick={() => handleClick(11)} width={100} height={100} name={'Тен 4'} />
                    </Grid>
                    <Grid item xs={1.5}>
                        <Card onClick={() => handleClick(12)} width={100} height={100} name={'Стол 10'} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
