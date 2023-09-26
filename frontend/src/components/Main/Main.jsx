import './Main.css';

import { Routes, Route } from 'react-router-dom'

import Home from '../../pages/Home/Home';
import TestApp from '../../pages/tests/TestApp';

export default function Main() {

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<TestApp />} />
            </Routes>
        </main>
    );
}