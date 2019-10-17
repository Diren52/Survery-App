import React from 'react';
import {Row, Col} from 'react-bootstrap';
import classes from './App.css';


const Results = ({courseName, courseCount, maxNum}) => (
            <Row className={classes.coursePanel}>
              <Col md={4}>
                <h5 className={classes.courseName}>{courseName}</h5>
              </Col>
              <Col md={8}>
                <div>
                  <div 
                    className={classes.countBar} 
                    style={{width:courseCount/maxNum*300}}
                  >
                    {courseCount}
                  </div>
                </div>
              </Col>
            </Row>
);


export default Results;
