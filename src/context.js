import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext()
const reducer = (state, action) => {
  switch(action.type){
    case 'SEARCH_TRACKS':
      return {
        ...state,
        trackList: action.payload,
        heading: 'Search Result'
      }
    default:
      return state
  }
}
export class Provider extends Component {
  constructor() {
    super()
    this.state = {
      trackList: [],
      heading: 'Top 10 Tracks',
      dispatch: action => this.setState(state => reducer(state, action))
    }
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=co&f_has_lyrics=1&apikey='+process.env.REACT_APP_MM_KEY,
      headers: { 'Origin': 'https://api.musixmatch.com/ws/1.1/' }
    })
      .then(res => {
        // console.log(res.data)
        this.setState({
          trackList: res.data.message.body.track_list
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
export const Consumer = Context.Consumer
