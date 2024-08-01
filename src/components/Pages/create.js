import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './create.css';

const Create = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [name, setName] = useState('');
    const [names, setNames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve names from local storage on component mount
        const storedNames = JSON.parse(localStorage.getItem('flows')) || [];
        setNames(storedNames);
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSave = () => {
        const flow_id = uuidv4();
        const newFlow = { flow_id, name };
        const updatedNames = [...names, newFlow];
        setNames(updatedNames);
        localStorage.setItem('flows', JSON.stringify(updatedNames)); // Save names to local storage
        setName('');
        setIsPopupOpen(false);
    };

    const handleDelete = (index) => {
        const newNames = names.filter((_, i) => i !== index);
        setNames(newNames);
        localStorage.setItem('flows', JSON.stringify(newNames)); // Update local storage
    };

    const handleNavigate = (id) => {
        navigate(`/flow/${id}`);
    };

    return (
        <div className="container">
            <div className="header">
                <button className="button" onClick={handleOpenPopup}>
                    Create Flow
                </button>
            </div>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2 style={{ marginBottom: '20px' }}>Enter The Flow Name</h2>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                            placeholder="Flow Name"
                        />
                        <div className="button-group">
                            <button onClick={handleClosePopup} className="cancel-button">Cancel</button>
                            <button onClick={handleSave} className="save-button">Save</button>
                        </div>
                    </div>
                </div>
            )}
            {names.length > 0 ? (
                <div className="flow-list">
                    <h3>Flows :</h3>
                    <ul>
                        {names.map((flow, index) => (
                            <li
                                key={flow.flow_id}
                                className="flow-item"
                                onClick={() => handleNavigate(flow.flow_id)}
                            >
                                {flow.name}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="empty-state">
                    <h1 className="empty-state-text">Flow is Empty</h1>
                    <p className="empty-state-sub-text">Create a flow to get started</p>
                </div>
            )}
        </div>
    );
};

export default Create;
