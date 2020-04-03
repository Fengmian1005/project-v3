import 'react-day-picker/lib/style.css'

import { DataStore } from '@aws-amplify/datastore'
import { withAuthenticator } from 'aws-amplify-react'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import DayPicker from 'react-day-picker'

import { CompanySettings } from './../models'

interface IRecipeProps {
  onAddJob: any
}

class GSideBar extends Component<IRecipeProps> {
  handleAddJob = () => {
    this.props.onAddJob()
  }

  state = {
    ppState: '23' as any,
  }

  private my_settings = {
    companyName: '' as any,
    numberOfWorkers: 0 as any,
    hoursPerDay: 0 as any,
    workWeek: false as any,
  }

  createSetting = async () => {
    await DataStore.save(
      new CompanySettings({
        companyName: this.my_settings.companyName,
        numberOfWorkers: this.my_settings.numberOfWorkers,
        hoursPerDay: this.my_settings.hoursPerDay,
        workWeek: this.my_settings.workWeek,
        }),
    )
      .then(() => {
        console.log('created CompanySettings model')
      })
      .catch(e => {
        console.log('can not create CompanySettings model', e)
      })
  }

  loadSettings = async () => {
    await DataStore.query(CompanySettings)
      .then(data => {
        console.log('loaded CompanySettings')
        console.log(data)
        this.my_settings = {
          companyName: data[0].companyName,
          numberOfWorkers: data[0].numberOfWorkers,
          hoursPerDay: data[0].hoursPerDay,
          workWeek: data[0].workWeek,
        }
      })
      .catch(e => {
        console.log('can not load CompanySettings', e)
        this.createSetting()
      })
  }

  async componentDidMount(): Promise<void> {
    await this.loadSettings()
    await new Promise(resolve => {
      setTimeout(resolve, 100)
    })
    this.setState({})
    return Promise.resolve()
  }

  render() {

    return (
      <div style={{ width: 300 }}>
        <div style={{ marginLeft: 20 }}>
          <Button variant="secondary" onClick={this.handleAddJob}>
            {' '}
            {'+ Add Job'}{' '}
          </Button>
        </div>
        <DayPicker />
        <div style={{ marginLeft: 20 }}>
          <p style={{ color: 'red', fontSize: 20, padding: 0, marginTop: 0 }}>Company Name :</p>
          <p>{(this.my_settings.companyName = '' ? '' : this.my_settings.companyName)} &nbsp;</p>
          <p style={{ color: 'red', fontSize: 20, padding: 0, marginTop: 0 }}>Number of Workers :</p>
          <p>{this.my_settings.numberOfWorkers > 0 ? this.my_settings.numberOfWorkers : ''} &nbsp;</p>
          <p style={{ color: 'red', fontSize: 20, padding: 0, marginTop: 0 }}>Hours in a Work Day :</p>
          <p>{this.my_settings.hoursPerDay > 0 ? this.my_settings.hoursPerDay : ''} &nbsp;</p>
        </div>
      </div>
    )
  }
}

export default withAuthenticator(GSideBar)
