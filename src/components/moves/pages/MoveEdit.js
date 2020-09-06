import React from 'react';
import { connect } from 'react-redux';
import MoveForm from '../MoveForm';
import Loading from '../../common/Loading';
import { editMove, fetchMove } from '../../../actions';
import { moveToForm } from '../../../utils/forms';

class MoveEdit extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.props.fetchMove(this.props.match.params.key);
  }
  

  onFormSubmit = async formVals => {
    this.setState({ loading: true });
    await this.props.editMove(formVals);
    this.props.history.push('/moves/list');
  };

  render() {
    if (this.state.loading || !this.props.move) {
       return  <Loading />;
    } else {
      const moveVals = moveToForm(this.props.move);
      return (
        <div>
          <MoveForm 
            move={moveVals}
            onFormSubmit={this.onFormSubmit} 
          />
        </div>
      );
    }
  };
  
};

const mapStateToProps = (state, ownProps) => {
  return { move: state.moves[ownProps.match.params.key]};
};

export default connect(mapStateToProps, { fetchMove, editMove })(MoveEdit);
