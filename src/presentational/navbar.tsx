import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { routes } from "../utils/definitions";
interface IMenuItem {
  text: string;
  route: string;
}
const MenuItems: IMenuItem[] = [{ text: "Launches", route: routes.launches }];
export interface NavBarProps {}

const NavBar: React.SFC<NavBarProps> = () => {
  const renderItem = (id: number, item: IMenuItem) => {
    return (
      <Nav.Link
        key={id}
        as={NavLink}
        to={item.route}
        className="menu_items1 menu_items1_normal"
        activeClassName="menu_items1 menu_items1_active"
      >
        {item.text}
      </Nav.Link>
    );
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {MenuItems.map((item, id) => renderItem(id, item))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
