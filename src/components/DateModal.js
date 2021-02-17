import React, {useState} from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";

import tripService from '../services/tripService';

export default function DateModal({setAllTrips}) {
    const [show, setShow] = useState(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSave = async () => {
        await tripService.addTrip({from, to});
        const refetchAllTrips = await tripService.getTrips({withinPeriod: true});
        setAllTrips(refetchAllTrips)
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add a trip
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a trip</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Row>
                                    <label htmlFor="from">from:</label>
                                </Row>
                                <Row>
                                    <DayPickerInput id="from" onDayChange={day => setFrom(day)}/>
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <label htmlFor="to">to:</label>
                                </Row>
                                <Row>
                                    <DayPickerInput id="to" onDayChange={day => setTo(day)}/>
                                </Row>

                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save trip
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}
