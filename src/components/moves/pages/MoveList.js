import React from 'react';
import { connect } from 'react-redux';

import Loading from '../../common/Loading';
import MoveAdminOptions from '../MoveAdminOptions'
import { fetchMoves } from '../../../actions';

class MoveList extends React.Component {
  componentDidMount() {
    this.props.fetchMoves();
  }

  renderList() {
    return this.props.moves.map(move => {
      return (
        <tr key={move.key}>
          <td>{move.name} ({move.key})</td>
          <td>{move.playbook}</td>
          <td className="admin-options">
            <MoveAdminOptions moveKey={move.key} moveName={move.name} />
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.moves.length < 1) {
      return <Loading />;
    } else {
      return (
        <div>
          <h3>
            Moves
            <a href="/moves/new">
              <i className="plus icon right" />
            </a>
          </h3>
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
