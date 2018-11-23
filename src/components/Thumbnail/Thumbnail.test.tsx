import * as React from 'react';
import { shallow } from 'enzyme';
import { ThumbnailComponent } from './Thumbnail';
import { InnerProps } from './Thumbnail';
import { GridListTileBar } from '@material-ui/core';

const props: InnerProps = {
    thumb: 'https://some.test.thumb',
    title: 'some test title',
    classes: {
      tile: 'tile'
    }
}

let wrapper: any;

beforeEach(() =>{
  wrapper = shallow(<ThumbnailComponent {...props} />);
})
  
describe('<Thumbnail />', () => {
  const { thumb, title } = props;
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  it('uses correct thumb src', () => {
    expect(wrapper.find('img').prop('src'))
      .toEqual(thumb);
  });
  it('has correct title displayed', () => {
    expect(wrapper.find(GridListTileBar).prop('title'))
      .toEqual(title);
  });
});
