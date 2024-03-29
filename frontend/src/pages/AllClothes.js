import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function ViewClothes() {
    const [values, setValues] = useState([]);
    const [Username, setUserName] = useState("");
    const [ClothName, setClothName] = useState("");
    const [ClothImage, setClothImage] = useState("");
    const [WearType, setWearType] = useState("");
    const [Casualty, setCasualty] = useState("");
    const [clothes, setClothes] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        function getClothes() {
            axios.get("http://localhost:5200/cloth/").then((res) => {
                setClothes(res.data);
            }).catch((err) => {
                alert(err.message);
            });
        }
        getClothes();
    }, []);

    const deleteClothes = (id) => {
        axios.delete(`http://localhost:5200/cloth/delete/${id}`);
        alert("Cloth Details deleted.");
    };

    const updateClothDetails = (val) => {
        setValues(val);
        handleShow();
    };

    function sendData(e) {
        e.preventDefault();

        const updatedValues = {
            id: values._id,
            Username: Username || values.Username,
            ClothName: ClothName || values.ClothName,
            ClothImage: ClothImage || values.ClothImage,
            WearType: WearType || values.WearType,
            Casualty: Casualty || values.Casualty
        };

        axios.put(`http://localhost:5200/cloth/update/${updatedValues.id}`, updatedValues)
            .then(() => {
                alert("Cloth Details Updated");
                handleClose();
            }).catch((err) => {
                console.log(err);
                alert(err);
            });
    }

    return (
        <div>
            <h1>All Cloth Details</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {clothes.map((val, key) => (
                    <Col key={key}>
                        <Card className="h-100">
                            <Card.Img variant="top" src={val.ClothImage} style={{ objectFit: 'cover', height: '200px' }} />
                            <Card.Body>
                                <Card.Text>
                                <strong>Item Name:</strong> {val.ClothName}<br />
                                    <strong>Wear Type:</strong> {val.WearType}<br />
                                    <strong>Casualty:</strong> {val.Casualty}
                                </Card.Text>
                                <Button variant="primary" onClick={() => updateClothDetails(val)}>Update</Button>
                                <Button variant="danger" onClick={() => deleteClothes(val._id)} className="ml-2">Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={show} onHide={handleClose} className="getfunc">
                <Modal.Header closeButton>
                    <Modal.Title>Update Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={sendData}>

                        <Form.Group controlId="clothName">
                            <Form.Label>Cloth Name</Form.Label>
                            <Form.Control type="text" defaultValue={values.ClothName} onChange={(e) => setClothName(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="clothImage">
                            <Form.Label>Cloth Image</Form.Label>
                            <Form.Control type="text" defaultValue={values.ClothImage} onChange={(e) => setClothImage(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="wearType">
                            <Form.Label>Wear Type</Form.Label>
                            <Form.Control type="text" defaultValue={values.WearType} onChange={(e) => setWearType(e.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="casualty">
                            <Form.Label>Casualty</Form.Label>
                            <Form.Control type="text" defaultValue={values.Casualty} onChange={(e) => setCasualty(e.target.value)} required />
                        </Form.Group>

                        <Button className="finalpay" type="submit">Edit details</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
                };
