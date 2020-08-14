import React from 'react';
import aws from '../apis/aws';


export default class MoveForm extends React.Component {
  state = {
    key: '',
    type: 'simple',
    name: '',
    description: '',
  }

  onFormSubmit = async event => {
    event.preventDefault();
    const response = await aws.post('/moves', {
      params: {
        move: {
          key: this.state.key,
          name: this.state.name,
          type: this.state.type,
          description: this.state.description
        }
      }
    })
  };

  onInputChange = (event) => {
    console.log('theEvent', event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Create a move</h1>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Key</label>
            <input 
              type="text"
              placeholder="Key"
              name="key"
              value={this.state.key}
              onChange={this.onInputChange}
            />
          </div>
          <div className="field">
            <label>Name</label>
            <input 
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.onInputChange}
            />
          </div>
          <div className="field">
            <label>Type</label>
            <input 
              type="text" 
              placeholder="Type"
              name="type"
              value={this.state.type}
              onChange={this.onInputChange}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea 
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onInputChange}
            />
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
      </div>
    );
  };

};
