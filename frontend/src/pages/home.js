import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import backgroundImage from './clothes.jpg';
import "./home.css";

function HomePage() {
    let navigate = useNavigate();

    const { state } = useLocation(); 
    const { user } = state || {};

    const handleProfile = () => {
        navigate('/profile', { state: { user: user } });
    };


    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div 
            className="d-flex flex-column min-vh-100" 
            style={{
                backgroundImage: `url(${backgroundImage})`, // Set the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="d-flex flex-column min-vh-100">
                {/* Header */}
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/home">Clothify</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} to="/viewcloth">Cloths</Nav.Link>
                            <Nav.Link as={Link} to="/addcloth">Add Cloths</Nav.Link>
                            <Nav.Link as={Link} to="/viewuser">All Users</Nav.Link>
                            <Nav.Link as={Link} to="/image">Cloth Fit</Nav.Link>
                            <Nav.Link as={Link} to="/daily">Daily Wear</Nav.Link>
                        </Nav>
                        <Button variant="outline-light" onClick={handleProfile}>Profile</Button>
                        <Button variant="outline-light" onClick={handleLogout}>Sign out</Button>
                    </Container>
                </Navbar>


                {/* Footer */}
                <footer className="footer bg-light mt-auto py-3">
                    <Container className='footer'>
                        <p className="text-center">&copy; 2024 My Website. All rights reserved.</p>
                    </Container>
                </footer>
            </div>
        </div>
    );
}

export default HomePage;
