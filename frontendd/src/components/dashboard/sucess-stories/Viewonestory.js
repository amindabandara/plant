import React, { useState, useEffect } from 'react';
import SoloAlert from 'soloalert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jspdf from 'jspdf';
import 'jspdf-autotable';

export default function ViewOneStory() {
    const [isLoading, setLoading] = useState(false);
    const [textState, setTextState] = useState(true);
    const [btngrpState1, setBtnGroupState1] = useState(true);
    const [btngrpState2, setBtnGroupState2] = useState(false);
    const [loaderStatus, setLoaderStatus] = useState(true);
    const [tableStatus, setTableStatus] = useState(true);

    const [username, setUserName] = useState('');
    const [story, setStory] = useState('');
    const [allStories, setAllStories] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        async function getAllStories() {
            try {
                const result = await axios.get('http://localhost:5003/storymanager/');
                setAllStories(result.data.data || []);
                setLoaderStatus(false);
                setTableStatus(false);
            } catch (err) {
                console.error(err.message);
            }
        }

        getAllStories();
    }, []);

    async function getStoryDetails() {
        try {
            const result = await axios.get(`http://localhost:5001/storymanager/${id}`);
            console.log(result.data); // Log the response to verify its structure

            const stories = result.data;

            setUserName(stories.username);
            setStory(stories.story);
            setLoaderStatus(false);
            setTableStatus(false);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        if (id) {
            getStoryDetails();
        }
    }, [id]);

    function generatePDF(stories) {
        const doc = new jspdf();
        const tableColumn = ['Username', 'Story'];
        const tableRows = [];

        stories.reverse().forEach(story => {
            const storyData = [story.username, story.story];
            tableRows.push(storyData);
        });

        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8 }, startY: 35 });
        const date = new Date().toLocaleDateString();
        doc.text('Story Details', 14, 15).setFontSize(12);
        doc.text(`Report Generated Date - ${date}`, 14, 23);
        doc.save(`Story_Details_${date}.pdf`);
    }

    async function updateData(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const newDetails = { username, story };
            const response = await axios.put(`http://localhost:5003/storymanager/${id}`, newDetails);
            if (response.status === 200) {
                SoloAlert.alert({
                    title: 'Success!',
                    body: 'Details updated successfully',
                    icon: 'success',
                    theme: 'dark',
                    useTransparency: true,
                    onOk: async () => {
                        await getStoryDetails(); // Refetch story details after update
                        window.location = '/success-stories/view'
                    },
                });
            }
        } catch (err) {
            SoloAlert.alert({
                title: 'Error!',
                body: 'Something went wrong. Please try again later.',
                icon: 'error',
                theme: 'dark',
                useTransparency: true,
            });
        } finally {
            setLoading(false);
        }
    }

    function edit(e) {
        e.preventDefault();
        setTextState(false);
        setBtnGroupState1(false);
        setBtnGroupState2(true);
    }

    function cancel(e) {
        e.preventDefault();
        setTextState(true);
        setBtnGroupState1(true);
        setBtnGroupState2(false);
    }

    async function deleteStory(e) {
        e.preventDefault();

        SoloAlert.confirm({
            title: 'Confirm Delete',
            body: 'Are you sure you want to delete this story?',
            theme: 'dark',
            useTransparency: true,
            onOk: async () => {
                try {
                    const response = await axios.delete(`http://localhost:5003/storymanager/${id}`);
                    if (response.status === 200) {
                        SoloAlert.alert({
                            title: 'Success!',
                            body: 'Story deleted successfully',
                            icon: 'success',
                            theme: 'dark',
                            useTransparency: true,
                            onOk: () => {
                                window.location = '/success-stories/view';
                            },
                        });
                    }
                } catch (err) {
                    SoloAlert.alert({
                        title: 'Error!',
                        body: 'Something went wrong. Please try again later.',
                        icon: 'error',
                        theme: 'dark',
                        useTransparency: true,
                    });
                }
            },
            onCancel: () => {
                SoloAlert.alert({
                    title: 'Cancelled',
                    body: 'Delete request cancelled',
                    icon: 'warning',
                    theme: 'dark',
                    useTransparency: true,
                });
            },
        });
    }

    return (
        <div className="content">
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status" style={{ width: '10rem', height: '10rem' }} hidden={!loaderStatus}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

            <div hidden={tableStatus}>
                <h3 style={{ marginTop: '100px' }}>Story Details</h3>
                <hr />

                <button
                    type="button"
                    className="btn btn-outline-info"
                    id="pdfButton"
                    onClick={() => {
                        if (allStories && allStories.length > 0) {
                            generatePDF(allStories);
                        } else {
                            SoloAlert.alert({
                                title: 'No Data',
                                body: 'No stories available to generate PDF.',
                                icon: 'warning',
                                theme: 'dark',
                                useTransparency: true,
                            });
                        }
                    }}
                >
                    <i className="fa fa-file-pdf"></i> PDF
                </button>

                <form className="row g-3 needs-validation" id="inputForm2" noValidate>
                    <div className="col-md-6 position-relative">
                        <label htmlFor="validationTooltip01" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="validationTooltip01"
                            required
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            disabled={textState}
                        />
                    </div>
                    <div className="col-md-6 position-relative">
                        <label htmlFor="validationTooltip02" className="form-label">Story</label>
                        <textarea
                            className="form-control"
                            id="validationTooltip02"
                            required
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            disabled={textState}
                        />
                    </div>
                    <div className="col-12" hidden={btngrpState1} style={{ marginTop: '5%' }}>
                        <button className="btn btn-secondary" onClick={cancel}>
                            <i className="fa fa-ban"></i> CANCEL
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-primary" onClick={updateData} disabled={isLoading}>
                            <i className="fa fa-file-export"></i> {isLoading ? 'Updating...' : 'UPDATE'}
                        </button>
                    </div>
                    <div className="col-12" hidden={btngrpState2} style={{ marginTop: '5%' }}>
                        <button className="btn btn-primary" onClick={edit}>
                            <i className="far fa-edit"></i> EDIT
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button className="btn btn-danger" onClick={deleteStory}>
                            <i className="fa fa-trash"></i> DELETE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

