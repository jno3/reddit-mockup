import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
const API_URL = "http://localhost:5000/user/logout";


function Navbar() {

    const logoutFunction = async () => {
        try {
            await axios.get(API_URL).then(
                localStorage.removeItem('user')
            ).catch((err) => {
                console.log(err);
            });
            alert('logged out successfully');
            document.location.href="/";
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <button>
                            Home
                        </button>
                    </Link>
                </li>
                <li>

                    <Link to="/register">
                        <button>
                            Register
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                </li>
                <li>
                    <button onClick={logoutFunction}>Logout</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;