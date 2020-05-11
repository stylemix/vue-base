import { withKnobs } from '@storybook/addon-knobs'
import DefaultLayoutsStory from './layouts/DefaultLayoutsStory'
import CustomLayoutStory from './layouts/CustomLayoutStory'

export default {
  title: 'Layouts',
  decorators: [ withKnobs ],
}

export const DefaultLayouts = () => DefaultLayoutsStory
export const CustomLayout = () => CustomLayoutStory
