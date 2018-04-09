import React, { Component, Fragment } from 'react';

const LIST = [
  { id: '1', title: '123' },
  { id: '2', title: '2' },
  { id: '3', title: '33' },
  { id: '4', title: 'bar 1' },
  { id: '5', title: 'bar 2' },
  { id: '6', title: 'bar 3' },
];

const App = () => (
  <div>
    <AdvancedList list={LIST}>
      {list => <List list={list} />}
    </AdvancedList>
  </div>
);

const isIncluded = query => item =>
  item.title.toLowerCase().includes(query.toLowerCase());


class AdvancedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterQuery: '',
      sort: 'ASC',
    };
  }

  onFilterQueryChange = event => {
    this.setState({ filterQuery: event.target.value });
  };

  onSortChange = event => {
    this.setState({ sort: event.target.value });
  };

  render() {
    const { list, children } = this.props;
    const { filterQuery, sort } = this.state;

    let derivedList = list.filter(isIncluded(filterQuery));

    derivedList = sort === 'ASC'
      ? derivedList.sort()
      : derivedList.sort().reverse();

    return (
      <section>
        <aside>
          <input
            type="text"
            value={filterQuery}
            onChange={this.onFilterQueryChange}
          />

          <Sort value={sort} onChange={this.onSortChange} />
        </aside>

        <table>
          <tbody>{children(derivedList)}</tbody>
        </table>
      </section>
    );
  }
}

const List = ({ list }) =>
  list.map(item => (
    <tr key={item.id}>
      <td>{item.title}</td>
    </tr>
  ));

const Sort = ({ value, onChange }) => (
  <Fragment>
    <label>
      <input
        type="radio"
        value="ASC"
        checked={value === 'ASC'}
        onChange={onChange}
      />
      ASC
    </label>
    <label>
      <input
        type="radio"
        value="DESC"
        checked={value === 'DESC'}
        onChange={onChange}
      />
      DESC
    </label>
  </Fragment>
);

export default App;
