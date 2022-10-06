import React from 'react';

class MusicCard extends React.Component {
  render() {
    return (
      <ul>
        { apiArtist.map((album, i) => (
          <li atributo data-testid="artist-name" key={ i }>{album}</li>
        ))}
      </ul>
    );
  }
}

export default MusicCard;
