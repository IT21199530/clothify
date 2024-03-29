import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal, Form, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    const { state } = useLocation();
    const { user } = state || {};

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({});
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState(user);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // Fetch clothes data when the component mounts
        const getClothes = async () => {
            const id = user._id;
            try {
                const res = await axios.get(`http://localhost:5200/user/get/${id}`);
                setDetails(res.data.user);
            } catch (err) {
                alert(err.message);
            }
        };
        getClothes();
    }, [user]);

    const updateUserDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            name: name || values.name,
            email: email || values.email,
            contactNumber: contactNumber || values.contactNumber,
            password: password || values.password
        };

        axios.put(`http://localhost:5200/user/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("User Details Updated");
                handleClose();
                window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <Container>
            <h2 className="mt-4">Profile Details</h2>
            <Col>
                <Card className="mt-4">
                    <Card.Body>
                        <Card.Title>User Name: {details.name}</Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {details.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Contact Number:</strong> {details.contactNumber}
                        </Card.Text>
                        <Card.Text>
                            <strong>Password:</strong> {details.password}
                        </Card.Text>
                        <Button variant="primary" onClick={() => updateUserDetails(details)}>Update</Button>
                    </Card.Body>
                </Card>
                <Modal show={show} onHide={handleClose} className="getfunc">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={sendData}>
                            <Form.Group controlId="name">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" defaultValue={values.name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={values.email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="contactNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="text" defaultValue={values.contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" defaultValue={values.password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Button className="finalpay" type="submit">Edit details</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Container>
    );
}

export default ProfilePage;
