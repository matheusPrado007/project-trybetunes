import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isSaveBtnDisable: true,
      isLoading: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    console.log(value.length);
    const number3 = 3;
    if (value.length >= number3) {
      this.setState({
        isSaveBtnDisable: false,
      });
    }
    if (name === 'name') {
      this.setState({ name: value });
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState(() => ({
      isLoading: true,
    }));
    await createUser({ name });
    history.push('/search');
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { name, isSaveBtnDisable, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              id="name"
              data-testid="login-name-input"
              type="text"
              value={ name }
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            onClick={ this.handleSubmit }
            disabled={ isSaveBtnDisable }
          >
            Entrar
          </button>
          {isLoading && <Loading />}
        </form>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
