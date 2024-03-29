import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./AddCloth.css"; // Import CSS file for styling

export default function AddCloth() {
    const [Username, setUserName] = useState("");
    const [ClothName, setClothName] = useState("");
    const [ClothImage, setClothImage] = useState("");
    const [WearType, setWearType] = useState("");
    const [Casualty, setCasualty] = useState("");

    const wearTypeOptions = ["Top Wear", "Bottom Wear", "Innerwear"]; // Options for wear type dropdown
    const casualtyOptions = ["Low", "Medium", "High"]; // Options for casualty dropdown

    function sendData(e) {
        e.preventDefault();

        const newCloth = {
            Username,
            ClothName,
            ClothImage,
            WearType,
            Casualty
        };

        axios.post("http://localhost:5200/cloth/add", newCloth)
            .then(() => {
                alert("Cloth Details were recorded.");
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className="add-cloth-container">
            <Container>
                <div className="add-cloth-box">
                    <h2>Add Cloth</h2>
                    <Form onSubmit={sendData}>
                        <Form.Group controlId="userName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter User Name"
                                name="userName"
                                value={Username}
                                onChange={(e) => setUserName(e.target.value)} required
                            />
                        </Form.Group>

                        <Form.Group controlId="clothName">
                            <Form.Label>Cloth Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Cloth Name"
                                name="clothName"
                                value={ClothName}
                                onChange={(e) => setClothName(e.target.value)} required
                            />
                        </Form.Group>

                        <Form.Group controlId="clothImage">
                            <Form.Label>Cloth Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Cloth Image URL"
                                name="clothImage"
                                value={ClothImage}
                                onChange={(e) => setClothImage(e.target.value)} required
                            />
                        </Form.Group>

                        <Form.Group controlId="wearType">
                            <Form.Label>Wear Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={WearType}
                                onChange={(e) => setWearType(e.target.value)} required
                            >
                                <option value="">Select Wear Type</option>
                                {wearTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="casualty">
                            <Form.Label>Casualty</Form.Label>
                            <Form.Control
                                as="select"
                                value={Casualty}
                                onChange={(e) => setCasualty(e.target.value)}
                            >
                                <option value="">Select Casualty</option>
                                {casualtyOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}
