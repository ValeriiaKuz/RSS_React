import { Component } from 'react';

export class ComponentWithError extends Component {
  render() {
    throw new Error('Ohhhh weeeeee');
  }
}
