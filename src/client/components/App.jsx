import React from 'react';
import Navbar from './Navbar';
import server from '../server';
import WelcomePage from './WelcomePage';
import InputPage from './InputPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page:'dashboard',
      currentUser:'',
    }
  }

  // componentDidMount() {
  //   const email = server.getActiveUserEmail()
  //   email.then(email => {
  //     this.setState({currentUser:email})
  //   });
  // }

  changePage = (page) => {
    this.setState({ page: page });
  }

  setCurrentUser = (email) => {
    this.setState({ currentUser: email });
    console.log(this.state);
  }
  
  render() {
    // const { currentUser } = this.state;
    return (
      <div className="App">
        <Navbar changePage={this.changePage}/>
        { 
          this.state.currentUser === '' ? <WelcomePage setCurrentUser={this.setCurrentUser} /> : 
          this.state.page === 'inputs' ? <InputPage currentUser={this.state.currentUser}/> : null
        }
        <p>{this.state.currentUser}</p>
        <p>{this.state.page}</p>
      </div>
    )
    
  }

}

export default App;
