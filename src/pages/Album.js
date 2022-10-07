import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const { match: { params: { id } } } = this.props;
    const api = await getMusics(id);
    console.log(api);
    this.setState({
      musics: api,
      isLoading: false,
    });
  };

  render() {
    const { musics, isLoading } = this.state;
    return (
      <section>
        <Header />
        {
          isLoading
            ? <Loading />
            : (
              <div data-testid="page-album">
                <MusicCard
                  musics={ musics }
                  track={ musics.trackId }
                />
              </div>
            )
        }
      </section>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf,
  }),
}.isRequired;
