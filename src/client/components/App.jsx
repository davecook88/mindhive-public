import React from 'react';
import server from '../server';
import WelcomePage from './WelcomePage';
import InputPage from './InputPage';
import Preloader from './Preloader';
import Dashboard from './Dashboard';
import SideNav from './SideNav';
import NutritionalInformationForm from './NutritionalInformation';
import Workouts from './Workouts';
import VideosSection from './Videos';
import Profile from './Profile';
import M from 'materialize-css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      currentUser: {},
      userSheet: {},
      userMetrics: null,
      options: [],
      selectForm: '',
      ready: true,
      navIsClosed: false,
      amSheet:null,
      pmSheet:null,
      mealSheet:null,
    };
  }

  setMealSheet = (sheet) => {
    this.setState({mealSheet:sheet});
  }

  setAmSheet = (sheet) => {
    this.setState({amSheet:sheet});
  }

  setPmSheet = (sheet) => {
    this.setState({pmSheet:sheet});
  }

  getUserSheet = (email, callback) => {
    // const sheetsData = server.getSheetsData('users');
    const sheetsData = server.getSheetsDataByUser('users', email);
    console.log(sheetsData);
    this.setState({ready:false});
    sheetsData
      .then(data => {
        this.setState({ userSheet: data, ready: true });
        callback(data);
      })
      .catch(err => {
        console.log(err)
        M.toast({html: 'User not found'});
      });
  };

  changePage = page => {
    console.log('changePage', page);
    this.setState({ page: page.toLowerCase() });
  };

  setCurrentUser = email => {
    const cleanedEmail = email.toLowerCase().trim();
    return this.getUserSheet(email, userSheet => {
      console.log('callback', userSheet);
      const rh = userSheet.rowHeaders;
      const currentUser = {};
      for (let i = 0; i < userSheet.values.length; i++) {
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
      M.toast({html: 'User not found'});
      return `${cleanedEmail} not found in our records.`;
    });
  };

  updateCurrentUser = user => {
    const newUser = {...user};
    this.setState({ currentUser: newUser });
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
    const { currentUser, ready, page, navIsClosed } = this.state;
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
                <Dashboard currentUser={currentUser} 
                  updateCurrentUser={this.updateCurrentUser} 
                  setMealSheet={this.setMealSheet}
                  setAmSheet={this.setAmSheet}
                  setPmSheet={this.setPmSheet}
                  pmSheet={this.state.pmSheet}
                  amSheet={this.state.amSheet}
                  mealSheet={this.state.mealSheet}
                   />
              ) : page === 'meals' ? (
                <NutritionalInformationForm currentUser={currentUser} />
              ) : page === 'checklist' ? (
                <InputPage
                  currentUser={currentUser}
                  selectedForm={'am_checklist'}
                />
              ) : page === 'workouts' ? (
                <Workouts />
              ) : page === 'videos' ? (
                <VideosSection />
              ) : page === 'profile' ? (
                <Profile
                  currentUser = {currentUser}
                  updateCurrentUser = {this.updateCurrentUser}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
