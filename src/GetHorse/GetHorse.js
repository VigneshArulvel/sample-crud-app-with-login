import React , {Component} from 'react';
import "./GetHorse.css";
import {Button} from 'react-bootstrap';

class GetHorse extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : '',
            data : {},
            submitClicked : false
        }
    }
    
    getData = (event) => {
        this.setState({id : event.target.value})
    }    
    
    submitClicked = (event) => {    
        let id = this.state.id
        fetch('http://dev.api.staller.show/v1/horses/' + id, 
        { 
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.accessToken 
        }
    })
        .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data : responseJson.data, submitClicked : true})
            })
            .catch((error) => {
                alert("error");
        });
    }
    render(){
        var List = ''
        
        if(this.state.submitClicked === true){
            List = <table id = "getTable">
                <tr>
                    <td>ID</td>
                    <td>Horse number</td>
                    <td>Horse name</td>
                    <td>color</td>
                </tr>
                <tr>
                    <td>{this.state.data.id}</td>
                    <td>{this.state.data.horse_number}</td>
                    <td>{this.state.data.horse_name}</td>
                    <td>{this.state.data.color}</td>
              </tr>
            </table>
        }
        return(
            <div id = "GetHorse">
                <label>Enter ID to Get:  </label>
                <input type = "number" placeholder = "Enter id" onChange = {this.getData} style={{"border-style": "double", "height": "50px"}}/>
                <Button className = "button2" onClick = {this.submitClicked} >Submit</Button>
                <div style={{"position" : "absolute", "width" : "200%"}}>
                 {List}
                </div> 
            </div>
            )
    }
}

export default GetHorse; 