import './Main.css';

import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import Fridge from '../../pages/Fridge/Fridge';
import NewFood from '../../pages/NewFood/NewFood';
import ShowFood from '../../pages/ShowFood/ShowFood';
import Notifications from '../../pages/Notifications/Notifications';
import Auth from '../../pages/Auth/Auth';
import TestApp from '../../pages/tests/TestApp';
import Error from '../../pages/Error/Error';

//TODO REMOVE TEST ROUTE
export default function Main() {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/fridge" element={<Fridge />} />
                <Route path="/fridge/new" element={<NewFood />} />
                <Route path="/fridge/:id" element={<ShowFood />} />
                <Route path="/feed" element={<Notifications />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/test" element={<TestApp />} />
                <Route path={"/*"} element={<Error />} />
            </Routes>
        </main>
    );
}