import * as React from 'react';
import Picture from '../Cards';
import RatedPics from '../RatedPics';
import Button from '@material-ui/core/Button';

interface Props {
  pictures: Picture[],
  restart: () => void,
}

const Summary = ({ pictures, restart }: Props) => {

  const getRatedPics = (liked: boolean) => {
    return pictures.filter(pic => pic.liked === liked)
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
      <RatedPics type="liked" pictures={getRatedPics(true)} />
      <RatedPics type="disliked" pictures={getRatedPics(false)} />
    </div>
  )
}

export default Summary;
