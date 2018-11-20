import * as React from 'react';
import Card from '../Card';
import Summary from '../Summary';
import { fetchPictures } from '../../utils/fetchPictures';
import Button from '@material-ui/core/Button';
import { areAllRated } from '../../utils';

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
  allRated: boolean,
}

class Cards extends React.Component<null, State> {
  constructor() {
    super(null);
    this.state = {
      loading: true,
      currentPicture: -1,
      pictures: [],
      allRated: false,
    }
  }

  componentWillMount() {
    this.init();
  }

  init = () => {
    fetchPictures()
      .then(pictures => this.setState({
        pictures,
        loading: false,
        currentPicture: 0,
        allRated: false,
      }));
  }

  restart = () => {
    this.setState(
      { loading: true },
      this.init
    );
  }

  reset = () => {
    this.setState({
      loading: false,
      currentPicture: 0,
      pictures: this.state.pictures.map(
        pic => ({ ...pic, liked: null })
      )
    })
  }

  skip = () => {
    const { currentPicture, pictures } = this.state;
    const limit = pictures.length - 1;
    let allRated = null;
    let nextPic = null;
    if (currentPicture === limit) {
      allRated = areAllRated(pictures);
      nextPic = allRated ? limit : 0;
    } else {
      allRated = false;
      nextPic = currentPicture + 1
    }
    this.setState({
      currentPicture: nextPic,
      allRated,
    });
  }

  ratePicture = (rating: boolean, id: number) => {
    const { pictures } = this.state;
    this.setState(
      {
        pictures: pictures.map(pic => { 
          if (pic.id === id) {
            pic.liked = rating
          }
          return pic;
        }),
      },
      this.skip
    );
  }

  render() {
    const { loading, allRated, pictures } = this.state;
    if (loading) {
      return <div>Loading...</div>
    }
    if (allRated) {
      return <Summary pictures={pictures} restart={this.restart} />
    }
    const { currentPicture } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.reset}
        >Reset</Button>
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
