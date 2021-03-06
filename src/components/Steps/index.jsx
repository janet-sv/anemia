import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import WebcamCapture from 'components/WebcamCapture';
import apiService from 'services/api';
import loaderIcon from 'assets/images/loader.gif';
import './styles.scssm';

class Steps extends PureComponent {
  state = {
    currentStep: 1,
    dniValue: '',
    ageValue: '',
    sexValue: '',
    isLoaderOpened: false,
    results: null,
  };

  goToStepTwo = () => {
    const {
      dniValue,
      ageValue,
      sexValue,
    } = this.state;

    const {
      onClickGoToStepTwo,
    } = this.props;

    !!dniValue
    && !!ageValue
    && !!sexValue
    && this.setState({currentStep: 2});
  };

  goToStepThree = () => {
    const {
      dniValue,
      ageValue,
      sexValue,
    } = this.state;

    const diagnosis = {
      dni: dniValue,
      age: ageValue,
      sex: sexValue,
      eyeImage: null,// this.camera.getImage(),
    };

    this.submitDiagnosis(diagnosis);
  };

  submitDiagnosis = async (diagnosis) => {
    this.setState({ isLoaderOpened: true });
    try {
      const response = await apiService.setDiagnosis(diagnosis);
      this.setState({
        isLoaderOpened: false,
        results: response.results[0],
        currentStep: 3,
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const {
      currentStep,
      dniValue,
      ageValue,
      sexValue,
      isLoaderOpened,
      results,
    } = this.state;

    const className = isLoaderOpened ? 'is-active' : '';

    return (
      <div styleName="container">
        <div className="helper-wrapper">
          <h1 styleName="title">Registro de Diagnóstico</h1>
          <div styleName="steps">
            <div styleName="numbers">
              <div styleName={`number ${currentStep === 1 ? 'is-active' : ''}`}>1</div>
              <div styleName={`number ${currentStep === 2 ? 'is-active' : ''}`}>2</div>
              <div styleName={`number ${currentStep === 3 ? 'is-active' : ''}`}>3</div>
            </div>
          </div>
          <div styleName="content">
            <div styleName={`loader ${className}`}>
              <img src={loaderIcon} styleName="gif" alt="Cargando..."/>
            </div>
            {
              currentStep === 1 &&
              <div>
                <h2 styleName="subtitle">Datos del paciente</h2>
                <div styleName="input-group">
                  <label styleName="label">DNI</label>
                  <input
                    styleName="input"
                    type="text"
                    value={dniValue}
                    maxLength="8"
                    onChange={(e) => { this.setState({ dniValue: e.target.value }) }}
                  />
                </div>
                <div styleName="input-group">
                  <label styleName="label">Edad</label>
                  <input
                    styleName="input"
                    type="text"
                    value={ageValue}
                    maxLength="3"
                    onChange={(e) => { this.setState({ ageValue: e.target.value }) }}
                  />
                </div>
                <div styleName="input-group">
                  <label styleName="label">Sexo</label>
                  <div>
                    <input
                      type="radio"
                      id="sexm"
                      value="M"
                      name="sex"
                      checked={sexValue === 'M'}
                      onChange={(e) => { this.setState({ sexValue: e.target.value }) }}
                    />
                    <label htmlFor="sexm" styleName="label-radio">Masculino</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="sexf"
                      value="F"
                      name="sex"
                      checked={sexValue === 'F'}
                      onChange={(e) => { this.setState({ sexValue: e.target.value }) }}
                    />
                    <label htmlFor="sexf" styleName="label-radio">Femenino</label>
                  </div>
                </div>
                <div styleName="buttons">
                  <Link to="/dashboard">
                    <Button text="Regresar" type="secondary" onClick={() => {}}/>
                  </Link>
                  <Button text="Siguiente" onClick={this.goToStepTwo}/>
                </div>
              </div>
            }
            {
              currentStep === 2 &&
              <div>
                <h2 styleName="subtitle">Subir una foto</h2>
                <WebcamCapture ref={(camera) => { this.camera = camera; }}/>
                <div styleName="buttons">
                  <Button text="Regresar" type="secondary" onClick={() => { this.setState({ currentStep: 1 }) }}/>
                  <Button text="Siguiente" onClick={this.goToStepThree}/>
                </div>
              </div>
            }
            {
              currentStep === 3 &&
              <div>
                <h2 styleName="subtitle">Resultados de Diagnóstico</h2>
                {
                  results &&
                  <div>
                    <div><span style={{fontWeight: '600', marginRight: '10px'}}>DNI:</span> {dniValue}</div>
                    <div><span style={{fontWeight: '600', marginRight: '10px'}}>Edad:</span> {ageValue}</div>
                    <div><span style={{fontWeight: '600', marginRight: '10px'}}>Sexo:</span> {sexValue === 'M' ? 'Masculino' : 'Femenino'}</div>
                    <div style={{textAlign: 'center', fontWeight: '600', fontSize: '18px', marginTop: '15px'}}>
                      Tipo de anemia: <span>{results.type}</span>
                    </div>
                    <div>
                      <div style={{margin: '10px 0', fontWeight: '600'}}>Dieta</div>
                      <ul style={{listStyle: 'dot', paddingLeft: '20px'}}>
                        <li><span>Alimentos ricos en Hierro:</span> {results.diet.foodIron}</li>
                        <li><span>Alimentos ricos en Ácido Fólico:</span> {results.diet.foodAcidFolic}</li>
                        <li><span>Alimentos ricos en Vitamina B12:</span> {results.diet.foodVitamins}</li>
                      </ul>
                    </div>
                    <div>
                      <div style={{margin: '10px 0', fontWeight: '600'}}>Sugerencias</div>
                      <ul style={{listStyle: 'dot', paddingLeft: '20px'}}>
                        <li>{results.supplement}</li>
                      </ul>
                    </div>
                    <div style={{marginTop: '10px', padding: '20px', background: '#FDE9EA'}}>
                      Llama al <span style={{fontWeight: '600', fontSize: '18px'}}>0808-10828</span> para recoger tus suplementos gratis
                    </div>
                  </div>
                }
                <div styleName="buttons">
                  <Button text="Regresar" type="secondary" onClick={() => { this.setState({ currentStep: 2 }) }}/>
                  <Link to="/dashboard">
                    <Button text="Volver Inicio" type="primary" onClick={() => {}}/>
                  </Link>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Steps;