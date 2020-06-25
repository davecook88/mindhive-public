import React from 'react';
import Navbar from './Navbar';
import SubNav from './SubNav';
import server from '../server';
import WelcomePage from './WelcomePage';
import InputPage from './InputPage';
import Preloader from './Preloader';
import Dashboard from './Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      currentUser: {},
      userSheet: {},
      options: [],
      selectForm: '',
      ready:false,
    };
  }

  componentDidMount = () => {
    const me = server.getActiveUserEmail();
    me.then((user) => {console.log(user);});
    const sheetsData = server.getSheetsData('users');
    console.log(sheetsData);
    sheetsData
      .then(data => {
        this.setState({ userSheet: data, ready: true });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  changePage = page => {
    console.log('changePage', page);
    this.setState({ page: page.toLowerCase() });
  };

  selectForm = formOption => {
    this.setState({ selectedForm: formOption });
  };

  setCurrentUser = email => {
    const cleanedEmail = email.toLowerCase().trim();
    const { userSheet } = this.state;
    const rh = userSheet.rowHeaders;
    for (let i = 1; i < userSheet.values.length; i++) {
      const row = userSheet.values[i];
      const emailAddress = row[rh.email];
      if (emailAddress === cleanedEmail) {
        const currentUser = {
          email: cleanedEmail,
        };
        this.setState({ currentUser: currentUser });
        return 'success';
      }
    }
    return `${cleanedEmail} not found in our records.`;
  };

  render() {
    const { currentUser, ready, page, selectedForm, sheetData } = this.state;
    return (
      <div className={`App full-page dark-grey`}>
        <Navbar selectPage={this.changePage} />
        {!ready ? <Preloader /> : null}
        {ready &&  page === 'forms' ?
          <div>
            <SubNav selectForm={this.selectForm} />
            <InputPage
              currentUser={currentUser}
              selectedForm={selectedForm}
            />
          </div>
          : !currentUser.email ? 
            <WelcomePage setCurrentUser={this.setCurrentUser} />
           : null}
          {ready && currentUser.email && page === 'dashboard' ? <Dashboard user={currentUser}/> : null}
      </div>
    );
  }
}

export default App;
