import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isSaveBtnDisable: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    console.log(value.length);
    const number2 = 2;
    if (value.length >= number2) {
      this.setState({
        isSaveBtnDisable: false,
      });
    }
    if (name === 'name') {
      this.setState({ name: value });
    }
  };

  render() {
    const { name, isSaveBtnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="art">
            <input
              id="art"
              data-testid="search-artist-input"
              type="text"
              value={ name }
              name="name"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.handleSubmit }
            disabled={ isSaveBtnDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
