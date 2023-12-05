import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles'; // autofilalo mi je bez styles
import { themeSettings } from './theme'; // autofilalo bez ./

function App() {
    const mode = useSelector((state) => state.mode); // dohvaca initial state iz state/index.js
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token)); // ako token postoji onda je autoriziran korisnikj

    return (
        <div className="app">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {/* css reset za mui */}
                    <Routes>
                        <Route
                            path="/"
                            element={<LoginPage />}
                        />
                        <Route
                            path="/home"
                            element={isAuth ? <HomePage /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/profile/:userId"
                            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
