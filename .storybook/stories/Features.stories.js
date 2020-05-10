import { withKnobs } from '@storybook/addon-knobs'
import ValidationStory from './ValidationStory'
import NestedValueStory from './NestedValueStory'
import ScopesStory from './ScopesStory'

export default {
  title: 'Features',
  decorators: [withKnobs],
}

export const Validation = () => ValidationStory
export const NestedValue = () => NestedValueStory
export const Scopes = () => ScopesStory
