import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        { musics.map((music, key) => (
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
                </audio>
              </div>
            )
        ))}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;
