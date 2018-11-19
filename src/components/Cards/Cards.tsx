import * as React from 'react';
import Card from '../Card/Card';

export interface IProps {
    color?: string 
}

function Cards({ color }: IProps) {
    return (
      <Card url="this is sparta" rating={true} />
    )
}

export default Cards;
