import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      apiUser: {},
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const api = await getUser();
    this.setState({
      isLoading: true,
      apiUser: api,
    });
  };

  render() {
    const { isLoading, apiUser } = this.state;
    return (
      <header data-testid="header-component">
        <span
          data-testid="header-user-name"
        >
          { isLoading || <Loading /> }
          { isLoading && (<p>{apiUser.name}</p>)}
        </span>
        <section>
          <nav>
            <Link data-testid="link-to-search" to="/search">Search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </nav>
        </section>
      </header>
    );
  }
}

export default Header;
