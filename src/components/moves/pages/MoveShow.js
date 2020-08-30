import React from 'react';
import { connect } from 'react-redux';
import { fetchMove } from '../../../actions';
import Modifier from '../modifier/Modifier';
import MoveAdminOptions from '../MoveAdminOptions';
import Loading from '../../common/Loading';

const movesMap = {
  ksa: 'Kick Some Ass',
  aup: 'Act Under Pressure',
  ho: 'Help Out',
  iam: 'Investigate A Mystery',
  ms: 'Manipulate Someone',
  ps: 'Protect Someone',
  rabs: 'Read A Bad Situation',
  um: 'Use Magic',
};

class MoveShow extends React.Component {

  componentDidMount() {
    this.props.fetchMove(this.props.match.params.key);
  }
  
  renderMoveModification() {
    const { moveToModify } = this.props.move;

    return (
      <div className="ui segment">
        <div>Move to modify: {movesMap[moveToModify]}</div>
        {this.renderModifiers()}
      </div>
    );
  }

  renderModifiers() {
    if (!this.props.move.modifiers) {
      return null;
    } else {
      return (
        <div>
          Modifiers
          {this.props.move.modifiers.map((mod, i) => { 
            return (
              <div key={i}>
                <Modifier mod={mod} index={i} editable={false} onDelete={this.onDelete} />
              </div>
            );
          })}
        </div>
      );  
    }
  }
  
  renderRollFields() {
    const { missOutcome, fairOutcome, successOutcome, advancedOutcome } = this.props.move;

    return (
      <div className="ui segment">
        Roll Outcomes
        <div className="ui segments">
          <div className="ui segment">
            <div className="ui sub header">On a miss...</div>
            <p>{missOutcome}</p>
            <div className="ui sub header">On a 7+...</div>
            <p>{fairOutcome}</p>
            <div className="ui sub header">On a 10+...</div>
            <p>{successOutcome}</p>
            <div className="ui sub header">On a 12+...</div>
            <p>{advancedOutcome}</p>
          </div>
        </div>
        {this.renderModifiers()}
      </div>
    )
  }

  renderMove() {
    const { move } = this.props;
    return (
      <div>
        <div>
            <h3>
              {move.name} ({move.key})
              <div className="right">
                <MoveAdminOptions  moveKey={move.key} moveName={move.name}/> 
              </div>
            </h3>
            <div className="ui segments">
              <div className="ui segment">
                <div>Type: {move.type}</div>
                <div>Playbook: {move.playbook}</div>
                <div>Description: {move.description}</div>
              </div>
              {move.type === 'roll' && 
                this.renderRollFields()
              }
              { move.type === 'modification' &&
                this.renderMoveModification()
              }
            </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.move) {
      return <Loading />
    }
    else {
     return this.renderMove();
    }
  }
    
}

const mapStateToProps = (state, ownProps) => {
  return { move: state.moves[ownProps.match.params.key]};
};

export default connect(mapStateToProps, { fetchMove })(MoveShow);
