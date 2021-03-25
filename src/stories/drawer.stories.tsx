import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Drawer } from './component/drawer';

import { IProps } from '../component/plugin-drawer';

export default {
  title: 'Example/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<IProps> = (args) => <Drawer {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  visible: true,
  open: false,
  contentPreview: {
    picture: "https://devcdn.xylink.com/test/dump_img.jpg",
    viewCount: 20,
    timestap:  [5, 25, 120, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320]
  },
  prefixCls: 'test'
  
};

export const Secondary = Template.bind({});
Secondary.args = {
  visible: false
};



// contentPreview={{
//   picture: "https://devcdn.xylink.com/test/dump_img.jpg",
//   viewCount: 20,
//   timestap: ['05', '25', '120']
// }}