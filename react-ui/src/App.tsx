import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, match } from 'react-router-dom';
import * as H from 'history';
import logo from './logo.svg';
import './App.css';
import ClashForm from './ClashForm';

function App() {
  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');

  const fetchData = useCallback(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        setIsFetching(false);
      })
      .catch((e) => {
        setMessage(`API call failed: ${e}` as any);
        setIsFetching(false);
      });
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

  return (
    <Router>
      <div className='App flex flex-container flex-align-stretch'>
        {/* <header className="App-header flex-auto flex-container flex-column">
          <img src={logo} className="App-logo" alt="logo" />
          { process.env.NODE_ENV === 'production' ?
          <p>
          This is a production build from create-react-app.
          </p>
          : <p>
          Edit <code>src/App.js</code> and save to reload.
          </p>
        }
        <p>{'« '}<strong>
        {isFetching
          ? 'Fetching message from API'
          : message}
          </strong>{' »'}</p>
          <p><a
          className="App-link"
          href="https://github.com/mars/heroku-cra-node"
          >
          React + Node deployment on Heroku
          </a></p>
        </header> */}
        <Route exact={true} path={`/`} component={Nav}></Route>
        <Route
          path={`/clashForm`}
          render={({match}) => (
            <div className='flex flex-align-stretch flex-row flex-container'>
              <div className='flex-auto flex-align-stretch flex-column flex-container'>
                <Nav match={match}></Nav>
              </div>
              <ClashForm className='flex flex-align-stretch flex-container flex-column'></ClashForm>
            </div>
          )}></Route>
        <Route
          path={`/tableTest`}
          render={({match}) => (
            <div className='flex flex-align-stretch flex-row flex-container'>
              <div className='flex-auto flex-align-stretch flex-column flex-container'>
                <Nav match={match}></Nav>
              </div>
              <TableTest></TableTest>
            </div>
          )}></Route>
      </div>
    </Router>
  );
}

const TableTest = () => {
  return <div className="flex flex-align-stretch flex-column flex-container">TABLE TEST</div>;
};

const Nav = (props: {
  history?: H.History;
  location?: H.Location<H.LocationState>;
  match: match<any>
  staticContext?: any
}) => {
  const {match} = props;
  const links = [{
    path: `/`,
    current: match.path === `/`,
    label: 'Home'
  },
  {
    path: `/clashForm`,
    current: match.path.indexOf(`/clashForm`) === 0,
    label: 'Clash form'
  },
  {
    path: `/tableTest`,
    current: match.path.indexOf(`/tableTest`) === 0,
    label: 'Table test'
  }]
  return (
    <nav className="flex-auto flex-align-stretch flex-align-self-start flex-column flex-container">
      {(() => (
        links.map((link) => {
          const classNames = `flex flex-container flex-align-stretch flex-row ${link.current? 'current' : ''}`;
          return (
          <Link className={classNames} to={link.path}>
            <button className="flex flex-container flex-align-center flex-row">{link.label}</button>
          </Link>)
        })
      ))()}
    </nav>
  );
};

export default App;
