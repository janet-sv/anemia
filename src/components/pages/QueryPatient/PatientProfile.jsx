import React, { Component } from 'react';
import DiagnosisTable from './DiagnosisTable';
import DiagnosisModal from './DiagnosisModal';

class PatientProfile extends Component {
    state = {
        diagnosisModalOpen: false,
        currentDiagnosis: {}
    }

    openModal = diagnosis => {
        this.setState({
            diagnosisModalOpen: true,
            currentDiagnosis: diagnosis
        });
    }

    closeModal = () => {
        this.setState({
            diagnosisModalOpen: false,
            currentDiagnosis: null
        });
    }

    handleSubmit = values => {
        console.log('values', values);
    }

    render(){
        const { patient } = this.props;
        const { diagnosisModalOpen, currentDiagnosis } = this.state;

        return (
            <div>
                <div>
                    <div>Edad: {patient.age}</div>
                    <div>Sexo: {patient.sex}</div>
                </div>
                <DiagnosisTable diagnosisHistory={patient.diagnosisHistory} onSeeMoreClick={this.openModal}/>
                {diagnosisModalOpen && <DiagnosisModal 
                    onSubmit={this.handleSubmit} 
                    diagnosis={currentDiagnosis} 
                    patient={patient} 
                    active={diagnosisModalOpen} 
                    handleClose={this.closeModal}/>}
            </div>
        );
    }
}

export default PatientProfile;
