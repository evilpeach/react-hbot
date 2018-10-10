import React from 'react';
import axios from 'axios';

export default class InformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const query = this.props.location.search;
    const userId = query.split('=')[1];
    this.setState({userId: userId});
    // alert(userId);
    // alert(this.props.location.search);
  }

  handleChange(e) {
    this.setState({message: e.target.value});
  }

  handleSubmit(event) {
    const data2 = {
      user: [this.state.userId],
      message: this.state.message
    }

    axios.post('http://localhost:8081/api/test', data2).then((response) => {
      console.log(response.data.a);
    }).catch((e) => {
      console.log(e);
    });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.message} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div> 
    );
  }
}
