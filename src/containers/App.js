import React, { Component } from 'react';
import '../scss/App.scss';

import NavbarHeader from '../components/NavbarHeader';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';

class App extends Component {
  render() {
    return (
      <div>
        <NavbarHeader />
        <div className="content">
          <div className="search">
            <SearchForm />
          </div>
          <div className="results">
            <SearchResults />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
