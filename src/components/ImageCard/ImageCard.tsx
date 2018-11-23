import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Picture from '../Cards';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme: Theme) => createStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 4,
  },
  media: {
    objectFit: 'cover',
  },
});

export interface IProps {
  picture: Picture,
  skip: () => void,
  ratePicture: (rating: boolean, id: number) => void,
  classes?: any;
}

function ImageCard({ picture: {id, title, url}, skip, ratePicture, classes }: IProps) {
  return(
    <Card className={classes.card}>
      <CardMedia
        component="img"
        className={classes.media}
        image={url}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.buttons}>
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
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(ImageCard);
