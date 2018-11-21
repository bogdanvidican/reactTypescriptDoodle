import * as React from 'react';
import Card from '../Card';
import Summary from '../Summary';
import { fetchPictures } from '../../utils/fetchPictures';
import Button from '@material-ui/core/Button';

export interface Picture {
  id: number,
  title: string,
  url: string,
  rating: boolean | null,
  skipped: boolean | null,
}

interface Props {}

interface State {
  loading: boolean,
  currentPicture: number,
  pictures: Picture[],
}

class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      currentPicture: -1,
      pictures: [],
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
        pic => ({ ...pic, rating: null, skipped: null })
      )
    })
  }

  next = () => {
    const { currentPicture, pictures } = this.state;
    const limit = pictures.length - 1;
    this.setState({
      currentPicture: currentPicture === limit ? limit : currentPicture + 1
    });
  }

  skip = () => {
    const { currentPicture } = this.state;
    this.setState({
      pictures: this.state.pictures.map(
        (pic: Picture): Picture => {
          if (pic.id === currentPicture) {
            return { ...pic, skipped: true };
          }
          return pic;
        }
      )
    }, this.next);
  }

  ratePicture = (rating: boolean, id: number) => {
    const { pictures } = this.state;
    this.setState(
      {
        pictures: pictures.map(pic => { 
          if (pic.id === id) {
            pic.rating = rating
          }
          return pic;
        }),
      },
      this.next
    );
  }

  render() {
    const { loading, currentPicture, pictures } = this.state;
    if (loading) {
      return <div>Loading...</div>
    }
    if (currentPicture === (pictures.length - 1)) {
      return <Summary pictures={pictures} restart={this.restart} />
    }
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
