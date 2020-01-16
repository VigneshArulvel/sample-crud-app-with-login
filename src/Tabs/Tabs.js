import React , {Component} from 'react';
import "./Tabs.css";
import {Button, Container} from 'react-bootstrap';
import CreateList from '../CreateList/CreateList.js';
import GetList from '../GetList/GetList.js';
import DeleteList from '../DeleteList/DeleteList.js';
import UpdateList from '../UpdateList/UpdateList.js';
import GetHorse from '../GetHorse/GetHorse.js';

class Tabs extends Component {
    constructor(props){
        super(props)
        this.state = {
            tabSelected : ''
        }
    }
    tabClicked = (event) => {
        this.setState({tabSelected : event.target.value})
    }
    render(){
        var List = ''
        if (this.state.tabSelected === '' || this.state.tabSelected === 'Create'){
            List = <CreateList accessToken = {this.props.accessToken}></CreateList> 
        }
        else if (this.state.tabSelected === 'Get'){
            List = <GetList accessToken = {this.props.accessToken}></GetList>
        }
        else if (this.state.tabSelected === 'Delete'){
            List = <DeleteList accessToken = {this.props.accessToken}></DeleteList>
        }
        else if (this.state.tabSelected === 'Update'){
            List = <UpdateList accessToken = {this.props.accessToken}></UpdateList>
        }
        else if (this.state.tabSelected === 'GetHorse'){
            console.log("***********get horse")
            List = <GetHorse accessToken = {this.props.accessToken}></GetHorse>
        }
        return(
            <>
            <Container id = "tabs">
                <Button value = "Create" onClick = {this.tabClicked}>Create Horse</Button>
                <Button value = "Get" onClick = {this.tabClicked}>Get Horse List</Button>
                <Button value = "GetHorse" onClick = {this.tabClicked}>Get Horse</Button>
                <Button value = "Update" onClick = {this.tabClicked}>Update Horse</Button>
                <Button value = "Delete" onClick = {this.tabClicked}>Delete Horse</Button>
            </Container>
            <>
                {List}
            </>
            </>
        )
    }
}

export default Tabs; 