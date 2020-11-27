import React from 'react';
import renderer from 'react-test-renderer';
import FullScreen from '../src/component/plugin-fullScreen';



  describe('Header', () => {
    it('should render a top level div', () => {
      const rendered = renderer.create(
        <FullScreen element={(<div>  info</div>)} />
      );

       expect(rendered.toJSON()).toMatchSnapshot();
    });
  })