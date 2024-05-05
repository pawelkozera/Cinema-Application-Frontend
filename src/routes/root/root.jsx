import { Outlet, Link, useLocation } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import './root.css'

export default function Root() {
    const location = useLocation();

    return (
        <MantineProvider>
            <div id="sidebar" style={{ display: (location.pathname === '/' || location.pathname.startsWith('/admin')) ? 'none' : 'block' }}>
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

            <div style={{ display: location.pathname === '/' ? 'block' : 'none' }}>
                <h1 class="title">Cinema</h1>
            </div>

            <div id="sidebar" style={{ display: location.pathname.startsWith('/admin') ? 'block' : 'none' }}>
                <h1 class="title">Cinema</h1>
                
                <nav>
                    <ul>
                        <li>
                            <Link to={`admin/addmovie`}>Dodaj film</Link>
                        </li>
                        <li>
                            <Link to={`/admin/editmovie`}>Edytuj film</Link>
                        </li>
                        <li>
                            <Link to={`/admin/deletemovie`}>Usuń film</Link>
                        </li>
                        <li>
                            <Link to={`/admin/addmoviehours`}>Dodaj godziny</Link>
                        </li>
                        <li>
                            <Link to={`/admin/deletemoviehours`}>Usuń godziny</Link>
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

