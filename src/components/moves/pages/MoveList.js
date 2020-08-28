import React from 'react';
import { connect } from 'react-redux';

import { fetchMoves } from '../../../actions';

class MoveList extends React.Component {
  componentDidMount() {
    this.props.fetchMoves();
  }

  renderAdmin(move) {
    return (
      <div className="right floated content">
        <button className="ui button primary">Edit</button>
        <button className="ui button negative">Delete</button>
      </div>
    );
  }

  renderList() {
    return this.props.moves.map(move => {
      return (
        <tr>
          <td>{move.key}</td>
          <td >{move.name}</td>
          <td className="admin-options">
            <a className="admin-option" href="#"><i class="eye icon"></i></a>
            <a className="admin-option"href="#"><i class="edit outline icon"></i></a>
            <a className="admin-option" href="#"><i class="close icon"></i></a>
          </td>
        </tr>
      );
    });
  }

  render() {
    console.log('to list', this.props.moves);
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

const mapStateToProps = (state) => {
  return {
    moves: Object.values(state.moves)
  };
}

export default connect(mapStateToProps, { fetchMoves })(MoveList);
