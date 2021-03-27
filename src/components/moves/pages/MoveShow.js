import React from 'react';
import { connect } from 'react-redux';
import { fetchMove, openModal } from '../../../actions';
import Modifier from '../modifier/Modifier';
import MoveAdminOptions from '../MoveAdminOptions';
import { isMoveOwner } from '../../../utils/discordLogin';
import Loading from '../../common/Loading';
import { compoundKey } from '../../../utils/moves';

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
  state = {
    loading: false
  };

  componentDidMount() {
    this.props.fetchMove(this.props.match.params.key, this.props.match.params.guildId);
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
    const { fail, success, high, advanced } = this.props.move.outcome;

    return (
      <div className="ui segment">
        Roll Outcomes
        <div className="ui segments">
          <div className="ui segment">
            <div className="ui sub header">On a miss...</div>
            <p>{fail.description}</p>
            <div className="ui sub header">On a 7+...</div>
            <p>{success.description}</p>
            <div className="ui sub header">On a 10+...</div>
            <p>{high.description}</p>
            <div className="ui sub header">On a 12+...</div>
            <p>{advanced.description}</p>
          </div>
        </div>
        {this.renderModifiers()}
      </div>
    )
  }

  onBack = () => {
    this.props.history.goBack();
  }

  onChangeOwner = () => {
    this.props.openModal(this.changeOwnerModalContent(this.props.move));
  };

  renderMove() {
    const { move } = this.props;
    return (
      <div>
        <div>
            <h3>
              {move.name} ({move.key})
              <div id="move-show-options" className="right">
                <button
                  className="admin-option"
                  data-tooltip="back"
                  data-position="bottom center"
                  data-inverted
                  onClick={() => this.onBack()}
                >
                  <i  className="arrow left icon"></i>
                </button>
                
                {
                  isMoveOwner(move, this.props.user) &&
                    <MoveAdminOptions 
                      moveKey={move.key}
                      guildId={move.guildId}
                      moveName={move.name}
                    />
                }
                <button
                  className="admin-option"
                  data-tooltip="copy"
                  data-position="bottom center"
                  data-inverted
                  onClick={() => this.props.history.push(`/moves/copy/${move.key}/guild/${move.guildId}`)}
                >
                  <i className="icon copy outline"></i>
                </button>
                
              </div>
            </h3>
            <div className="ui segments">
              <div className="ui segment">
                <div>Type: {move.type}</div>
                <div>Playbook: {move.playbook}</div>
                <div>Description: {move.description}</div>
                <div>Guild: {move.guildName}</div>
                <div>Owner: {move.userName}</div>
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
  return { 
    move: state.moves[compoundKey(ownProps.match.params)],
    user: state.user
  };
};

export default connect(mapStateToProps, { fetchMove, openModal })(MoveShow);
