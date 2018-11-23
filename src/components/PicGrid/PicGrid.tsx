import * as React from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core';
import IPicture from '../Cards';
import { Thumbnail } from '../Thumbnail';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

type Classes = 'root' | 'gridList' | 'title';

export interface IProps {
  type: string,
  pictures: IPicture[],
}

export interface InnerProps extends IProps, WithStyles<Classes> {}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 450,
  },
  title: {
    height: 80,
  }
});

export const PicGridComponent = ({ type, pictures, classes }: InnerProps) => {
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList}>
        <GridListTile cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">{type.toUpperCase()}</ListSubheader>
        </GridListTile>
        {pictures.map(pic => (
          <Thumbnail
            key={pic.thumb}
            title={pic.title}
            thumb={pic.thumb}
          />
        ))}
      </GridList>
    </div>
  );
}

export const PicGrid = withStyles(styles)(PicGridComponent);
