import * as React from 'react';
import { WithStyles, withStyles, GridListTile, GridListTileBar, createStyles } from '@material-ui/core';

type ClassKeys = 'tile';

export interface IProps {
  title: string,
  thumb: string,
}

export interface InnerProps extends IProps, WithStyles<ClassKeys> {}

const style = () => createStyles({
  tile: {
    width: 200,
    height: 200,
    margin: 12.5,
    borderRadius: '4px',
  },
});

export const ThumbnailComponent = ({ title, thumb, classes }: InnerProps) => {
  return (
    <GridListTile classes={{ tile: classes.tile }}>
      <img src={thumb} alt={title} />
      <GridListTileBar
        title={title}
      />
    </GridListTile>
  )
};

export const Thumbnail = withStyles(style)(ThumbnailComponent);
