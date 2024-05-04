import { Outlet, Link, useLocation } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import './root.css'

export default function Root() {
    const location = useLocation();

    return (
        <MantineProvider>
            <div id="sidebar" style={{ display: location.pathname === '/' ? 'none' : 'block' }}>
                <div className="title-container">
                    <ul className="nav-links">
                        <li>
                            <Link to={`/`}>Wybierz kino</Link>
                        </li>
                    </ul>

                    <ul className="nav-links">
                        <li>
                            <Link to={`/login`}>Login</Link>
                        </li>
                        <li>
                            <Link to={`/register`}>Rejestracja</Link>
                        </li>
                    </ul>
                </div>

                <h1 class="title">Cinema</h1>
                
                <nav>
                    <ul>
                        <li>
                            <Link to={`/movies`}>Repertuar</Link>
                        </li>
                        <li>
                            <Link to={`/pricelist`}>Cennik</Link>
                        </li>
                        <li>
                            <Link to={`/faq`}>FAQ</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div style={{ display: location.pathname !== '/' ? 'none' : 'block' }}>
                <h1 class="title">Cinema</h1>
            </div>
            
            <div id="detail">
                <Outlet />
            </div>
        </MantineProvider>
    );
}

