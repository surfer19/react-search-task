import React from 'react';
import SelectInput from '../SelectInput';
// import Wrapper from './Wrapper';

export default class Search extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
    }

    render(){
        const prp = this.props;
        console.log('prp', prp);
        return( 
            <SelectInput places={prp}/>
        )
    }
}

// function Search(props) {
//     console.log('props places search=', props.places);
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col">
//                     {/* { props.places.map(place => <li key={place.id}> {place.value}</li>)}  */}
//                     <SelectInput places={props.places}/>
//                 </div>
//                 <div className="col">
//                     {/* <SelectInput /> */}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Search;