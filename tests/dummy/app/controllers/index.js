import Controller from '@ember/controller';
import { set, action } from '@ember/object';
import { text } from '../utils/samples';

export default class Indexontroller extends Controller {
  text = text;

  @action
  setText({ target: { value } }) {
    set(this, 'text', value);
  }
}
