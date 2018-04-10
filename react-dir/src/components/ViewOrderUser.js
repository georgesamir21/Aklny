import React from 'react'
import { Link } from "react-router-dom";
import { Confirm ,Table,Grid,Icon,Pagination,List } from 'semantic-ui-react'
import OrdersAPI from '../API/orders-api';
import axios from 'axios';
let uuid = require('uuid-v4');

class ViewOrderUser extends React.Component {

  constructor(props){
   super(props);
   this.state = {
        offset : 0,
        size: 3,
        open: false,
        result: 'show the modal to capture a result',
        orders:[],
        joined:[]
   }
 }

 handleClick(offset) {
    this.setState({offset});
  }
 show = () => this.setState({open: true })
 handleConfirm = () => this.setState({ result: 'confirmed', open: false })
 handleCancel = () => this.setState({ result: 'cancelled', open: false })

 componentDidMount(){
  this.getOrderItems()
 }

 getOrderItems = ()=>{
   axios.get(`http://localhost:3000/users/joined`, {
     headers:{
       'Content-Type': 'application/json',
       'Authorization':"Bearer "+localStorage.getItem('token')
     }
   }).then((response)=>{
     console.log("ll",response.data.message);
     if (response.data.success === false) {
       console.log(response.data.success)
       this.setState({
         badRequest: true,
       })
     } else {
       console.log("ressss"+response.data)
       this.setState({joined: response.data.message})
       console.log("my oders"+this.state.orders+"end");
     }
   }).catch((error)=>{
     console.log(error)
   })

 }


  render() {

    return(

  <Grid centered celled columns={8} >
  <Grid.Column celled='centered' width={4}>
      <h1><b>My Orders</b></h1>
  </Grid.Column>


  <Grid.Column floated='right' width={3} as={Link} to={'/add-order'}>
    <Icon name='add square' size='big' color='teal'/>
  </Grid.Column>

  <Grid.Row className='centered three columns'>
  <Confirm
   open={this.state.open}
   onCancel={this.handleCancel}
   onConfirm={this.handleConfirm}
  />
  </Grid.Row>
	<Grid.Row>
    <Grid.Column computer={12}>
    <List.Header color='teal'>
      <h2>Joined</h2>
    </List.Header>
      <Table size='small' textAlign='center' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >Resturnats</Table.HeaderCell>
            <Table.HeaderCell >Invited</Table.HeaderCell>
            <Table.HeaderCell >Joined</Table.HeaderCell>
            <Table.HeaderCell >Status</Table.HeaderCell>
            <Table.HeaderCell width={4} >View order</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>

          {
            this.state.joined.length>0&&this.state.joined.map((joined) => {
                return (
                  <Table.Row key={uuid()} >
                    <Table.Cell>{joined.res_name}</Table.Cell>
                    <Table.Cell>{joined.invited}</Table.Cell>
                    <Table.Cell>{joined.joined}</Table.Cell>
                    <Table.Cell>{joined.status}</Table.Cell>

                  <Table.Cell>
                    <Link to={`/orders/${joined.id}`}> <Icon link name='folder open' size='big' color='teal'/></Link>
                  </Table.Cell>
                  </Table.Row>
                )
            })

          }
        </Table.Body>
      </Table>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column computer={12}>
    <List.Header color='teal'>
      <h2>Invited</h2>
    </List.Header>
      <Table size='small' textAlign='center' celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell >Resturnats</Table.HeaderCell>
            <Table.HeaderCell >Invited</Table.HeaderCell>
            <Table.HeaderCell >Joined</Table.HeaderCell>
            <Table.HeaderCell >Status</Table.HeaderCell>
            <Table.HeaderCell width={4} >View order</Table.HeaderCell>

          </Table.Row>
        </Table.Header>

        <Table.Body>

          {
            this.state.joined.length>0&&this.state.joined.map((joined) => {
                return (
                  <Table.Row key={uuid()} >
                    <Table.Cell>{joined.res_name}</Table.Cell>
                    <Table.Cell>{joined.invited}</Table.Cell>
                    <Table.Cell>{joined.joined}</Table.Cell>
                    <Table.Cell>{joined.status}</Table.Cell>

                  <Table.Cell>
                    <Link to={`/orders/${joined.id}`}> <Icon link name='folder open' size='big' color='teal'/></Link>
                  </Table.Cell>
                  </Table.Row>
                )
            })

          }
        </Table.Body>
      </Table>
    </Grid.Column>



  </Grid.Row>

{ /*  <Grid.Row>
 <Pagination
         offset={this.state.offset}
         limit={10}
         total={100}
         onClick={(e, props, offset) => this.handleClick(offset)}
       />
  </Grid.Row>*/}
</Grid>

    );
  }
}

export default ViewOrderUser;
