import React from 'react';
import { connect } from 'react-redux';
import MoveForm from '../MoveForm';
import Loading from '../../common/Loading';
import { editMove, fetchMove } from '../../../actions';

class MoveEdit extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.props.fetchMove(this.props.match.params.key);
  }
  

  onFormSubmit = async formVals => {
    this.setState({ loading: true });
    console.log('submitting values: ', formVals);
    await this.props.editMove(formVals);
    this.props.history.push('/moves/list');
  };

  render() {
    if (this.state.loading || !this.props.move) {
       return  <Loading />;
    } else {
      return (
        <div>
          <MoveForm 
            move={this.props.move}
            onFormSubmit={this.onFormSubmit} 
          />
        </div>
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return { move: state.moves[ownProps.match.params.key]};
}

export default connect(mapStateToProps, { fetchMove, editMove })(MoveEdit);
