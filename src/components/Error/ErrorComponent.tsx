import { Component } from 'react';
import styles from './Error.module.css';
interface ErrorProps {
  message: string;
}
export class ErrorComponent extends Component<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.error}>
        <p className={styles.error_message}>
          Something went wrong
          <br />
          {this.props.message}
        </p>
      </div>
    );
  }
}
