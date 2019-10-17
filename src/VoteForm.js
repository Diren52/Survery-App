import React, { Component } from 'react';
import './App.css';
import {Row, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import { withRouter } from 'react-router';
import Input from './Components/UI/Input/Input';



class VoteForm extends Component{
    constructor(props){
      super(props);
      // this.state = {
      //     name: '',
      //     email: '',
      //     gender: '',
      //     age: '',
      //     courses: [],
      //     note: '',
      //     complete: false,
      // }
      this.state = {
          controls:{
            name: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                placeholder: 'Enter your name...'
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
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
            gender: {
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'Select',
                options: [
                  {
                    value: 'Female',
                    displayValue: 'Female'
                  },
                  {
                    value: 'Male',
                    displayValue: 'Male'
                  },
                  {
                    value: 'Prefer not to state',
                    displayValue: 'Prefer not to state'
                  }
                ]
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            age: {
              elementType: 'select',
              elementConfig: {
                type: 'text',
                placeholder: 'Select',
                options: [
                  {
                    value: 'Under 20',
                    displayValue: 'Under 20'
                  },
                  {
                    value: '20-29',
                    displayValue: '20-29'
                  },
                  {
                    value: '30-39',
                    displayValue: '30-39'
                  },
                  {
                    value: '40-49',
                    displayValue: '40-49'
                  },
                  {
                    value: 'Above 50',
                    displayValue: 'Above 50'
                  }
                ]
              },
              value: '',
              validation: {
                required: true
              },
              valid: false,
              touched: false
            },
            courses: {
              elementType: 'multi-select',
              elementConfig: {
                type: 'text',
                placeholder: 'Select',
                options: [
                  {
                    value: 'Python Django',
                    displayValue: 'Python Django'
                  },
                  {
                    value: 'Ruby On Rails',
                    displayValue: 'Ruby On Rails'
                  },
                  {
                    value: 'NodeJS',
                    displayValue: 'NodeJS'
                  },
                  {
                    value: 'Machine Learning',
                    displayValue: 'Machine Learning'
                  },
                  {
                    value: 'SQL',
                    displayValue: 'SQL'
                  }
                ]
              },
              value: [],
              validation: {
                required: true
              },
              valid: false,
              touched: false,
            },
            note: {
              elementType: 'textarea',
              elementConfig: {
                type: 'text',
                placeholder: 'Enter text...'
              },
              value: '',
              validation: {
                required: false
              },
              valid: false,
              touched: false
            }
         },
        complete: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.checkComplete = this.checkComplete.bind(this);
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
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        
        if (rules.isEmail){
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    
    inputChangeHandler = (event, controlName) => {
        this.setState({validationState: null});
        let array;
        if (controlName === 'courses'){
          array = this.state.controls[controlName].value;
          array.indexOf(event.target.value) === -1? array.push(event.target.value):array.splice(array.indexOf(event.target.value), 1);
        }
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: controlName === 'courses'? array : event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updateControls});
    }
    
    handleChange(event){
      this.validationState();
      const target = event.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      if (name === 'courses'){
        value = this.state.courses;
        value.indexOf(target.value) === -1? value.push(target.value):value.splice(value.indexOf(target.value), 1);
      }
  
      this.setState({[name]: value});
    }
    validationState(){
        let count = 0;
        for (let key in this.state.controls){
          if (this.state.controls[key].validation.required && this.state.controls[key].valid){
            count++
          }
        } 
        return count >= 5? false : true;
    // if(this.state.name.length>0 && 
    //     this.state.email.length>0 && 
    //     this.state.gender.length>0 && 
    //     this.state.age.length>0 && 
    //     this.state.courses.length>0){
    //     return false;
    //   }
    //   return true;
    }
    checkComplete(event){        

      const emptyRemind = [];
        for (let item in this.state){
          if (this.state[item].length === 0 && item!== 'note'){
            emptyRemind.push(item)
          }
        }
      if (emptyRemind.length > 0){
        {/*alert(emptyRemind.join(', ')+' cannot be empty. Please complete before preceed.');
        event.preventDefault();*/}
        this.setState({complete: false});
      }else {
        this.setState({complete: true});
      }
    }
    
    handleSubmit(e){
        alert('Successfully submitted');
        const resultsArray = {};
        for (let key in this.state.controls){
          resultsArray[key] = this.state.controls[key].value;
        }
        e.preventDefault();
        this.props.addSurvey(resultsArray);
        this.props.history.push('/show_result');
    }

    render(){
      const formElementsArray = [];
      for (let key in this.state.controls){
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        })
      }
      let form = formElementsArray.map(formElement => {
        return(
          <FormGroup key={formElement.id}>
          <Row>
          <ControlLabel>{(formElement.id).toUpperCase()}</ControlLabel>
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
          </Row>
          </FormGroup>
      );
    }
  );
        return(
          <Row>
            {/*<form className="Form" onSubmit={this.handleSubmit}>*/}
            <form className="Form" onSubmit={(e) => {
              e.preventDefault();
               //eslint-disable-next-line
              if(confirm('Are you sure to submit?')){this.handleSubmit(e);}
            }}>
              {form}
              {/*<FormGroup>
                <Row>
                 <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Name
                </Col>
                <Col sm={5}>
                  <FormControl
                    type="text" 
                    placeholder="Jane Doe"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    className="formInput"
                  />
                </Col>
                <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Email
                </Col>
                <Col sm={5}>
                  <FormControl 
                    type="email" 
                    placeholder="janedoe@mail.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}  
                    className="formInput"
                  />
                </Col>
                </Row>
              </FormGroup>
              <br/>
              <FormGroup>
                <Row>
                <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Gender
                </Col>
                <Col sm={3}>
                <Radio
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={this.handleChange}
                  inline
                >
                  Female
                </Radio>
                </Col>
                <Col sm={2}>
                <Radio 
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={this.handleChange}
                  inline
                >
                  Male
                </Radio>
                </Col>
                <Col sm={6}>
                 <Radio 
                  type="radio"
                  name="gender"
                  value="prefer not to state"
                  onChange={this.handleChange}
                  inline
                >
                  Prefer Not to state
                </Radio>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <Row>
                <Col componentClass={ControlLabel} sm={1}>
                  <span className="mustFill">*</span>
                  Age
                </Col>
                <Col sm={11}>
                  <FormControl 
                    name="age" 
                    value={this.state.age} 
                    onChange={this.handleChange} 
                    componentClass="select" 
                    placeholder="select"
                    className="formInput"
                  >
                    <option value="">Select</option>
                    <option value="under 20">Under 20</option>
                    <option value="20-30">20-30</option>
                    <option value="30-40">30-40</option>
                    <option value="40-50">40-50</option>
                  </FormControl>
                </Col>
                </Row>
              </FormGroup>
              <FormGroup controlId="formControlsSelectMultiple">
                <Row>
                <ControlLabel>
                  <span className="mustFill">*</span>
                  Courses you're interested in
                </ControlLabel>
                <FormControl 
                  name="courses" 
                  value={this.state.courses} 
                  onChange={this.handleChange} 
                  multiple={true} 
                  componentClass="select" 
                  className="formInput"
                >
                  <option value="Python Django">Python Django</option>
                  <option value="Ruby on Rails">Ruby on Rails</option>
                  <option value="NodeJS">NodeJS</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="SQL">SQL</option>
                </FormControl>
                </Row>
              </FormGroup>
              <FormGroup controlId="formControlsTextarea">
                <Row>
                <ControlLabel>Is there any other topics you'd like to learn?</ControlLabel>
                <FormControl 
                  componentClass="textarea" 
                  placeholder="Enter text..."
                  name="note"
                  value={this.state.note}
                  onChange={this.handleChange}
                  className="formInput"
                />
                </Row>
              </FormGroup>*/}
              <Row>
              <Button className="button" bsSize="large" type="submit" block disabled={this.validationState()}> {/*disabled={this.validationState()}*/}
                SUBMIT
              </Button>
              </Row>
            </form>
          </Row>
        );
    }
}

export default withRouter(VoteForm);
