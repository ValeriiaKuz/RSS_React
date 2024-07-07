import { ChangeEvent, Component, FormEvent } from 'react';
import styles from './Search.module.css';
import { LS_KEY } from '../../constants/constants';
interface SearchProps {
  onSubmit: (value: string) => void;
}
interface SearchState {
  value: string;
}
export class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: ''
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  componentDidMount() {
    const valueFromLS = localStorage.getItem(LS_KEY);
    if (valueFromLS) {
      this.setState({ value: valueFromLS });
    }
  }
  onFormSubmit(e: FormEvent) {
    e.preventDefault();
    const searchValue = this.state.value.trim();
    this.props.onSubmit(searchValue);
  }
  onInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <form className={styles.search_form} onSubmit={this.onFormSubmit}>
        <input
          type={'text'}
          placeholder={'Character . . .'}
          className={styles.input}
          value={this.state.value}
          onChange={this.onInputChange}
        />
        <button type={'submit'} className={styles.button}>
          Search
        </button>
      </form>
    );
  }
}
