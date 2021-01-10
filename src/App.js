import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Header from './components/common/header/Header';
import Footer from './components/common/Footer';
import Modal from './components/common/Modal';
import Landing from './components/Landing';
import MoveCreate from './components/moves/pages/MoveCreate';
import MoveEdit from './components/moves/pages/MoveEdit';
import MoveList from './components/moves/pages/MoveList';
import MoveShow from './components/moves/pages/MoveShow';
import MoveEditGuild from './components/moves/pages/MoveEditGuild';
import './styles/styles.css';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Header />
      <Modal />
      <div className="ui main container">
        <Route path="/" exact component={Landing} />
        <Route path="/moves/new" exact component={MoveCreate} />
        <Route path="/moves/edit/:key/guild/:guildId" exact component={MoveEdit} />
        <Route path="/moves/edit-guild/:key/guild/:guildId" exact component={MoveEditGuild} />
        <Route path="/moves/show/:key/guild/:guildId" exact component={MoveShow} />
        <Route path="/moves/list/" exact component={MoveList} />
      </div>
    </BrowserRouter>
    <Footer />

  </div>
  );
}

export default App;
