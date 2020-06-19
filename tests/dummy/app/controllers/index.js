import Controller from '@ember/controller';
import { action } from '@ember/object';
import { text } from '../utils/samples';
import { tracked } from '@glimmer/tracking';

export default class Indexontroller extends Controller {
  @tracked text = text;

  @action
  setText({ target: { value } }) {
    this.text = value;
  }
}
