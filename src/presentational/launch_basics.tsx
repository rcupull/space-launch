import React from "react";
import { ILaunch } from "../utils/definitions";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { routes } from "../utils/definitions";

export interface LaunchBasicsProps {
  launch: ILaunch;
}

const LaunchBasics: React.SFC<LaunchBasicsProps> = ({ launch }) => {
  return (
    <Card style={{ margin: "1rem 0" }}>
      <Card.Body>
        <Card.Title>{launch.name}</Card.Title>
        <Card.Text>
          <b>Rocket:</b> {launch.rocket.configuration.name}
        </Card.Text>
        <Card.Text>
          <b>Service provider:</b>
          {launch.rocket.configuration.launch_service_provider}
        </Card.Text>

        <NavLink
          style={{ float: "right" }}
          to={`${routes.launches}/${launch.id}`}
        >
          Details
        </NavLink>
      </Card.Body>
    </Card>
  );
};

export default LaunchBasics;
