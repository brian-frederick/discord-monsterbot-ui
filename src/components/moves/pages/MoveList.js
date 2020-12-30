import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../../common/Loading';
import Dropdown from '../../common/Dropdown';
import { fetchMoves } from '../../../actions';
import { PUBLIC_GUILD_ID, userGuildOptions } from '../../../utils/guilds';


class MoveList extends React.Component {
  state = {
    guildId: PUBLIC_GUILD_ID,
    loading: true
  };

  async componentDidMount() {
    await this.props.fetchMoves(this.state.guildId);
    this.setState({loading: false});
  }

  onSelectChange = async (name, option) => {
    this.setState({
      [name]: option,
    });

    this.setState({loading: true});
    this.props.fetchMoves(option);
    this.setState({loading: false});
  };

  renderGuildSelector() {
    if (!this.props.user || !this.props.user.guilds) {
      return <p>Login to see moves for your guilds.</p>;
    } else {
      return (
        <div>
          <form className="ui form">
            <Dropdown
              name="guildId"
              label='Guild'
              options={userGuildOptions(this.props.user.guilds)}
              selected={this.state.guildId}
              onSelectedChange={this.onSelectChange}
            />
          </form>
        </div>
      );
    }
  }

  renderMoves() {
    if (!this.props.moves || this.props.moves.length < 1) {
      return <p>No moves found for this guild.</p>;
    } else {
      return (
        <table className="ui very basic table">
          <tbody >
            {this.renderList()}
          </tbody>
        </table>
      );
    }
  }

  renderList() {
    return this.props.moves.map(move => {
      return (
        <tr key={`${move.key}-${move.guildId}`}>
          <td>
            <Link 
              className="move-list-link" 
              to={`/moves/show/${move.key}/guild/${move.guildId}`}>
              {move.name} ({move.key})
            </Link>
          </td>
          <td>{move.playbook}</td>
          <td>{move.guildName}</td>
          <td>{move.userName}</td>
        </tr>
      );
    });
  }


  render() {
    if (this.state.loading) {
      return <Loading />
    } else {
      return (
        <div>
          <h3>
            Moves
            <Link to="/moves/new">
              <i className="plus icon right" />
            </Link>
          </h3>
          {this.renderGuildSelector()}
          {this.renderMoves()}
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    moves: Object.values(state.moves),
    user: state.user
  };
}

export default connect(mapStateToProps, { fetchMoves })(MoveList);
