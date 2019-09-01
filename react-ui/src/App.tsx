import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, match, RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import logo from './logo.svg';
import './App.css';
import ClashForm from './ClashForm';
import { StaticContext } from 'react-router';

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
        <Route
          exact={true}
          path={`/`}
          render={(props) => (
            <div className='flex flex-align-stretch flex-row flex-container'>
              <div className='flex-auto flex-align-stretch flex-column flex-container'>
                <Nav routeProps={props}></Nav>
              </div>
              <header className='App-header flex flex-container flex-column padding-xxlarge'>
                <img src={logo} className='App-logo' alt='logo' />
                {process.env.NODE_ENV === 'production' ? (
                  <p>This is a production build from create-react-app.</p>
                ) : (
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                )}
                <p>
                  {'« '}
                  <strong>{isFetching ? 'Fetching message from API' : message}</strong>
                  {' »'}
                </p>
                <p>
                  <a className='App-link' href='https://github.com/mars/heroku-cra-node'>
                    React + Node deployment
                  </a>
                </p>
              </header>
            </div>
          )}></Route>
        <Route
          path={`/clashForm`}
          render={(props) => (
            <div className='flex flex-align-stretch flex-row flex-container'>
              <div className='flex-auto flex-align-stretch flex-column flex-container'>
                <Nav routeProps={props}></Nav>
              </div>
              <ClashForm className='flex flex-align-stretch flex-container flex-column padding-xxlarge'></ClashForm>
            </div>
          )}></Route>
        <Route
          path={`/tableTest`}
          render={(props) => (
            <div className='flex flex-align-stretch flex-row flex-container'>
              <div className='flex-auto flex-align-stretch flex-column flex-container'>
                <Nav routeProps={props}></Nav>
              </div>
              <TableTest></TableTest>
            </div>
          )}></Route>
      </div>
    </Router>
  );
}

const TableTest = () => {
  return <div className='flex flex-align-stretch flex-column flex-container padding-xxlarge'>TABLE TEST</div>;
};

const Nav = (props: {routeProps: RouteComponentProps<any, StaticContext, any>}) => {
const { routeProps } = props;
  const links = [
    {
      path: `/`,
      current: routeProps.match.path === `/`,
      label: 'Home',
    },
    {
      path: `/clashForm`,
      current: routeProps.match.path.indexOf(`/clashForm`) === 0,
      label: 'Clash form',
    },
    {
      path: `/tableTest`,
      current: routeProps.match.path.indexOf(`/tableTest`) === 0,
      label: 'Table test',
    },
  ];
  return (
    <nav className='app-nav flex-auto flex-align-stretch flex-align-self-start flex-column flex-container'>
      {(() =>
        links.map((link) => {
          const classNames = `flex flex-container flex-align-stretch flex-row ${link.current ? 'current' : ''}`;
          return (
            <Link className={classNames} to={link.path}>
              <button className='flex flex-container flex-align-center flex-row'>{link.label}</button>
            </Link>
          );
        }))()}
    </nav>
  );
};

export default App;
