import AdminPanel from './components/adminpanel/AdminPanel';
import Form from './components/form/Form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/admin' component={AdminPanel} />
          <Route exact path='/' component={Form} />
          <Route render={() => <Redirect to='/' />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
