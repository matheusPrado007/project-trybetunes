import React from 'react';
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
      </header>
    );
  }
}

export default Header;
