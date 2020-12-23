import React from 'react';
import { connect } from 'react-redux';
import SimpleFields from '../moves/typeFields/SimpleFields';
import RollForOutcomeFields from '../moves/typeFields/RollForOutcomeFields';
import MoveModificationFields from '../moves/typeFields/MoveModificationFields';
import { validateMove, formToMove } from '../../utils/forms';
import { fetchMoves } from '../../actions';
import { EMAIL_CONSENT, checkForEmailConsent, saveEmailConsent } from '../../utils/discordLogin';

class MoveForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      errors: { hasErrors: false },
      emailConsent: checkForEmailConsent(),
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
          fail={this.state.fail}
          success={this.state.success}
          high={this.state.high}
          advanced={this.state.advanced}
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

  onCheckboxChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
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

    saveEmailConsent(this.state.emailConsent);

    const move = formToMove(this.state, this.props.user.guilds);

    this.props.onFormSubmit(move);
  }

  render() {
    return (
      <div>
        <h3 className="ui header center aligned">{ this.props.createMode ? 'Create' : 'Edit'} A Move</h3>
        
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
            guildId={this.state.guildId}
            guilds={this.props.user.guilds}
            emailConsent={this.state.emailConsent}
            onInputChange={this.onInputChange}
            onSelectChange={this.onSelectChange}
            onCheckboxChange={this.onCheckboxChange}
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
    moves: state.moves,
    user: state.user
  };
}

export default connect(mapStateToProps, { fetchMoves })(MoveForm);
