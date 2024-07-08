import { Component } from 'react';
import styles from './MainPage.module.css';
import { Search } from '../../components/Search/Search';
import { fetchCharacters } from '../../api/api';
import { ListView } from '../../components/ListView/ListView';
import { MainPageState } from './MainPage-interface';
import { LS_KEY } from '../../constants/constants';
import { ComponentWithError } from '../../components/Error/ComponentWithError';
import { ErrorComponent } from '../../components/Error/ErrorComponent';

export class MainPage extends Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      info: { count: null, pages: null, next: null, prev: null },
      items: [],
      clickedError: false
    } as MainPageState;
  }
  componentDidMount() {
    const valueFromLS = localStorage.getItem(LS_KEY);
    if (valueFromLS) {
      this.getSearchedValue(valueFromLS);
    } else {
      this.getAllCharacters();
    }
  }

  getAllCharacters = async () => {
    this.setState({ isLoaded: false });
    try {
      const result = await fetchCharacters();
      this.setState({
        isLoaded: true,
        items: result.results || [],
        error: null
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error: error as Error
      });
    }
  };

  getSearchedValue = async (value: string) => {
    this.setState({ isLoaded: false });
    try {
      const result = await fetchCharacters(value);
      this.setState({
        isLoaded: true,
        items: result.results || [],
        error: null
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error: error as Error
      });
    }
  };

  onFormSubmit = (value: string) => {
    localStorage.setItem(LS_KEY, value);
    if (value) {
      this.getSearchedValue(value);
    } else {
      this.getAllCharacters();
    }
  };
  throwError = () => {
    this.setState({ clickedError: true });
  };
  render() {
    const { error, isLoaded, items } = this.state;
    return (
      <main className={styles.main_content__wrapper}>
        <section className={styles.search__section}>
          <Search onSubmit={this.onFormSubmit} />
        </section>
        {error ? (
          <ErrorComponent message={error.message} />
        ) : !isLoaded ? (
          <div>Loading...</div>
        ) : (
          <section className={styles.content__section}>
            <ListView data={items} />
            <button onClick={this.throwError} className={styles.button}>
              Throw error
            </button>
            {this.state.clickedError && <ComponentWithError />}
          </section>
        )}
      </main>
    );
  }
}
