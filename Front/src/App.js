import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import MyTask from './pages/MyTask';
import MyInfo from './pages/MyInfo';

const App = () => {
  return (
    <>
      <HashRouter basename="/">
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/mytasks" component={Tasks} />
            <Route exact path="/mytask/view/:id" component={MyTask} />
            <Route exact path="/myinfo" component={MyInfo} />
        </Switch>

      </HashRouter>
    </>  
    
  );
}

export default App;
