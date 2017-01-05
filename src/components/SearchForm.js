import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class SearchForm extends React.Component {
  render() {
    return (
      <Form className="searchForm">
        <FormGroup>
          <Label className="searchLabel" for="mainSearch">Search for viral posts</Label>
          <Input className="searchInput" type="search" name="search" id="mainSearch" placeholder="Enter a keyword..." />
        </FormGroup>
        <Button>Search</Button>
      </Form>
    );
  }
}