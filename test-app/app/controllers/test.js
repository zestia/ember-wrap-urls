import Controller from '@ember/controller';
import { text } from 'test-app/utils/samples';

export default class TestController extends Controller {
  text = text;
}
