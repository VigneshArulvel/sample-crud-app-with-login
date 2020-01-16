import React , {Component} from 'react';
import "./GetList.css";

class GetList extends Component {
    constructor(props){
        super(props)
        this.state = {
            gotData : false,
            data : []
        }
    }
    componentDidMount(){
        fetch('http://dev.api.staller.show/v1/horses', 
        {method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.props.accessToken 
        }
    })
        .then((response) => response.json())
            .then((responseJson) => {
                this.setState({gotData : true,
                   data : responseJson })
            })
            .catch((error) => {
                alert(error);
                console.error(error);
        });
    }
    render(){
        var table = ''
        var tableData = this.state.data.data 
        if (this.state.gotData === true && tableData !== undefined){
            table = 
            <>
            <label id = "tableLable">Got all data</label>  
              <table>
              <tr>
                <td>ID</td>
                <td>Horse number</td>
                <td>Horse name</td>
                <td>color</td>
              </tr>  
             {tableData.map((item, index) => 
                    <tr key = {index}>
                        <td>{item.id}</td>
                        <td>{item.horse_number}</td>
                        <td>{item.horse_name}</td>
                        <td>{item.color}</td>
                    </tr>
                )}
            </table>
            </>
        }
        return(
            <>
                {table}
            </>
            )
    }
}

export default GetList; 