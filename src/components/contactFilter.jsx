export const ContactFilter = (props) => {
  const onSetFilter = (e) => {
    props.setFilter(e.target.value);
  };

  return (
    <div className="filter-container">
      <input
        className="filter-input"
        type="text"
        placeholder="Search"
        onChange={(e) => onSetFilter(e)}
      />
    </div>
  );
};
