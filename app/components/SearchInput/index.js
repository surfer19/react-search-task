import React from 'react';
// import SelectInput from '../SelectInput';
import Select from 'react-select'; 
import 'react-select/dist/react-select.css'; 

// export default class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    // constructor(props) {
        // super(props);
    // }
const SearchInput = ({ customPlaceholder, onChange, onInputChange, currentPlaces, selectedOption }) => {
    return (         
        <Select
        value={selectedOption}
        onInputChange={updatedInputValue => onInputChange(updatedInputValue)} //this.handleChange
        onChange={handleSelection => onChange(handleSelection)}
        options={currentPlaces || []}
        placeholder={customPlaceholder}
        /> 
    );
}

export default SearchInput;