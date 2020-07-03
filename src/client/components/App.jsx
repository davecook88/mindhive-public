import React from 'react';
import server from '../server';
import WelcomePage from './WelcomePage';
import InputPage from './InputPage';
import Preloader from './Preloader';
import Dashboard from './Dashboard';
import SideNav from './SideNav';
import NutritionalInformationForm from './NutritionalInformation';
import Workouts from './Workouts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      currentUser: {},
      userSheet: {},
      options: [],
      selectForm: '',
      ready: false,
      navIsClosed: false,
    };
  }

  componentDidMount = () => {
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

  setCurrentUser = email => {
    const cleanedEmail = email.toLowerCase().trim();
    const { userSheet } = this.state;
    const rh = userSheet.rowHeaders;
    const currentUser = {};
    for (let i = 1; i < userSheet.values.length; i++) {
      const row = userSheet.values[i];
      const emailAddress = row[rh.email];
      if (emailAddress === cleanedEmail) {
        for (let h in userSheet.rowHeaders) {
          const col = userSheet.rowHeaders[h];
          currentUser[h] = row[col];
        }
        this.setState({ currentUser: currentUser });
        return 'success';
      }
    }
    return `${cleanedEmail} not found in our records.`;
  };

  setBackgroundColor = () => {
    const { page } = this.state;
    switch (page) {
      case 'workouts':
        return 'dark-grey';
      case 'meals':
        return 'dark-grey';
      default:
        return '';
    }
  };

  toggleNav = bool => {
    console.log(bool);
    this.setState({ navIsClosed: bool }, () =>
      console.log('navIsClosed - state', this.state)
    );
  };

  render() {
    const {
      currentUser,
      ready,
      page,
      selectedForm,
      sheetData,
      navIsClosed,
    } = this.state;
    console.log('navIsClosed', navIsClosed);
    if (!ready) {
      return <Preloader />;
    }
    return (
      <div className={`App ${this.setBackgroundColor()}`}>
        {currentUser.email ? (
          <SideNav
            changePage={this.changePage}
            minimize={this.toggleNav}
            minimized={navIsClosed}
            currentUser={currentUser}
          />
        ) : (
          <div className="sidenav-placeholder"></div>
        )}
        <div className={`content-page ${navIsClosed ? 'minimized-nav' : ''}`}>
          <div className="row">
            <div className="col s12">
              {!currentUser.email ? (
                <WelcomePage setCurrentUser={this.setCurrentUser} />
              ) : page === 'dashboard' ? (
                <Dashboard currentUser={currentUser} />
              ) : page === 'meals' ? (
                <NutritionalInformationForm currentUser={currentUser} />
              ) : page === 'checklist' ? (
                <InputPage
                  currentUser={currentUser}
                  selectedForm={'am_checklist'}
                />
              ) : page === 'workouts' ? (
                <Workouts />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
