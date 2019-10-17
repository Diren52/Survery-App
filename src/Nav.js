import React, { Component } from 'react';
import styles from './App.css';
import classes from './Auth/Auth.css';
import {Navbar, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import Results from './Results';
import VoteForm from './VoteForm';
import FullResult from './FullResult';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class NavbarInstance extends Component{
    constructor(props){
        super(props);
    }
    componentWillMount(){
        alert('working');
        console.log('classes', classes);
    }
render(){
return (
       <Router>
       <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">SurveyApp</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1}><Link to="/join_course_survey">Join Course Survey</Link></NavItem>
              <NavItem eventKey={2}><Link to="/show_result">Show results</Link></NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.3}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Login</NavItem>
              <NavItem eventKey={2} href="#">Sign up</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>  
        <header className={classes.header}>
          <img src="http://www.industrialui.com/wp-content/uploads/2016/12/256x256.png" className={classes.logo} alt="logo" />
          <h1 className={classes.title}>WELCOME TO SURVEYAPP</h1>
        </header>
        <br/>
        
        <Route path="/" render={FullResult}/>
        <Route exact path="/join_course_survey" render={VoteForm}/>
        <Route exact path="/show_result" render={Results}/>
      </div>
      </Router>
);
}
}

export default NavbarInstance;