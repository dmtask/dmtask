import React from 'react';

class EditModal extends React.Component {
    render() {
        return (
            <div className="modal" id="editEventModal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Zeit bearbeiten</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Modal body text goes here.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Schließen</button>
                            <button type="button" className="btn btn-primary">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditModal;