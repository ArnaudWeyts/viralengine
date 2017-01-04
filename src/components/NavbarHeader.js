import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class NavbarHeader extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="/">viralengine</NavbarBrand>
          <Nav className="float-xs-right" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}