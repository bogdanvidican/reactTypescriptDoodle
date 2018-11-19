import * as React from 'react';
import Card from '../Card/Card';
import fetchPictures from '../../utils/fetchPictures';
import Button from '@material-ui/core/Button';

export interface Picture {
  id: number,
  title: string,
  url: string,
  liked: boolean | null,
}

interface State {
  loading: boolean,
  currentPicture: number,
  pictures: Picture[],
}

class Cards extends React.Component<null, State> {
  constructor() {
    super(null);
    this.state = {
      loading: true,
      currentPicture: 0,
      pictures: [],

    }
  }

  componentWillMount() {
    fetchPictures()
      .then(pictures => this.setState({
        pictures,
        loading: false,
      }, () => console.log(this.state)));
  }

  // move to different file
  getNextPicture = (currentPicture: number, limit: number) => {
    const nextPicture = currentPicture + 1;
    return (nextPicture > limit) ? 0 : nextPicture;
  }

  restart = () => {
    this.setState({
      loading: false,
      currentPicture: 0,
      pictures: this.state.pictures.map(
        pic => ({ ...pic, liked: false })
      )
    })
  }

  skip = () => {
    const { currentPicture, pictures } = this.state;
    const limit = pictures.length - 1;
    this.setState({
      currentPicture: this.getNextPicture(currentPicture, limit),
    });
  }

  ratePicture = (rating: boolean, id: number) => {
    console.log(id);
    const { pictures } = this.state;
    const otherPics = pictures.filter(pic => {
      return pic.id !== id
    });

    let ratedPic = pictures.find(pic => { 
      return pic.id === id 
    });

    const newRatedPic = ratedPic ? { ...ratedPic, liked: rating } : { id: 0, url: '', title: '', liked: null }
    console.log(ratedPic);
    console.log('ratedPic :', ratedPic);
    this.setState(
      {
        pictures: [
          ...otherPics,
          newRatedPic
        ],
      },
      () => {
        this.skip()
        console.log(this.state);
      }
    );
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>
    }
    const { pictures, currentPicture } = this.state;
    return (
      <div>
        <Button
          style={{ marginTop: '20px' }}
          variant="outlined"
          color="secondary"
          onClick={this.restart}
        >Restart</Button>
        <Card
          picture={pictures.find(pic => pic.id === currentPicture)}
          skip={this.skip}
          ratePicture={this.ratePicture}
        />
      </div>
    )
  }
}

export default Cards;
