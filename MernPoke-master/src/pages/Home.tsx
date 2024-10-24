// Filename - Home.jsx

// Importing Link from react-router-dom to 
// navigate to different end points.
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <>Home Page</>
            <br />
            <ul>
                <li>
                    {/* Endpoint to route to Home component */}
                    <Link to="/">Home</Link>
                </li>
                <li>
                    {/* Endpoint to route to About component */}
                    <Link to="/about">About</Link>
                </li>
                <li>
                    {/* Endpoint to route to Contact Us component */}
                    <Link to="/Play">Contact Us</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
