import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Main() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center h-full">
            <h1 className="text-[55px]">Бильярд</h1>
            <Link to="/products">
                <Button className="!min-w-[400px]">
                    товары
                </Button>
            </Link>
            <Link to="/tables">
                <Button className="!min-w-[400px]">
                    столы
                </Button>
            </Link>
            <Link to="/stats">
                <Button className="!min-w-[400px]">
                    статистика
                </Button>
            </Link>
        </div>
    );
}
