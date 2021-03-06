import React from 'react';
import Helmet from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Layout from 'components/Layout';
import Landing from 'components/pages/Landing';
import QueryPatient from 'components/pages/QueryPatient';
import Home from 'components/pages/Home';
import Diagnosis from 'components/pages/Diagnosis';
import './App.scssm';

const title = 'Anemiapp';

const App = () => (
  <Router>
    <Layout>
      <Helmet>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{title}</title>
      </Helmet>

      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Home} />
        <Route path="/diagnostico" component={Diagnosis} />
        <Route path="/consulta-paciente" component={QueryPatient} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </Router>
);

export default App;
