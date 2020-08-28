import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './components/Header';
import Landing from './components/Landing';
import MoveCreate from './components/moves/pages/MoveCreate';
import MoveEdit from './components/moves/pages/MoveEdit';
import MoveDelete from './components/moves/pages/MoveDelete';
import MoveList from './components/moves/pages/MoveList';
import MoveShow from './components/moves/pages/MoveShow';
import './styles/Segment.css';

function App() {
  return (
    <div>
      <Header />
    <BrowserRouter>
      <div className="ui main text container">
        <Route path="/" exact component={Landing} />
        <Route path="/moves/new" exact component={MoveCreate} />
        <Route path="/moves/edit/:key" exact component={MoveEdit} />
        <Route path="/moves/delete/:key" exact component={MoveDelete} />
        <Route path="/moves/show/:key" exact component={MoveShow} />
        <Route path="/moves/list/" exact component={MoveList} />
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
