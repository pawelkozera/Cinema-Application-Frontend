import { Outlet, Link } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import './root.css'

export default function Root() {
    return (
        <MantineProvider>
            <div id="sidebar">
                <div className="title-container">
                    <h1 class="title">Cinema</h1>
                    <ul className="nav-links">
                        <li>
                            <Link to={`/login`}>Login</Link>
                        </li>
                        <li>
                            <Link to={`/register`}>Register</Link>
                        </li>
                    </ul>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/`}>Movies</Link>
                        </li>
                        <li>
                            <Link to={`/pricelist`}>Pricelist</Link>
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

