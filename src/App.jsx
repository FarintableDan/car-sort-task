import React from 'react';
import { hot } from 'react-hot-loader/root';
import carsList from './carsList';
import { Header } from './components/Header'
import { Car } from './components/Car'

let currentTemplate = {
  country: '',
  brand: '',
  model: '',
  vin: '',
  year: '',
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      cars: [],
      loading: true,
      query: '',
    }

    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  sortByQuery(item, query) {
    if (!query.trim().length) {
      return true;
    } else {
      return Object.values(item).indexOf(query.toString().trim()) !== -1;
    }
  }

  getCar(item) {
    currentTemplate[item.type] = item.value;
    if (item.type === 'model') {
      currentTemplate.year = '';
    } else if (!item.value) {
      return null;
    }

    if (item.children) {
      item.children.length ? item.children.map((itemItem) => this.getCar(itemItem)) : this.getCar(item.children);
    } else {
      this.state.cars.push({...currentTemplate});
    }
  }

  getData(arr) {
    Array.isArray(arr) && arr.map((item) => {
      this.getCar(item);
    })
  }

  componentDidMount () {
    this.getData(carsList)
    this.setState({ loading: false })
  }

  render () {
    const { cars, query, loading } = this.state
    return (
      <div className="wrapper">
        {!loading && (
          <React.Fragment>
            <Header
              change={this.handlerChange}
            />
            <div className="container">
              {cars.map((car, index) => (
                <Car
                  car={car}
                  key={index}
                  isShow={this.sortByQuery(car, query)}
                />
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default hot(App)
