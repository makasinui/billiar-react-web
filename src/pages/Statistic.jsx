import { useState } from "react";
import {
    AppBar,
    MenuItem,
    Select,
    styled,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import Button from "../components/Button";
import { Link } from "react-router-dom";

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import StatisticTable from "../components/StatisticTable";
import dayjs from "dayjs";
import { endOfWeek, getWeek, startOfWeek } from "date-fns";
import * as dateFns from "date-fns";
import getTableName from "../tableenum";
export default function Statistic() {
    const [allStat, setAllStat] = useState(
        JSON.parse(localStorage.getItem("stat"))
    );
    // day, period
    const [selectedStat, setSelectedStat] = useState("day");
    const [tab, setTab] = useState(0);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
            className: index === tab ? "bg-black" : "",
        };
    }

    const getSummedArray = (arr) => {
        const summed = arr.reduce((acc, cur, i) => {
            const item = i > 0 && acc.find(({name}) => name === cur.name)
            if (item) {
                item.id = cur.id
                item.price = cur.price;
                item.amount += cur.amount;
                item.name = cur.name
                item.total = item.price * item.amount
            }
            else acc.push({ 
                name: cur.name, 
                id: cur.id, 
                price: cur.price, 
                amount: cur.amount,
                total: cur.amount * cur.price
            }); // don't push cur here
            return acc;
        }, []);
        
        return summed
    }

    const getSummedTables = (arr) => {
        const summed = arr.reduce((acc, cur, i) => {
            const item = i > 0 && acc.find(({tableId}) => tableId === cur.tableId)
            if (item) {
                item.price += cur.price;
                item.tableId = cur.tableId;
                item.table = cur.table;
                item.id = cur.tableId;

                } else acc.push({ 
                    tableId: cur.tableId, 
                    price: cur.price, 
                    table: cur.table, 
                    id: cur.tableId, 
                }); // don't push cur here
            return acc;
        }, []);

        return summed
    }

    const getPeriod = () => {
        let label;
        if (tab === 0) {
            label = "День";
        }
        if (tab === 1) {
            label = "Неделя";
        }
        if (tab === 2) {
            label = "Месяц";
        }
        if (tab === 3) {
            label = "Год";
        }
        return <>{label}</>;
    };

    const getRowStats = (product) => {
        if (!endDate) {
            if (tab === 0) {
                // current day
                const newStat = allStat.filter((item) => {
                    
                    if(dayjs(item.date).isSame(dayjs(), 'day')) {
                        return true;
                    }
                });
                if(product) {
                    const allProducts = newStat.map(item => (item.products));                  
                    const summed = getSummedArray(allProducts.flat())
                    return summed
                }
                
                const summed = newStat.map(item => ({products: {...getSummedArray(item.products).flat()}, tableId: item.tableId})).flat();
                
                summed.map(item => {
                    const products = Object.values(item.products).map(val => val.total);
                    item.table = getTableName(item.tableId);
                    item.price = products.reduce((acc,curr) => acc+curr, 0)
                })
                
                return getSummedTables(summed)
                
            }
            if (tab === 1) {
                // week
                const start = startOfWeek(new Date(), { weekStartsOn: 1 });
                const end = endOfWeek(new Date(), { weekStartsOn: 1 });
                const newStat = allStat.filter((item) => {
                    const date = dayjs(item.date);
                    
                    if (
                        (date.isAfter(start) || date.isSame(start, 'day')) &&
                        (date.isBefore(end) || date.isSame(end, 'day'))
                    ) {
                        return true;
                    }
                });

                if(product) {
                    const allProducts = newStat.map(item => (item.products));                  
                    const summed = getSummedArray(allProducts.flat())
                    return summed
                }
                
                const summed = newStat.map(item => ({products: {...getSummedArray(item.products).flat()}, tableId: item.tableId})).flat();
                
                summed.map(item => {
                    const products = Object.values(item.products).map(val => val.total);
                    item.table = getTableName(item.tableId);
                    item.price = products.reduce((acc,curr) => acc+curr, 0)
                })
                
                return getSummedTables(summed)
            }

            if(tab === 2) {
                const start = dateFns.startOfMonth(new Date(), { weekStartsOn: 1 });
                const end = dateFns.endOfMonth(new Date(), { weekStartsOn: 1 });
                const newStat = allStat.filter((item) => {
                    const date = dayjs(item.date);
                    
                    if (
                        (date.isAfter(start) || date.isSame(start, 'day')) &&
                        (date.isBefore(end) || date.isSame(end, 'day'))
                    ) {
                        return true;
                    }
                });

                if(product) {
                    const allProducts = newStat.map(item => (item.products));                  
                    const summed = getSummedArray(allProducts.flat())
                    return summed
                }
                
                const summed = newStat.map(item => ({products: {...getSummedArray(item.products).flat()}, tableId: item.tableId})).flat();
                
                summed.map(item => {
                    const products = Object.values(item.products).map(val => val.total);
                    item.table = getTableName(item.tableId);
                    item.price = products.reduce((acc,curr) => acc+curr, 0)
                })
                
                return getSummedTables(summed)
            }
            if(tab === 3) {
                let newStat = allStat.filter((item) => {
                    
                    if(dayjs(item.date).isSame(dayjs(), 'year')) {
                        return true;
                    }
                });

                if(product) {
                    const allProducts = newStat.map(item => (item.products));                  
                    const summed = getSummedArray(allProducts.flat())
                    return summed
                }

                const summed = newStat.map(item => ({products: {...getSummedArray(item.products).flat()}, tableId: item.tableId})).flat();
                
                summed.map(item => {
                    const products = Object.values(item.products).map(val => val.total);
                    item.table = getTableName(item.tableId);
                    item.price = products.reduce((acc,curr) => acc+curr, 0)
                })
                
                return getSummedTables(summed)
            }
        }
        if(endDate) {
                const start = startDate;
                const end = endDate;
                const newStat = allStat.filter((item) => {
                    const date = dayjs(item.date);
                    
                    if (
                        (date.isAfter(start) || date.isSame(start, 'day')) &&
                        (date.isBefore(end) || date.isSame(end, 'day'))
                    ) {
                        return true;
                    }
                });

                if(product) {
                    const allProducts = newStat.map(item => (item.products));                  
                    const summed = getSummedArray(allProducts.flat())
                    return summed
                }
                
                const summed = newStat.map(item => ({products: {...getSummedArray(item.products).flat()}, tableId: item.tableId})).flat();
                
                summed.map(item => {
                    const products = Object.values(item.products).map(val => val.total);
                    item.table = getTableName(item.tableId);
                    item.price = products.reduce((acc,curr) => acc+curr, 0)
                })
                
                return getSummedTables(summed)
        }
        
    };
    getRowStats();
    registerLocale(ru);
    return (
        <div className="p-1">
            <div className="flex gap-4 items-center">
                <Link to="/">
                    <Button fontSize="24px" className="m-1">
                        Назад
                    </Button>
                </Link>
                <Typography fontSize="30px">Статистика</Typography>
            </div>

            {allStat?.length ? (
                <div className="flex flex-col w-full p-1">
                    <div
                        position="static"
                        className="flex items-center justify-center rounded-full"
                    >
                        <Tabs
                            value={tab}
                            onChange={(e, v) => setTab(v)}
                            TabIndicatorProps={{ style: { marginTop: "35px" } }}
                            className="bg-gray-300 rounded-full"
                            variant="fullWidth"
                            textColor="white"
                        >
                            <Tab label="День" {...a11yProps(0)} />
                            <Tab label="Неделя" {...a11yProps(1)} />
                            <Tab label="Месяц" {...a11yProps(2)} />
                            <Tab label="Год" {...a11yProps(3)} />
                        </Tabs>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div className="basis-[30%]"></div>
                        <Typography fontSize="30px" className="basis-1/3">
                            Статистика за период: <br />
                            {endDate
                                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                : getPeriod()}
                        </Typography>
                        <DatePicker
                            showIcon
                            className="border-3 border-black"
                            selected={startDate}
                            placeholderText="Выберите дату"
                            onChange={handleChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            locale={ru}
                        />
                    </div>
                    <div className="flex gap-3 justify-between px-12 py-4 bg-blue-300 min-h-[500px]">
                        <div className="flex flex-col">
                            <Typography
                                className="text-center"
                                fontSize={"25px"}
                            >
                                Статистика по товарам
                            </Typography>
                            <StatisticTable rows={getRowStats(true)} product />
                        </div>
                        <div className="flex flex-col ">
                            <Typography
                                className="text-center"
                                fontSize={"25px"}
                            >
                                Статистика по столам
                            </Typography>
                            <StatisticTable rows={getRowStats(false)} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="p-1">
                    <Typography
                        className="content-center text-center"
                        fontSize={"30px"}
                    >
                        Пока что нет статистик...
                    </Typography>
                </div>
            )}
        </div>
    );
}
