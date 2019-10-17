import React, { Component } from 'react';
import Input from '../Components/UI/Input/Input';
import {Button, Grid, Row, Col, Image} from 'react-bootstrap';
import classes from './Auth.css';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import * as ErrorMsg from './ErrorMsg';


class Auth extends Component{
    constructor(props){
        super(props);
        this.state = {
          controls:{
            email: {
              elementType: 'input',
              elementConfig: {
                type: 'email',
                placeholder: 'example@mail.com'
              },
              value: '',
              validation: {
                required: true,
                isEmail: true
              },
              valid: false,
              touched: false
            },
            password: {
              elementType: 'input',
              elementConfig: {
                type: 'password',
                placeholder: 'password'
              },
              value: '',
              validation: {
                required: true,
                minLength: 6
              },
              valid: false,
              touched: false
            }
          },
          isSignup: false
        };        
    }
    
    switchAuthModeHandler = () => {
      this.setState(prevState => {
        return {isSignup: !prevState.isSignup};
      });
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules){
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        if (rules.isEmail){
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }
    
    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updateControls});
    }

    submitHandler = () => {
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    render(){
      const formElementsArray = [];
      for (let key in this.state.controls){
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        });
      }
      let form = formElementsArray.map(formElement => {
        return(
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => this.inputChangeHandler(event, formElement.id)}
        />
      );

      });
        
        let errorMessage = null;
        
        if (this.props.error){
          let modiError = '';
          switch(this.props.error.message){
            case 'EMAIL_EXISTS':
              modiError = ErrorMsg.EMAIL_EXISTS;
              break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
              modiError = ErrorMsg.TOO_MANY_ATTEMPTS_TRY_LATER;
              break;
            case 'EMAIL_NOT_FOUND':
              modiError = ErrorMsg.EMAIL_NOT_FOUND;
              break;
            case 'INVALID_PASSWORD':
              modiError = ErrorMsg.INVALID_PASSWORD;
              break;
            case 'USER_DISABLED':
              modiError = ErrorMsg.USER_DISABLED;
          }
          errorMessage = (
            <p 
              style={{display: 'block'}} 
              className={classes.errorMessage}
            >
              {modiError}
            </p>
          );
        }      
      
      return(
        <Grid className={classes.showModal}>
          <Row className="show-grid">
          <div className={classes.Auth}>
            {errorMessage}
            <Row>
              <Col lg={4} md={4} sm={4} xs={4} xxs={4}/>
              <Col lg={4} md={4} sm={4} xs={4} xxs={4} className={classes.title}>
                {!this.state.isSignup? 'SIGN IN':'SIGN UP'}
              </Col>
              <Col lg={4} md={4} sm={4} xs={4} xxs={4}/>             
            </Row>
            <Row>
              <Col lg={4} md={4} sm={4} xs={4} xxs={4}/>
              <Col lg={4} md={4} sm={4} xs={4} xxs={4}>
                <Image 
                  style={{display: this.props.loading? 'block':'none'}} 
                  src="https://loading.io/spinners/wave/lg.wave-ball-preloader.gif" 
                  responsive
                />  
              </Col>              
              <Col lg={4} md={4} sm={4} xs={4} xxs={4}/>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12} xs={12} xxs={12}>
                <form>        
                  {form}
                  <Button 
                    onClick={this.submitHandler} 
                    bsStyle="success" 
                    bsSize="large" 
                    block
                  >
                    SUBMIT
                  </Button>   
                </form>              
              </Col>
            </Row>
            <br/>
            <Row>
              <Col lg={12} md={12} sm={12} xs={12} xxs={12}>
                <Button 
                  onClick={this.switchAuthModeHandler}
                  bsStyle='danger'
                  bsSize="large" 
                  block
                >
                  SWITCH TO {this.state.isSignup? 'SIGN IN':'SIGN UP'}
                </Button>                
              </Col>
            </Row>
          </div>
        </Row>
      </Grid>
        );
    }
}
const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);



