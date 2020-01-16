import React , {Component} from 'react';
import {Button, Container} from 'react-bootstrap';
import "./Login.css"
import  { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import {RegisterData} from '../Actions/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginSucess : false,
            userName : "",
            password : "",
            loginData : {}
        }
    }
    emailValue = (event) => {
        console.log(event.target.value)
        this.setState({
            userName : event.target.value
        })
    }

    passwordValue = (event) => {
        console.log(event.target.value)
        this.setState({
            password : event.target.value
        })
    }

    loginClicked = () => {
        var sha512 = require('js-sha512');
        let value = sha512(this.state.password);
        fetch('http://dev.api.staller.show/v1/users/login?', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email : this.state.userName,
                password : value
            })
        })
        .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.errors === undefined){
                this.setState({
                      loginData : responseJson,
                      loginSucess : true               
                })}
                else {
                    alert("error")
                }
            })
            .catch((error) => {
                alert(error);
                console.error(error);
        });
    }
    render(){
        if (this.state.loginSucess){
            return <Redirect to={{pathname: '/home', loginData : this.state.loginData}} />
        }     
        return(
                <Container id = "container">
                    <div id = "header">
                        <h1 id ="heading">Login</h1>
                    </div>
                    <Form id = "form">
                        <label>Email address</label>
                        <input type = "email" placeholder = "Enter email" onChange = {this.emailValue} style ={{"border-style" : 'double', "height": "50px"}}/>
                        <label>Enter password</label>
                        <input type = "password" placeholder = "Enter password" onChange = {this.passwordValue} style={{"border-style": "double", "height": "50px"}}/>
                    </Form>
                    <div id = "buttons">
                        <Button className = "button" onClick = {this.loginClicked} >Sign in</Button>
                    </div>
                </Container>
            )
        }
    }

    function mapStateToProps(state){
        return {
            RegisteredData : state.Reducer.value
        }
    }

    function matchDispatchToProps (dispatch){
        return bindActionCreators({RegisterData : RegisterData}, dispatch)
    }
    
    export default connect(mapStateToProps, matchDispatchToProps) (Login);    