import React , {Component} from 'react';
import "./Home.css"
// import {Button, Container} from 'react-bootstrap';
import Tabs from '../Tabs/Tabs.js';

class Home extends Component {
    render(){
        var data = ''
        console.log(this.props.location.loginData, "**************in home js")
        if (this.props.location.loginData !== undefined){
            if (this.props.location.loginData.errors!== undefined){

            }
            else {
                 data = this.props.location.loginData.data.access_token
            }
        }
        return(
            <div>
                <div id = "header">
                    <h1 id ="heading">Horses CRUD Page</h1>
                </div>
                <Tabs accessToken = {data} ></Tabs>
            </div>
        )
    }
}

export default Home;