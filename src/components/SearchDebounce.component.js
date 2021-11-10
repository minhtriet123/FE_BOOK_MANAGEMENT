import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

SearchDebounce.propTypes = {
  onSubmit: PropTypes.func,
  placeHolder: PropTypes.string,
}

SearchDebounce.defaultProps = {
  onSubmit: null,
  placeHolder: "",
};

function SearchDebounce(props) {
  const { onSubmit, placeHolder } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(e.target.value);
    if (!onSubmit) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const formValues = { searchTerm: value };
      onSubmit(formValues);
    }, 300);
  }
  function submitHandler(e) {
    e.preventDefault();
}
  return (
     <form className="form-inline" onSubmit={submitHandler}>
          <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={`${placeHolder}`}
        aria-label="Search"
        onChange={handleSearchTermChange}
      />
     </form>
     
  );
}

export default SearchDebounce;
