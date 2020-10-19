import React from 'react';

class EditModal extends React.Component {
    constructor() {
        super();

        this.state = {
            startTime: '',
            endTime: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        window.$('#editEventModal').on('shown.bs.modal', () => {
            let editEventObject = sessionStorage.getItem('editEventObject');

            console.log(editEventObject);

            if (editEventObject !== undefined) {
                editEventObject = JSON.parse(editEventObject);

                this.setState({
                    startTime: editEventObject.start,
                    endTime: editEventObject.end
                });
            }
        });
    }

    handleChange() {
        
    }

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
                        <form>
                            <input type="text" value={this.state.startTime} onChange={this.handleChange} placeholder="Startzeit" className="form-control" id="startTime" />
                            <input type="text" value={this.state.endTime} onChange={this.handleChange} placeholder="Endzeit" className="form-control" id="endTime" />
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Schließen</button>
                            <button type="button" onClick={this.save} className="btn btn-primary">Speichern</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    save() {
        sessionStorage.removeItem('editEventObject');
    }
}

export default EditModal;