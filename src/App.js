import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./css/App.css";
import WeatherCard from "./components/WeatherCard";
import * as CONST from "./utils/constants";
import weatherData from "./data/cities.json";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityWeather from "./components/CityWeather";

function NavBar() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          {" "}
          <img src={`assets/img/logo.png`} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Navbar.Collapse className="justify-content-end">
              {isAuthenticated && (
                <Navbar.Text className="userName">
                  Signed in as : {user.nickname}
                </Navbar.Text>
              )}

              {isAuthenticated ? (
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button variant="primary" onClick={loginWithRedirect}>
                  login
                </Button>
              )}
            </Navbar.Collapse>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function App() {
  const { isAuthenticated } = useAuth0();

  const weatherCards = weatherData.List.map((city, index) => (
    <WeatherCard
      key={city.CityCode}
      cityId={city.CityCode}
      cityName={city.CityName}
      bgColor={CONST.colors[index % CONST.colors.length]}
    />
  ));

  return (
    <>
      <NavBar></NavBar>

          <Router>
        <Switch>
          <Route exact path="/">

          {isAuthenticated&&(
            <>
              <div className="container contents">
            <div className="row">
              <div className="input-group search-box">
                <input
                  type="search"
                  id="search_input"
                  className="form-control "
                  placeholder="Enter a city"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <button type="button" id="search_button" className="btn">
                  Add City
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row App weather_cards">{weatherCards}</div>
          </div>
            </>
          )}
          </Route>
          <Route path="/city/:cityId">
            <CityWeather />
          </Route>
          </Switch>
        </Router>
        </>
      

  );
}
export default App;
