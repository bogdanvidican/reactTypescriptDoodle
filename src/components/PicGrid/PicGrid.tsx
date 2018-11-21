// import * as React from 'react';
// import { withStyles, Theme } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import { IPicture } from '../Cards/Cards';
// import { ListSubheader } from '@material-ui/core';

// interface IProps {
//   type: string,
//   pictures: IPicture[],
//   classes?: any,
// }

// const styles = (theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     height: 140,
//     width: 100,
//   },
//   control: {
//     padding: theme.spacing.unit * 2,
//   },
// });

// function PicGrid({ type, pictures, classes }: IProps) {
//   return (
//     <Grid container className={classes.root} spacing={16}>
//       <Grid item xs={12}>
//         <Grid container className={classes.demo} justify="center" spacing={16}>
//         <ListSubheader component="div">{type.toUpperCase()}</ListSubheader>
//           {pictures.map(pic => (
//             <Grid key={pic.url} item>
//               <Card className={classes.card}>
//                 <CardMedia
//                   component="img"
//                   className={classes.media}
//                   image={pic.thumb}
//                   title={pic.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5">
//                     {pic.title}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// }

// export default withStyles(styles)(PicGrid);

import * as React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import IPicture from '../Cards';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

interface IProps {
  type: string,
  pictures: IPicture[],
  classes?: any,
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing.unit * 4,
  },
  gridList: {
    width: 450,
  },
  tile: {
    width: 200,
    height: 200,
  },
  title: {
    height: 80,
  }
});

function PicGrid({ type, pictures, classes }: IProps) {
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
          <ListSubheader component="div">{type.toUpperCase()}</ListSubheader>
        </GridListTile>
        {pictures.map(pic => (
          <GridListTile key={pic.thumb} classes={{tile: classes.tile}}>
            <img src={pic.thumb} alt={pic.title} />
            <GridListTileBar
              title={pic.title}
              className={classes.title}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(PicGrid);
