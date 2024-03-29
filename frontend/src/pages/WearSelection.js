import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function DailyWear() {
    const [dailyWear, setDailyWear] = useState([]);

    useEffect(() => {
        generateDailyWear();
    }, []);

    const generateDailyWear = async () => {
        try {
            const clothData = await fetchClothData();

            // Group cloth data by wear type
            const clothByType = clothData.reduce((acc, item) => {
                acc[item.WearType] = [...(acc[item.WearType] || []), item];
                return acc;
            }, {});

            // Generate daily wear for 7 days
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dailyWearList = daysOfWeek.map(day => {
                const bottomWearArray = clothByType['Bottom Wear'];
                const topWearArray = clothByType['Top Wear'];
                const bottomWear = bottomWearArray && bottomWearArray.length > 0 ? getRandomItem(bottomWearArray)?.ClothName : 'No Bottom Wear';
                const topWear = topWearArray && topWearArray.length > 0 ? getRandomItem(topWearArray)?.ClothName : 'No Top Wear';
                return { day, bottomWear, topWear };
            });

            setDailyWear(dailyWearList);
        } catch (error) {
            console.error('Error generating daily wear:', error);
        }
    };

    const fetchClothData = async () => {
        try {
            const response = await axios.get('http://localhost:5200/cloth/');
            return response.data;
        } catch (error) {
            console.error('Error fetching cloth data:', error);
            return [];
        }
    };

    const getRandomItem = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Daily Wear Timetable', 10, 10);
        doc.autoTable({ html: '#dailyWearTable' });
        doc.save('daily_wear_timetable.pdf');
    };

    return (
        <Container>
            <h2 className="mt-5">Daily Wear</h2>
            <Button className="mb-3" onClick={handleDownloadPDF}>Download PDF</Button>
            <Table id="dailyWearTable" striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Bottom Wear</th>
                        <th>Top Wear</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyWear.map((dayWear, index) => (
                        <tr key={index}>
                            <td>{dayWear.day}</td>
                            <td>{dayWear.bottomWear}</td>
                            <td>{dayWear.topWear}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default DailyWear;
