import React , {Component} from 'react';
import {Button, Container} from 'react-bootstrap';
import "./UpdateList.css"
import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateFormat from "date-fns/format"

class UpdateList extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : "",
            name : "",
            no : "",
            ageVerified : true,
            dob : "",
            color : "",
            reg : false
        }
    }
    getId = (event) => {
        this.setState({id : event.target.value})
    }
    getName = (event) => {
        this.setState({name : event.target.value})
    }
    getNumber = (event) => {
        this.setState({no : event.target.value})
    }
    radioButtonChange = (event) => {
        var stringValue = event.target.value;
        var boolValue = JSON.parse(stringValue);
        this.setState({ageVerified : boolValue})
    }
    handleChange = (event) => {
        let dateValue = dateFormat(event, "yyyy-MM-dd", { 
            awareOfUnicodeTokens: true })
        this.setState({dob : dateValue,
                date : event})
    }
    changeColor = (event) => {
        this.setState({color : event.target.value})
    }
    checkBoxChange = (event) => {
        this.setState({reg : event.target.checked})
    }
    submitClicked = (event) => {
        let id = this.state.id
        fetch('http://dev.api.staller.show/v1/horses/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.accessToken 
            },
            
            body: JSON.stringify({
                "horse_name" : this.state.name,
                "horse_number" : this.state.no,
                "age_verified" : this.state.ageVerified,
                "dob" : this.state.dob,
                "color" : this.state.color,
                "ushja_registered" : this.state.reg
            })
        })
        .then((response) => response.json())
            .then((responseJson) => {
                alert("Updated")
                console.log(responseJson)
            })
            .catch((error) => {
                alert(error);
                console.error(error);
        });
    }
    render(){
        return(
            <Container id = "container">
                <Form id = "form">
                    <label>Update</label>
                    <label>Id</label>
                    <input type = "number" placeholder = "Enter id to update" onChange = {this.getId} style ={{"border-style" : 'double', "height": "50px"}}/>
                    <label>Horse name</label>
                    <input type = "horseName" placeholder = "Enter name" onChange = {this.getName} style ={{"border-style" : 'double', "height": "50px"}}/>
                    <label>Horse number</label>
                    <input type = "number" placeholder = "Enter number" onChange = {this.getNumber} style={{"border-style": "double", "height": "50px"}}/>
                    <label>Age verified</label>
                    <div className="radio">
                        <label>
                            <input type="radio" value="true" name = "radio" onChange={this.radioButtonChange}/>true
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="false" name = "radio"onChange={this.radioButtonChange}/>false
                        </label>
                    </div>
                    <label>DOB</label>
                    <DatePicker 
                        selected={this.state.date}
                        onChange={this.handleChange}/>
                    <label>Color</label> 
                    <select ref="dropDownColor" onChange={this.changeColor}>
                        <option>Color</option>
                        <option value="aqua" style={{color: 'aqua'}}>Blue</option>
                        <option value="red" style={{color: 'red'}}>Red</option>
                        <option value="orange" style={{color: 'orange'}}>Orange</option>
                        <option value="green" style={{color: 'green'}}>Greed</option>
                    </select>
                    <label>USHJA registered</label>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="yes" name = "radio" onChange={this.checkBoxChange}/>yes
                        </label>
                    </div>
                    <div id = "submitButton">
                        <Button className = "button" onClick = {this.submitClicked} >Submit</Button>
                    </div>
                </Form>
            </Container>        
        )    
    }
}

export default UpdateList;