import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import * as gameService from './services/gameService';
import { AuthContext } from './context/AuthContext';
import { GameContext } from './context/GameContext';

import Catalog from './components/Catalog/Catalog';
import CreateGame from './components/CreateGame/CreateGame';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import GameDetails from './components/GameDetails/GameDetails';
import Logout from './components/Logout/Logout';

import { useLocalStorage } from './hooks/useLocalStorage';



function App() {
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useLocalStorage('auth', {});
    const navigate = useNavigate();

    const userLogin = (authData) => {
        setAuth(authData);
    };

    const userLogout = () => {
        setAuth({});
    };

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(x => x._id === gameId);

            const comments = game.comments || [];
            comments.push(comment);

            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments }
            ];
        });
    };

    const addGameHandler = (gameData) => {
        setGames(state => [
            ...state,
            gameData
        ]);

        navigate('/catalog');
    };

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div className="app-wrapper">
                <Header />
                <GameContext.Provider value={{games, addGameHandler}}>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home games={games} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/create" element={<CreateGame />} />
                            <Route path="/catalog" element={<Catalog games={games} />} />
                            <Route path="/catalog/:gameId"
                                element={<GameDetails
                                    games={games}
                                    addComment={addComment}
                                />} />

                        </Routes>
                    </main>
                </GameContext.Provider>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
