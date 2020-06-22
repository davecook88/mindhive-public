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
      currentUser:{},
      sheetData:{},
    }
  }

  componentDidMount = () => {
    const sheetsData = server.getSheetsData();
    sheetsData.then(data => {
      this.setState({sheetData:data});
      console.log(this.state);
    })
    .catch(err => console.log(err));
  }

  changePage = (page) => {
    this.setState({ page: page });
  }

  setCurrentUser = (email) => {
    const cleanedEmail = email.toLowerCase().trim();
    const { users } = this.state.sheetData.sheets;
    const rh = users.rowHeaders;
    for (let i = 1; i < users.values.length; i++){
      const row = users.values[i];
      const emailAddress = row[rh.email];
      if (emailAddress === cleanedEmail) {
        const currentUser = {
          email: cleanedEmail,
        }
        this.setState({ currentUser: currentUser });
        return 'success';
      }
    }
    return `${cleanedEmail} not found in our records.`;    
  }
  
  render() {
    // const { currentUser } = this.state;
    return (
      <div className="App">
        <Navbar changePage={this.changePage}/>
        { 
          !this.state.currentUser.email ? <WelcomePage setCurrentUser={this.setCurrentUser} /> : 
          <InputPage currentUser={this.state.currentUser}/>
        }
        <p>{this.state.currentUser.email}</p>
      </div>
    )
    
  }

}

export default App;
