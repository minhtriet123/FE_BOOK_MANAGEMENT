import React, { useState } from "react";
import PropTypes from "prop-types";
import Autocomplete from "react-autocomplete";

AutocomplementBox.propTypes = {
  data: PropTypes.array,
  setName: PropTypes.func,
  setId: PropTypes.func,
};

AutocomplementBox.defaultProps = {
  data: null,
  setName: null,
  setId: null,
};

function AutocomplementBox(props) {
  const { data, setName, setId } = props;
  const [value, setValue] = useState("");

  function handleOnChange(e) {
    setValue(e.target.value);
    setName(e.target.value);
    const name = e.target.value;
    const find = data.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (find) {
      setId(Number(find.id));
    }
  }

  function handleOnSelect(val) {
    setValue(val);
    setName(val);
    const find = data.find(
      (item) => item.name.toLowerCase() === val.toLowerCase()
    );
    if (find) {
      setId(Number(find.id));
    }
  }
  return (
    <Autocomplete
      items={data}
      shouldItemRender={(item, value) =>
        item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      }
      getItemValue={(item) => item.name}
      renderItem={(item, highlighted) => (
        <div
          key={item.id}
          style={{ backgroundColor: highlighted ? "#eee" : "transparent" }}
        >
          {item.name}
        </div>
      )}
      value={value}
      onChange={handleOnChange}
      onSelect={handleOnSelect}
    />
  );
}

export default AutocomplementBox;
