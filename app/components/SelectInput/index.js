import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import OuterContainer from './OuterContainer';

class SelectInput extends React.Component {
    constructor(props){
      super(props);
    }
    state = {
      selectedOption: '',
    }
    
    handleChange = (selectedOption) => {
      this.setState({ selectedOption });
      console.log(`Selected: ${selectedOption.label}`);
    }
    render() {
      const { selectedOption } = this.state;
      const value = selectedOption && selectedOption.value;
      

      return (
        <div>      
        <Select
        //   className={OuterContainer}
          value={value}
          onChange={this.handleChange}
          options={          
            this.props.places.allPlaces.map(place => {
              return { 
                value: place.id,
                label: place.value 
              }
            })        
          }
        /> 
        </div>
      );
    }
  }
  
  export default SelectInput;