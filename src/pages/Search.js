import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      isLoading: false,
      apiArtist: [],
      artist: '',
      isSaveBtnDisable: true,
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const { artist } = this.state;
    this.setState({ isLoading: true });
    const api = await searchAlbumsAPI(`${artist}`);
    console.log(api);
    this.setState({
      artistName: artist,
      isLoading: false,
      apiArtist: api,
      artist: '',
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    event.preventDefault();
    const number2 = 2;
    this.setState({
      [name]: value,
    });
    if (value.length >= number2) {
      this.setState({
        isSaveBtnDisable: false,
      });
    }
  };

  render() {
    const { isSaveBtnDisable, isLoading, artist, apiArtist, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <div>
            <label htmlFor="art">
              <input
                data-testid="search-artist-input"
                type="text"
                name="artist"
                value={ artist }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ this.getApi }
              disabled={ isSaveBtnDisable }
            >
              Pesquisar
            </button>
          </div>
          <div>
            {isLoading ? <Loading />
              : (
                <div>
                  <Header />
                  <p>
                    {`Resultado de álbuns de: ${artistName}`}
                  </p>
                  {apiArtist.length !== 0 ? apiArtist.map((album) => ((
                    <Link
                      key={ album.collectionId }
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <div>
                        <h1>{album.collectionName}</h1>
                        <img
                          src={ album.artworkUrl100 }
                          alt={ `foto do álbum ${album.collectionName}` }
                        />
                        <h3>{album.artistName}</h3>
                      </div>
                    </Link>
                  ))) : <p>Nenhum álbum foi encontrado</p>}
                </div>)}
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
