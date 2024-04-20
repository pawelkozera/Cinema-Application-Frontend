import { Outlet, Link } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import './root.css'

export default function Root() {
    return (
        <MantineProvider>
            <>
                <div id="sidebar">
                <h1>Cinema</h1>
                
                <nav>
                    <ul>
                    <li>
                        <Link to={`/`}>Movies</Link>
                    </li>
                    <li>
                        <Link to={`/`}>Pricelist</Link>
                    </li>
                    <li>
                        <Link to={`/`}>FAQ</Link>
                    </li>
                    <li>
                        <Link to={`/login`}>Login</Link>
                    </li>
                    <li>
                        <Link to={`/register`}>Register</Link>
                    </li>
                    </ul>
                </nav>
                </div>
                <div id="detail">
                    <Outlet />
                </div>
            </>
        </MantineProvider>
    );
  }