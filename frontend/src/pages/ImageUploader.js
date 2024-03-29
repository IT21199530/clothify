import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function ImageUploader() {
    const [files, setFiles] = useState([null, null]);
    const [analyses, setAnalyses] = useState([null, null]);

    const handleFileChange = (e, index) => {
        const updatedFiles = [...files];
        updatedFiles[index] = e.target.files[0];
        setFiles(updatedFiles);
    };

    const handleUpload = async (index) => {
        try {
            const formData = new FormData();
            formData.append('image', files[index]);

            const response = await axios.post('http://localhost:5200/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const updatedAnalyses = [...analyses];
            updatedAnalyses[index] = response.data.labels;
            setAnalyses(updatedAnalyses);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Upload Bottom Wear Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e, 0)} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleUpload(0)}>Analyze Bottom Wear</Button>
                    {analyses[0] && (
                        <div className="mt-3">
                            <h2>Bottom Wear Analysis Results:</h2>
                            <ListGroup>
                                {analyses[0].map((label, labelIndex) => (
                                    <ListGroup.Item key={labelIndex}>{label}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Upload Top Wear Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e, 1)} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleUpload(1)}>Analyze Top Wear</Button>
                    {analyses[1] && (
                        <div className="mt-3">
                            <h2>Top Wear Analysis Results:</h2>
                            <ListGroup>
                                {analyses[1].map((label, labelIndex) => (
                                    <ListGroup.Item key={labelIndex}>{label}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ImageUploader;
