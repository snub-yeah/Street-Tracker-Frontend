import React from "react";
import "./Styles/ConfirmDelete.css";

const ConfirmDelete = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Are you sure you want to delete this?</h2>
                <div className="modal-buttons">
                    <button onClick={onConfirm} className="delete-btn">Delete</button>
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
