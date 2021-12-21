import Controller from '@ember/controller';
import { text } from '../utils/samples';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @tracked text = text;

  @action
  setText({ target: { value } }) {
    this.text = value;
  }
}
