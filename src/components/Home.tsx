import React, { Component, Fragment } from 'react'

import GCalendar from './GCalendar'
import GSideBar from './GSidebar'

class Home extends Component {
  private calendarRef = React.createRef<GCalendar>()

  handleNewJob = () => {
    const calendarInstance = this.calendarRef.current
    calendarInstance?.onClickSchedule(null)
  }

  render() {
    return (
      <Fragment>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', marginTop: 10 }}>
          <GSideBar onAddJob={this.handleNewJob}></GSideBar>
          <GCalendar ref={this.calendarRef}></GCalendar>
        </div>
      </Fragment>
    )
  }
}

export default Home
