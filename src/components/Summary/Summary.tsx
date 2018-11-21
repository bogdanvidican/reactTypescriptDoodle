import * as React from 'react';
import Picture from '../Cards';
import RatedPics from '../RatedPics';
import Button from '@material-ui/core/Button';

interface Props {
  pictures: Picture[],
  restart: () => void,
}

const KEYS = {
  RATING: 'rating',
  SKIPPED: 'skipped',
}

export interface PictureWithThumb extends Picture {
  thumb: string,
}

const Summary = ({ pictures, restart }: Props) => {
  const getPics = (key: string, value: boolean) => {
    return pictures.filter((pic: Picture) => pic[key] === value)
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={restart}
      >
        Restart
      </Button>
      <RatedPics type="liked" pictures={getPics(KEYS.RATING, true)} />
      <RatedPics type="disliked" pictures={getPics(KEYS.RATING, false)} />
      <RatedPics type="skipped" pictures={getPics(KEYS.SKIPPED, true)} />
    </div>
  )
}

export default Summary;
