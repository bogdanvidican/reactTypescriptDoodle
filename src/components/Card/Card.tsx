// import { WithStyles, createStyles } from '@material- ui/core';
import Button from '@material-ui/core/Button';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
import * as React from 'react';

// const styles =  (theme: Theme) => createStyles({
//     button: {
//         margin: '20px'
//     }
// })

// interface IProps extends WithStyles<typeof styles> {
export interface IProps {
    url: string,
    rating: boolean,
  }


function Card({ url, rating }: IProps) {
    return(
        <>
            <p>Card goes here</p>
            <Button
                variant="outlined"
                color="primary"
            >Up</Button>
            <Button
                variant="outlined"
                color="secondary"
            >Down</Button> 
        </>
    )
}

export default Card;
