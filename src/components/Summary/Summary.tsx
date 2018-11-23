import * as React from 'react';
import IPicture from '../Cards';
import { PicGrid } from '../PicGrid';
import Button from '@material-ui/core/Button';

export interface Props {
  pictures: IPicture[],
  restart: () => void,
}

const KEYS = {
  RATING: 'rating',
  SKIPPED: 'skipped',
}

export const Summary = ({ pictures, restart }: Props) => {
  const getPics = (key: string, value: boolean) => {
    return pictures.filter((pic: IPicture) => pic[key] === value)
  }

  const likedPics = getPics(KEYS.RATING, true)
  const disLikedPics = getPics(KEYS.RATING, false)
  const skippedPics = getPics(KEYS.SKIPPED, true)

  return (
    <div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={restart}
      >
        Restart
      </Button>
      {!!(likedPics.length) && <PicGrid type="liked" pictures={likedPics} />}
      {!!(disLikedPics.length) && <PicGrid type="disliked" pictures={disLikedPics} />}
      {!!(skippedPics.length) && <PicGrid type="skipped" pictures={skippedPics} />}
    </div>
  )
}
