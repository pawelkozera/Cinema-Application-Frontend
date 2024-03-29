import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Cinema</h1>
          
          <nav>
            <ul>
              <li>
                <a href={`/login`}>Login</a>
              </li>
              <li>
                <a href={`/register`}>Register</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }