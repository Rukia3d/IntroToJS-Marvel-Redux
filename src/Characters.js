import React from 'react';
import ShowCharacters from './ShowCharacters';
import { connect } from 'react-redux';


const Characters = (props) => (
  <div data-testid="characters" className="row">
   {props.hasChars
     ? <ShowCharacters />
     : <NoCharacters />
  }
  </div>
);

const NoCharacters = (props) => (
    <div className="col-lg-4">
      <div className="bs-component">
        <div className="alert alert-dismissible alert-danger">
          <strong>No characters</strong>
        </div>
      </div>
    </div>
);

function mapStateToProps(state){
  return { hasChars: state.team.length>0 }
}

export default connect(mapStateToProps)(Characters);
