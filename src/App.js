import React from "react";

const LIST = [
  { id: "1", title: "123" },
  { id: "2", title: "2" },
  { id: "3", title: "33" },
  { id: "4", title: "bar 1" },
  { id: "5", title: "bar 2" },
  { id: "6", title: "bar 3" }
];

const App = () => (
  <div>
    <AdvancedList list={LIST}>
      {manipulatedList => <List list={manipulatedList} />}
    </AdvancedList>
  </div>
);

const isIncluded = query => item =>
  item.title.toLowerCase().includes(query.toLowerCase());

const AdvancedList = ({ list, children }) => {
  const [filterQuery, setFilterQuery] = React.useState("");
  const [sort, setSort] = React.useState("ASC");

  const handleFilterQueryChange = event => {
    setFilterQuery(event.target.value);
  };

  const handleSortChange = event => {
    setSort(event.target.value);
  };

  let derivedList = list.filter(isIncluded(filterQuery));

  derivedList =
    sort === "ASC" ? derivedList.sort() : derivedList.sort().reverse();

  return (
    <section>
      <aside>
        <input
          type="text"
          value={filterQuery}
          onChange={handleFilterQueryChange}
        />

        <Sort value={sort} onChange={handleSortChange} />
      </aside>

      <table>
        <tbody>{children(derivedList)}</tbody>
      </table>
    </section>
  );
};

const List = ({ list }) =>
  list.map(item => (
    <tr key={item.id}>
      <td>{item.title}</td>
    </tr>
  ));

const Sort = ({ value, onChange }) => (
  <>
    <label>
      <input
        type="radio"
        value="ASC"
        checked={value === "ASC"}
        onChange={onChange}
      />
      ASC
    </label>
    <label>
      <input
        type="radio"
        value="DESC"
        checked={value === "DESC"}
        onChange={onChange}
      />
      DESC
    </label>
  </>
);

export default App;
