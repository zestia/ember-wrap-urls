import Controller from '@ember/controller';
import { text } from '../utils/samples';
import { tracked } from '@glimmer/tracking';

export default class Indexontroller extends Controller {
  @tracked text = text;

  setText = ({ target: { value } }) => {
    this.text = value;
  };
}
