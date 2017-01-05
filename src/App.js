import React, { Component } from 'react';
import './scss/App.scss';

import NavbarHeader from './components/NavbarHeader';
import SearchForm from './components/SearchForm';

class App extends Component {
  render() {
    return (
      <div>
        <NavbarHeader />
        <div className="content">
          <SearchForm />
        </div>
      </div>
    );
  }
}

export default App;
