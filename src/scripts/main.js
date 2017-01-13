import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'isomorphic-fetch';
import style from '../styles/main.scss';

class NavBar extends React.Component {
  render() {
    return <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" style={{padding: 5, paddingLeft: 15}} href="#">
            <img alt="Brand" src="./../../assets/images/leaderboard-icon.png" />
          </a>
        </div>
      </div>
    </nav>
  }
}

class LeaderBoardItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tableData = this.props.display.map((user, index) => {
      const userRating = index + 1; //index is 0 indexed
      return <tr key={user.username}>
        <td>{userRating}</td>
        <td><img alt="user-icon" src={user.img} /> {user.username}</td>
        <td>{user.recent}</td>
        <td>{user.alltime}</td>
       </tr>;
    });
    return <tbody>{tableData}</tbody>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recent: [],
      allTime: [],
      recentLoaded: false,
      allTimeLoaded: false,
      display: [],
      recentButtonClasses: "btn btn-default",
      allTimeButtonClasses: "btn btn-default"
    }
    this.clickHandlerRecent = this.clickHandlerRecent.bind(this);
    this.clickHandlerAllTime = this.clickHandlerAllTime.bind(this);
  }

  componentWillMount () {
    const URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/';
    const RECENT = 'recent';
    const ALLTIME = 'alltime';
    fetch(URL + RECENT).then(res=>res.json())
      .then(response=>{
        this.setState({
          recent: response,
          recentLoaded: true,
          display: response,
          recentButtonClasses: "btn btn-default active"
        });
      });
    fetch(URL + ALLTIME).then(res=>res.json())
      .then(response=>{
        this.setState({
          allTime: response,
          allTimeLoaded: true
        });
      });
  }

  clickHandlerRecent (e) {
    this.setState({
      display: this.state.recent,
      recentButtonClasses: "btn btn-default active",
      allTimeButtonClasses: "btn btn-default"
    })
  }

  clickHandlerAllTime (e) {
    this.setState({
      display: this.state.allTime,
      recentButtonClasses: "btn btn-default",
      allTimeButtonClasses: "btn btn-default active"
    })
  }

  render() {
    return <div>
      <NavBar />
      <div className="container">
        <h1 className="text-center">Leaderboard</h1>
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button type="button" className={this.state.recentButtonClasses} onClick={this.clickHandlerRecent}>Top 100 Recent</button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className={this.state.allTimeButtonClasses} onClick={this.clickHandlerAllTime}>Top 100 All Time</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-hover">
              {this.state.recentLoaded && <LeaderBoardItem display={this.state.display} />}
            <thead>
              <tr>
                <th>Rating</th>
                <th>Name</th>
                <th>Point in last 30 days</th>
                <th>Total Points</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));