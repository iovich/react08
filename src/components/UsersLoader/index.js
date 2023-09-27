import React, { Component } from 'react';

class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      page: 1,
      isError: false,
      nationality: 'ua'
    }
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.setState({ isLoading: true }, () => {
      this.fetchUsers();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    console.log('prev page: ', prevState);
    console.log('current page: ', this.state);
    if (this.state.page === prevState.page || this.state.nationality !== prevState.nationality) {
      return;
    }
    this.setState({ isLoading: true }, () => {
      this.fetchUsers();
    });
  }

  fetchUsers() {
    const { page, nationality } = this.state;
    fetch(`https://randomuser.me/api/?results=10&nat=${nationality}&seed=foobar&page=${page}`)
      .then(response => response.json())
      .then(data => this.setState({
        users: data.results,
        isLoading: false,
        isError: false,
      }))
      .catch(error => this.setState({
        isError: true,
        isLoading: false,
      }));
  }

  handleNationalityChange = (e) => {
    const nationality = e.target.value;
    this.setState({ nationality, page: 1, isLoading: true }, () => {
      this.fetchUsers();
    });
  }

  prevPage = () => {
    this.setState({ page: this.state.page - 1 })
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    console.log('render');
    const { users, isLoading, page, isError, nationality } = this.state;
    if (isLoading) {
      return <p>Loading....</p>
    }
    if (isError) {
      return <p>Error...</p>
    }
    return (
      <section>
        <h2>Users List:</h2>
        <select id="nationality" value={nationality} onChange={this.handleNationalityChange}>
        <option value="au">Australian</option>
          <option value="br">Brazilian</option>
          <option value="ca">Canadian</option>
          <option value="ch">Swiss</option>
          <option value="de">German</option>
          <option value="dk">Danish</option>
          <option value="es">Spanish</option>
          <option value="fi">Finnish</option>
          <option value="fr">French</option>
          <option value="gb">British</option>
          <option value="ie">Irish</option>
          <option value="in">Indian</option>
          <option value="ir">Iranian</option>
          <option value="mx">Mexican</option>
          <option value="nl">Dutch</option>
          <option value="no">Norwegian</option>
          <option value="nz">New Zealand</option>
          <option value="rs">Serbian</option>
          <option value="tr">Turkish</option>
          <option value="ua">Ukrainian</option>
          <option value="us">American</option>
        </select>
        <button disabled={page === 1} onClick={this.prevPage}>{"<"}</button>
        <span>page:{page}</span>
        <button onClick={this.nextPage}>{">"}</button>
        <ul>
          {users.map(u => <li key={u.login.uuid}>{u.name.first} {u.name.last}</li>)}
        </ul>
      </section>
    );
  }
}

export default UsersLoader;










