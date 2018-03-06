import React from 'react';
import Select from 'react-select'; 
import 'react-select/dist/react-select.css'; 


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