import React from 'react';
import { connect } from 'react-redux';

import { fetchMoves } from '../../../actions';
import MoveAdminOptions from '../MoveAdminOptions';

class MoveList extends React.Component {
  componentDidMount() {
    this.props.fetchMoves();
  }

  renderList() {
    return this.props.moves.map(move => {
      return (
        <tr key={move.key}>
          <td>{move.key}</td>
          <td >{move.name}</td>
          <td className="admin-options">
            <MoveAdminOptions moveKey={move.key} moveName={move.name} />
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.moves.length < 1) {
      return (
        <div className="ui container">
          <div className="ui dimmer active">
            <div className="ui large text loader">beep boop raaar</div>
          </div>
          <p></p>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Moves</h2>
          <table className="ui very basic table">
            <tbody >
              {this.renderList()}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    moves: Object.values(state.moves)
  };
}

export default connect(mapStateToProps, { fetchMoves })(MoveList);
