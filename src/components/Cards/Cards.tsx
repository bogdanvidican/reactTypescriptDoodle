import * as React from 'react';
import ImageCard from '../ImageCard';
import Summary from '../Summary';
import { fetchPictures } from '../../utils/fetchPictures';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface IPicture {
  id: number,
  title: string,
  url: string,
  rating: boolean | null,
  skipped: boolean | null,
  thumb?: string,
}

interface Props {}

interface State {
  loading: boolean,
  currentPicIndex: number,
  pictures: IPicture[],
}

class Cards extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      currentPicIndex: -1,
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
        currentPicIndex: 0,
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
      currentPicIndex: 0,
      pictures: this.state.pictures.map(
        pic => ({ ...pic, rating: null, skipped: null })
      )
    })
  }

  next = () => {
    const { currentPicIndex, pictures } = this.state;
    const limit = pictures.length - 1;
    this.setState({
      currentPicIndex: currentPicIndex === limit ? limit : currentPicIndex + 1
    });
  }

  skip = () => {
    const { currentPicIndex } = this.state;
    this.setState({
      pictures: this.state.pictures.map(
        (pic: IPicture): IPicture => {
          if (pic.id === currentPicIndex) {
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
    const { loading, currentPicIndex, pictures } = this.state;
    const currPic = pictures[currentPicIndex];
    if (loading) {
      return <CircularProgress color="secondary" />
    }
    if (
        currentPicIndex === (pictures.length - 1) &&
        (currPic.rating !== null || currPic.skipped !== null )
      ) {
      return <Summary pictures={pictures} restart={this.restart} />
    }
    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.reset}
        >Reset</Button>
        <ImageCard
          picture={pictures.find(pic => pic.id === currentPicIndex)}
          skip={this.skip}
          ratePicture={this.ratePicture}
        />
      </div>
    )
  }
}

export default Cards;
