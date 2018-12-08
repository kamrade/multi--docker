import React, { Component } from 'react';
import axios from 'axios';

const FETCH_VALUES_PATH = '/api/values/current';
const FETCH_INDEXES_PATH = '/api/values/all';
const POST_CURRENT_VALUE = '/api/values';

class Fib extends Component {

  state = {
    seenIndexes: [],
    values: {},
    index: ''
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get( FETCH_VALUES_PATH );
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get( FETCH_INDEXES_PATH );
    this.setState({ seenIndexes: seenIndexes.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post( POST_CURRENT_VALUE , {
      index: this.state.index
    });
    this.setState({ index: '' });
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map( ({ number }) => number ).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fib-index">Enter your index</label>
          <input
            onChange={event => this.setState({ index: event.target.value })}
            value={this.state.index} type="text" id="fib-index"/>
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        { this.renderSeenIndexes() }

        <h3>Calculated values</h3>
        { this.renderValues() }

      </div>
    );
  }
}

export default Fib;
