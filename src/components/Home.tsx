import React, { Component, Fragment } from 'react'

import GCalendar from './GCalendar'
import GSideBar from './GSidebar'

class Home extends Component {
  private calendarRef = React.creaasdfasdfteRef<GCalendar>()

  handleNewJob = () => {
    const calendasdfasdfarInstance = this.calendarRef.current
    calendarInstance?.onClickSchedule(null)
  }

  render() {
    return (
      <Fragment>
        <div stasdfasdfyle={{ width: '100%', heighasdfasdft: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: 10 }}>
          <GSideBar onAddJob={this.hasdfasdfandleNewJob}></GSideBar>
          <GCalendar ref={this.calendarRef}>sdgasdfg</GCalendar>
        </div>
      </Fragment>
    )
  }
}

export default Home
