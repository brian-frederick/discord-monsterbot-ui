import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './components/Header';
import Landing from './components/Landing';
import MoveCreate from './components/moves/MoveCreate';
import MoveEdit from './components/moves/MoveEdit';
import MoveDelete from './components/moves/MoveDelete';
import MovesShow from './components/moves/MovesShow';
import './styles/Segment.css';

function App() {
  return (
    <div>
      <Header />
    <BrowserRouter>
      <div className="ui main text container">
        <Route path="/" exact component={Landing} />
        <Route path="/moves/new" exact component={MoveCreate} />
        <Route path="/moves/edit" exact component={MoveEdit} />
        <Route path="/moves/delete" exact component={MoveDelete} />
        <Route path="/moves/show" exact component={MovesShow} />
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
