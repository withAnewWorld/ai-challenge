// import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
const styles = theme=>({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: 'auto'
  },
  table:{
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit *2
  }
})
// const customers = [
//   {
//   'id': 1,
//   'img': 'https://placeimg.com/64/64/1',
//   'name' : 'hongKillDong',
//   'birthday': '960719',
//   'gender': 'man',
//   'job': 'student'
// },
// {
//   'id': 2,
//   'img': 'https://placeimg.com/64/64/2',
//   'name' : 'NaDongBin',
//   'birthday': '97107',
//   'gender': 'man',
//   'job': 'programmer'
// },
// {
//   'id': 3,
//   'img': 'https://placeimg.com/64/64/3',
//   'name' : 'YunHo',
//   'birthday': '95202',
//   'gender': 'Woman',
//   'job': 'gamer'
// }

// ]

class App extends Component {
  state={
    customers: "",
    completed: 0
  }
  componentDidMount(){
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then (res=>this.setState({customers: res}))
      .catch(err => console.log(err));

  }

  callApi=async()=>{
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress= ()=>{
    const {completed} = this.state;
    this.setState({completed: completed>=100 ? 0: completed});
  }
  render(){
    const {classes} = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          this.state.customers ? this.state.customers.map(c => {
            return (<Customer
              key ={c.id}
              id={c.id}
              image={c.img}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
            />);
          })
          : 
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
          } ; 

        </TableBody>
        

        </Table>
        </Paper>
      //   {/* <Customer
      //     id={customers[0].id}
      //     img={customers[0].img}
      //     name={customers[0].name}
      //     birtday={customers[0].birthday}
      //     gender={customers[0].gender}
      //     job={customers[0].job}
      //   />
      //   <Customer
      //     id={customers[1].id}
      //     img={customers[1].img}
      //     name={customers[1].name}
      //     birtday={customers[1].birthday}
      //     gender={customers[1].gender}
      //     job={customers[1].job}
      //   />
      //   <Customer
      //     id={customers[2].id}
      //     img={customers[2].img}
      //     name={customers[2].name}
      //     birtday={customers[2].birthday}
      //     gender={customers[2].gender}
      //     job={customers[2].job}
      //   />*/
      // </div>
      // }
    );
  }
}

export default withStyles(styles)(App);
