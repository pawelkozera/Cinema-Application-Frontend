import { Outlet, Link } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import './root.css'

export default function Root() {
    return (
        <MantineProvider>
            <div id="sidebar">
                <div className="title-container">
                    <ul className="nav-links">
                        <li>
                            <Link to={`/`}>Wybierz kino</Link>
                        </li>
                    </ul>

                    <h1 class="title">Cinema</h1>

                    <ul className="nav-links">
                        <li>
                            <Link to={`/login`}>Login</Link>
                        </li>
                        <li>
                            <Link to={`/register`}>Rejestracja</Link>
                        </li>
                    </ul>
                </div>
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
            <div id="detail">
                <Outlet />
            </div>
        </MantineProvider>
    );
}

