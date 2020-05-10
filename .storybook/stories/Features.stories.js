import { withKnobs } from '@storybook/addon-knobs'
import ValidationStory from './ValidationStory'
import NestedValueStory from './NestedValueStory'

export default {
  title: 'Features',
  decorators: [withKnobs],
}

export const Validation = () => ValidationStory
export const NestedValue = () => NestedValueStory
