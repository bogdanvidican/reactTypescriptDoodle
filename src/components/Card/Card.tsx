import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Picture from '../Cards';

const styles = createStyles({
  image: {
    display: 'block',
    margin: '20px auto'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginBottom: '20px',
  },
});

export interface IProps {
  picture: Picture,
  skip: () => void,
  ratePicture: (rating: boolean, id: number) => void,
}

function Card({ picture: { id, title, url }, skip, ratePicture }: IProps) {
  return(
    <div>
      <img src={url} style={styles.image}/>
      <h5>{title}</h5>
      <div style={styles.buttons}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => ratePicture(true, id)}
        >
          Like
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => ratePicture(false, id)}
        >
          Dislike
        </Button> 
        <Button
          variant="outlined"
          color="default"
          onClick={skip}
        >
          Skip
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(Card);
