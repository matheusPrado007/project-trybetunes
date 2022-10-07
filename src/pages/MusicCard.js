import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorite: [],
    };
  }

  getApi = async ({ target }) => {
    const { musics } = this.props;
    const { favorite } = this.state;
    this.setState({
      isLoading: true,
      favorite: [...favorite, target.value],
    });
    await addSong(musics.track);
    this.setState({ isLoading: false });
  };

  render() {
    const { musics } = this.props;
    const { isLoading, favorite } = this.state;
    return (
      <div>
        {musics.map((music, key) => (
          key === 0
            ? (
              <div key={ key }>
                <h1 data-testid="album-name">{music.collectionName}</h1>
                <h2 data-testid="artist-name">{music.artistName}</h2>
                <img src={ music.artworkUrl100 } alt={ music.collectionName } />
              </div>
            )
            : (
              <div key={ key }>
                <h3>
                  {music.trackName}
                </h3>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label
                  htmlFor={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                >
                  <input
                    id={ music.trackId }
                    type="checkbox"
                    checked={ favorite.trackId }
                    onChange={ this.getApi }
                  />
                  Favorita
                </label>
              </div>
            )
        ))}
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;
