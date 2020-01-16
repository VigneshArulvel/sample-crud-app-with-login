import React , {Component} from 'react';
import "./DeleteList.css";
import {Button} from 'react-bootstrap';

class DeleteList extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : ''
        }
    }
    
    deleteData = (event) => {
        this.setState({id : event.target.value})
    }    
    
    submitClicked = (event) => {    
        let id = this.state.id
        fetch('http://dev.api.staller.show/v1/horses/' + id, 
        { 
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.accessToken 
        }
    })
        .then((response) => response.json())
            .then((responseJson) => {
            })
            .catch((error) => {
                alert("deleted");
        });
    }
    render(){
        return(
            <div id = "deleteList">
                <label>Enter ID to delete:  </label>
                <input type = "number" placeholder = "Enter id" onChange = {this.deleteData} style={{"border-style": "double", "height": "50px"}}/>
                <Button className = "button2" onClick = {this.submitClicked} >Submit</Button>
            </div>
            )
    }
}

export default DeleteList; 