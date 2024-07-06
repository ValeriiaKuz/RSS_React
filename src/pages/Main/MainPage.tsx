import { Component } from 'react';
import styles from './MainPage.module.css';
import { Search } from '../../components/Search/Search';
import { fetchCharacters, fetchSearchCharacter } from '../../api/api';
import { ListView } from '../../components/ListView/ListView';
import { MainPageState } from './MainPage-interface';
import { LS_KEY } from '../../constants/constants';

export class MainPage extends Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      info: { count: null, pages: null, next: null, prev: null },
      items: [],
      searchValue: ''
    } as MainPageState;
  }
  componentDidMount() {
    const valueFromLS = localStorage.getItem(LS_KEY);
    if (valueFromLS) {
      this.setState({ searchValue: valueFromLS });
      this.getSearchedValue(valueFromLS);
    } else {
      this.getAllCharacters();
    }
  }

  getAllCharacters = () => {
    return fetchCharacters().then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.results,
          error: null
        } as MainPageState);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        } as MainPageState);
      }
    );
  };

  getSearchedValue = (value: string) => {
    return fetchSearchCharacter(value).then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result.results,
          error: null
        } as MainPageState);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        } as MainPageState);
      }
    );
  };
  onFormSubmit = (value: string) => {
    localStorage.setItem(LS_KEY, value);
    if (value) {
      this.getSearchedValue(value);
    } else {
      this.getAllCharacters();
    }
  };
  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <main className={styles.main_content__wrapper}>
        <section className={styles.search__section}>
          <Search onSubmit={this.onFormSubmit} value={this.state.searchValue} />
        </section>
        <section className={styles.content__section}>
          {error ? (
            <div>Error: {error.message}</div>
          ) : !isLoaded ? (
            <div>Loading...</div>
          ) : (
            <ListView data={items} />
          )}
        </section>
      </main>
    );
  }
}
