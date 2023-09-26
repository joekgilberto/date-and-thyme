import './Main.css';

import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import Fridge from '../../pages/Fridge/Fridge';
import NewFood from '../../pages/NewFood/NewFood';
import TestApp from '../../pages/tests/TestApp';
import Error from '../../pages/Error/Error';

export default function Main() {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fridge" element={<Fridge />} />
                <Route path="/fridge/new" element={<NewFood />} />
                <Route path="/test" element={<TestApp />} />
                <Route path={"/*"} element={<Error />} />
            </Routes>
        </main>
    );
}