import React from 'react';
import { connect } from 'react-redux';
import SimpleFields from '../moves/typeFields/SimpleFields';
import RollForOutcomeFields from '../moves/typeFields/RollForOutcomeFields';
import MoveModificationFields from '../moves/typeFields/MoveModificationFields';
import { validateMove, parseMove } from '../../utils/forms';
import { fetchMoves } from '../../actions';

class MoveForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      errors: { hasErrors: false },

      // we do a one time copy of the initial state of parent's move.
      // this allows us to reuse the same form for edit and create.
      ...this.props.move
    };
  }

  componentDidMount() {
    // if we're creating a move, instead of just editing,
    // we'll need to validate that the key does not already belong to an existing move.
    if (this.props.createMode) {
      this.props.fetchMoves();
    }
  }

  renderTypeFields = () => {
    switch (this.state.type) {
      case 'simple':
        return null;
      case 'roll':
        return <RollForOutcomeFields 
          modifiers={this.state.modifiers}
          missOutcome={this.state.missOutcome}
          fairOutcome={this.state.fairOutcome}
          successOutcome={this.state.successOutcome}
          onChange={this.onInputChange}
          onModifiersChange={this.onModifiersChange}
        />;
      case 'modification':
        return (
          <MoveModificationFields
            moveToModify={this.state.moveToModify}
            modifiers={this.state.modifiers}
            onModifiersChange={this.onModifiersChange}
            onSelectChange={this.onSelectChange}
          />
        );
      default:
        return null;
    }
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelectChange = (name, option) => {
    this.setState({ [name]: option });
  };

  onModifiersChange = (modifiers) => {
    this.setState({ 'modifiers': modifiers })
  };

  onSubmit = (event) => {
    event.preventDefault();
    let errors = validateMove(this.state, this.props.createMode, this.props.moves);
    this.setState({ errors });
    
    if (errors.hasErrors) {
      return;
    }

    const move = parseMove(this.state);

    console.log('submitting state now', move);
    this.props.onFormSubmit(move);
  }

  render() {
    return (
      <div>
        <h3 className="ui header center aligned">Create A Move</h3>
        
        <form 
          className={ this.state.errors.hasErrors ? 'ui form error' : 'ui form'} 
          onSubmit={this.onSubmit}
        >

          <SimpleFields
            keyVal={this.state.key}
            name={this.state.name}
            description={this.state.description}
            type={this.state.type}
            playbook={this.state.playbook}
            onInputChange={this.onInputChange}
            onSelectChange={this.onSelectChange}
            createMode={this.props.createMode}
            errors={this.state.errors}
          />

          {this.renderTypeFields()}
          
          <div className="field">
            <button className="ui primary button submit right floated" type="submit" >Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    moves: state.moves
  };
}

export default connect(mapStateToProps, { fetchMoves })(MoveForm);
