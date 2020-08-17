import React, { Component } from 'react'
import {Consumer} from '../../context'
import Spinner from '../layout/Spinner'
import Track from '../tracks/Track'

 class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value =>{
          const {trackList, heading} = value
          if(trackList === undefined || trackList.length === 0){
            return <Spinner/>
          }else {
            return (
              <React.Fragment>
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {trackList.map((item, i ) => <Track track={item.track} key={i}/>)}
                </div>
              </React.Fragment>
            )
          }
        }}
      </Consumer>
    )
  }
}
export default Tracks
