import * as React from 'react';
import Card from '../Card';
import Summary from '../Summary';
import fetchPictures from '../../utils/fetchPictures';
import Button from '@material-ui/core/Button';
import { areAllRated, /* getNextPicture */ } from '../../utils';

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
      currentPicture: 0,
      pictures: [],
      allRated: false,

    }
  }

  componentWillMount() {
    fetchPictures()
      .then(pictures => this.setState({
        pictures,
        loading: false,
      }));
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
      // currentPicture: getNextPicture(currentPicture, limit),
      currentPicture: currentPicture === limit ? limit : currentPicture + 1,
      allRated: currentPicture === limit ? areAllRated(pictures) : false

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
      () => {
        this.skip()
      }
    );
  }

  render() {
    const { loading, allRated, pictures } = this.state;
    if (loading) {
      return <p>Loading...</p>
    }
    if (allRated) {
      return <Summary pictures={pictures}/>
    }
    const { currentPicture } = this.state;
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
