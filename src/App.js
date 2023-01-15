import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as gameService from './services/gameService';

import Catalog from './components/Catalog/Catalog';
import CreateGame from './components/CreateGame/CreateGame';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';



function App() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <div className="app-wrapper">
            <Header />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home games={games}/>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/create" element={<CreateGame />} />
                    <Route path="/catalog" element={<Catalog games={games} />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
