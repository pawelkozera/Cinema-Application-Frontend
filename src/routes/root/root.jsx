import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { MantineProvider, Text } from '@mantine/core';
import './root.css'

export default function Root() {
    const { cinemaName } = useParams();
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedUser, setIsLoggedUser] = useState(false);
    const token = JSON.parse(localStorage.getItem('JWT'));

    const checkRole = async (role) => {
        try {
            const response = await fetch(`http://localhost:8080/api/checkRole?role=${role}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token.jwtToken}`
                }
            });
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRole = async () => {
            if (token) {
                const isAdmin = await checkRole('ADMIN');
                const isUser = await checkRole('USER');

                if (isAdmin) {
                    console.log("admin");
                    setIsAdmin(true);
                    setIsLoggedUser(false);
                    
                    if (!location.pathname.startsWith(`/${cinemaName}/admin`) && location.pathname !== '/') {
                        navigate(`${cinemaName}/admin/addmovie`);
                    }
                } else if (isUser) {
                    console.log("user");
                    setIsAdmin(false);
                    setIsLoggedUser(true);
                }
                else {
                    localStorage.removeItem('JWT');
                }
            }
        };

        fetchRole();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        setIsAdmin(false);
        setIsLoggedUser(false);
        navigate(`${cinemaName}/movies`);
    };

    return (
        <MantineProvider>
            {isAdmin ? (
                <div id="sidebar" style={{ display: location.pathname.startsWith(`/${cinemaName}/admin`) ? 'block' : 'none' }}>
                    <div className="title-container">
                        <div className='currentCinema'>
                            <ul className="nav-links">
                                <li>
                                    <Link to={`/`}>Wybierz kino</Link>
                                </li>
                            </ul>

                            <Text>Kino: {cinemaName}</Text>
                        </div>

                        <ul className="nav-links">
                            <li>
                                <Link to="#" onClick={handleLogout}>Wyloguj</Link>
                            </li>
                        </ul>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <Link to={`/${cinemaName}/admin/addmovie`}>Dodaj film</Link>
                            </li>
                            <li>
                                <Link to={`/${cinemaName}/admin/editmovie`}>Edytuj film</Link>
                            </li>
                            <li>
                                <Link to={`/${cinemaName}/admin/deletemovie`}>Usuń film</Link>
                            </li>
                            <li>
                                <Link to={`/${cinemaName}/admin/addmoviehours`}>Dodaj godziny</Link>
                            </li>
                            <li>
                                <Link to={`/${cinemaName}/admin/deletemoviehours`}>Usuń godziny</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            ) : isLoggedUser ? (
                <div id="sidebar" style={{ display: (location.pathname === '/' || location.pathname.startsWith(`/${cinemaName}/admin`)) ? 'none' : 'block' }}>
                    <div className="title-container">
                        <div className='currentCinema'>
                            <ul className="nav-links">
                                <li>
                                    <Link to={`/`}>Wybierz kino</Link>
                                </li>
                            </ul>

                            <Text>Kino: {cinemaName}</Text>
                        </div>

                        <ul className="nav-links">
                            <li>
                                <Link to={`${cinemaName}/account`}>Konto</Link>
                            </li>
                            <li>
                                <Link to="#" onClick={handleLogout}>Wyloguj</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <div id="sidebar" style={{ display: (location.pathname === '/' || location.pathname.startsWith(`/${cinemaName}/admin`)) ? 'none' : 'block' }}>
                    <div className="title-container">
                        <div className='currentCinema'>
                            <ul className="nav-links">
                                <li>
                                    <Link to={`/`}>Wybierz kino</Link>
                                </li>
                            </ul>

                            <Text>Kino: {cinemaName}</Text>
                        </div>

                        <ul className="nav-links">
                            <li>
                                <Link to={`${cinemaName}/login`}>Login</Link>
                            </li>
                            <li>
                                <Link to={`${cinemaName}/register`}>Rejestracja</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            
            <div id="sidebar" style={{ display: (location.pathname === '/' || location.pathname.startsWith(`/${cinemaName}/admin`)) ? 'none' : 'block' }}>
                <h1 class="title">Cinema</h1>
                
                <nav>
                    <ul>
                        <li>
                            <Link to={`${cinemaName}/movies`}>Repertuar</Link>
                        </li>
                        <li>
                            <Link to={`${cinemaName}/pricelist`}>Cennik</Link>
                        </li>
                        <li>
                            <Link to={`${cinemaName}/faq`}>FAQ</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div style={{ display: location.pathname === '/' ? 'block' : 'none' }}>
                <h1 class="title">Cinema</h1>
            </div>
            
            <div id="detail">
                <Outlet />
            </div>
        </MantineProvider>
    );
}

