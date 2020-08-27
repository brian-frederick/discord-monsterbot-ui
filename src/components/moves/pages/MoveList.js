import React from 'react';
import { connect } from 'react-redux';

import { fetchMoves } from '../../../actions';

class MoveList extends React.Component {
  componentDidMount() {
    this.props.fetchMoves();
  }

  render() {
    console.log('to list', this.props.moves);
    return (
      <div>
        Hello
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
