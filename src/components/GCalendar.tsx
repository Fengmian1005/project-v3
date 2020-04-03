import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
import 'react-day-picker/lib/style.css'

import './gcalendar.css'

import { DataStore, Predicates } from '@aws-amplify/datastore'
import Calendar from '@toast-ui/react-calendar'
import { Auth } from 'aws-amplify'
import moment from 'moment'
import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import DatePicker from 'react-date-picker'

import { CompanySettings, Schedules } from './../models'
import ex_schedules from './initSchedules'

const templates = {
  popupIsAllDay: function() {
    return 'All Day'
  },
  popupStateFree: function() {
    return 'Free'
  },
  popupStateBusy: function() {
    return 'Busy'
  },
  titlePlaceholder: function() {
    return 'Subject'
  },
  locationPlaceholder: function() {
    return 'Location'
  },
  startDatePlaceholder: function() {
    return 'Start date'
  },
  endDatePlaceholder: function() {
    return 'End date'
  },
  popupSave: function() {
    return 'Save'
  },
  popupUpdate: function() {
    return 'Update'
  },
  popupDetailDate: function(isAllDay: any, start: any, end: any) {
    const isSameDate = moment(start).isSame(end)
    const endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a'

    if (isAllDay) {
      return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'))
    }

    return moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat)
  },
  popupDetailLocation: function(schedule: any) {
    return 'Location : ' + schedule.location
  },
  popupDetailUser: function(schedule: any) {
    return 'User : ' + (schedule.attendees || []).join(', ')
  },
  popupDetailState: function(schedule: any) {
    return 'State : ' + schedule.state || 'Busy'
  },
  popupDetailRepeat: function(schedule: any) {
    return 'Repeat : ' + schedule.recurrenceRule
  },
  popupDetailBody: function(schedule: any) {
    return 'Body : ' + schedule.body
  },
  popupEdit: function() {
    return 'Edit'
  },
  popupDelete: function() {
    return 'Delete'
  },
}

const MONTHLY_CUSTOM_THEME = {
  // month schedule style
  'month.schedule.borderRadius': '5px',
  'month.schedule.height': '18px',
  'month.schedule.marginTop': '2px',
  'month.schedule.marginLeft': '10px',
  'month.schedule.marginRight': '10px',
}

const calendarOptions = {
  height: '100%',
  view: 'month',
  template: templates,
  theme: MONTHLY_CUSTOM_THEME,
  useCreationPopup: false,
  useDetailPopup: false,
  month: {
    visibleScheduleCount: 5,
  },
}

export default class GCalendar extends React.Component {
  private calendarRef = React.createRef<Calendar>()
  updateScheduleId = '0'
  updateBgColor = ''
  private sids = [] as any
  private capacity = {
    monthCp: 0,
    weekCps: [0, 0, 0, 0, 0, 0],
  }

  private my_settings = {
    companyName: '' as any,
    numberOfWorkers: 0 as any,
    hoursPerDay: 0 as any,
    workWeek: false as any,
  }

  private my_temp_settings = {
    companyName: '' as any,
    numberOfWorkers: 0 as any,
    hoursPerDay: 0 as any,
    workWeek: false as any,
  }

  private my_schedules = [] as any

  state = {
    curRange: '',
    openModal: false,
    isNewJob: true,
    jobStartDate: null as any,
    jobEndDate: null as any,
    jobTitle: '',
    jobHours: 1,
    jobWorkerNumbers: 1,
    jobHoursPerDay: 0,
    jobComplete: 0,
    openSettingModal: false,
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
      })
  }

  createSchedules = async () => {
    const sc = ex_schedules[0]
    await DataStore.save(
      new Schedules({
        s_id: sc.id,
        s_calendarId: sc.calendarId,
        s_title: sc.title,
        s_category: sc.category,
        s_dueDateClass: sc.dueDateClass,
        s_start: sc.start,
        s_end: sc.end,
        s_bgColor: sc.bgColor,
        s_jobTitle: sc.raw.jobTitle,
        s_jobHours: sc.raw.jobHours,
        s_jobWorkerNumbers: sc.raw.jobWorkerNumbers,
        s_jobHoursPerDay: sc.raw.jobHoursPerDay,
        }),
    )
      .then(() => {
        console.log('created CompanySettings model')
      })
      .catch(e => {
        console.log('can not create CompanySettings model', e)
      })
  }

  deleteAllSchedules = async () => {
    await DataStore.delete(Schedules, Predicates.ALL)
  }

  loadSchedules = async () => {
    await DataStore.query(Schedules)
      .then(data => {
        data.forEach(sc => {
          const osc = {
            id: sc.s_id,
            calendarId: sc.s_calendarId,
            title: sc.s_title,
            category: sc.s_category,
            dueDateClass: sc.s_dueDateClass,
            start: new Date(String(sc.s_start)),
            end: new Date(String(sc.s_end)),
            color: '#ffffff',
            bgColor: sc.s_bgColor,
            raw: {
              jobTitle: sc.s_jobTitle,
              jobHours: sc.s_jobHours,
              jobWorkerNumbers: sc.s_jobWorkerNumbers,
              jobHoursPerDay: sc.s_jobHoursPerDay,
            },
          }
          this.my_schedules.push(osc)
        })
        console.log(this.my_schedules)
        console.log('loaded schedules')
      })
      .catch(e => {
        console.log('can not load schedules', e)
      })
  }

  async componentDidMount(): Promise<void> {
    const cref = this.calendarRef.current
    await this.loadSettings()
    await this.loadSchedules()
    await new Promise(resolve => {
      setTimeout(resolve, 100)
    })
    if (cref != null) {
      const calendarInstance = cref.getInstance()
      for (let i = 0; i < this.my_schedules.length; i++) {
        this.sids.push(this.my_schedules[i].id)
      }
      calendarInstance.createSchedules(this.my_schedules)
    }
    this.setRenderRangeText()
    const isAuth = localStorage.getItem('isAuthorized') == '0' ? true : false
    if (
      (this.my_settings.companyName == '' ||
        this.my_settings.hoursPerDay == 0 ||
        this.my_settings.numberOfWorkers == 0) &&
      isAuth
    ) {
      this.setState({ openSettingModal: true })
    } else {
      this.setState({ openSettingModal: false })
    }

    return Promise.resolve()
  }

  handleClickToday = () => {
    const cref = this.calendarRef.current
    if (cref != null) {
      const calendarInstance = cref.getInstance()
      calendarInstance.today()
      this.setRenderRangeText()
    }
  }

  handleClickPreviousButton = () => {
    const cref = this.calendarRef.current
    if (cref != null) {
      const calendarInstance = cref.getInstance()
      calendarInstance.prev()
      this.setRenderRangeText()
    }
  }

  handleClickNextButton = () => {
    const cref = this.calendarRef.current
    if (cref != null) {
      const calendarInstance = cref.getInstance()
      calendarInstance.next()
      this.setRenderRangeText()
    }
  }

  handleChangeView = () => {}

  onBeforeUpdateSchedule = async (event: any) => {
    const schedule = event.schedule

    const sd = event.changes.start.toDate()
    sd.setHours(12)
    while (this.isNoWorkDay(sd)) {
      sd.setDate(sd.getDate() + 1)
    }

    const ed = new Date(sd)
    ed.setHours(12)
    const jobHours = schedule.raw.jobHours
    const jobWorkerNumbers = schedule.raw.jobWorkerNumbers
    let jobDateNumbers = 0
    const jobHoursPerDay = schedule.raw.jobHoursPerDay
    if (jobWorkerNumbers > 0 && this.my_settings.hoursPerDay > 0) {
      jobDateNumbers = Math.ceil((jobHours - jobHoursPerDay) / jobWorkerNumbers / this.my_settings.hoursPerDay) - 1
    }
    ed.setDate(ed.getDate() + this.getDateNumbersWitoutWeekend(ed, jobDateNumbers))
    ed.setHours(12)

    let month = '' + (sd.getMonth() + 1)
    let day = '' + sd.getDate()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    const strSD = [month, day].join('-')

    month = '' + (ed.getMonth() + 1)
    day = '' + ed.getDate()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    const strED = [month, day].join('-')

    event.changes.start = sd
    event.changes.end = ed

    const changes = {
      ...event.changes,
      title:
        schedule.raw.jobTitle +
        ' (' +
        schedule.raw.jobHours +
        ' total hour' +
        (schedule.raw.jobHours > 1 ? 's : ' : ' : ') +
        strSD +
        ' ~ ' +
        strED +
        ') ' +
        schedule.raw.jobWorkerNumbers +
        ' worker' +
        (schedule.raw.jobWorkerNumbers > 1 ? 's' : ''),
    }
    const cref = this.calendarRef.current
    if (cref != null) {
      const original = await DataStore.query(Schedules)
      const idx = this.sids.indexOf(schedule.id)
      await DataStore.save(
        Schedules.copyOf(original[idx], updated => {
          updated.s_title = changes.title
          updated.s_start = String(sd)
          updated.s_end = String(ed)
        }),
      )
        .then(() => console.log('updated schedule'))
        .catch(e => console.log('can not update schedule', e))

      const calendarInstance = cref.getInstance()
      calendarInstance.updateSchedule(schedule.id, schedule.calendarId, changes)
      this.setState({ openModal: false })
    }
  }

  onClickSchedule = (event: any) => {
    let sd, ed
    let is_new_job = false
    let jobTitle = ''
    let jobHours = 8
    let jobHoursPerDay = 0
    let jobWorkerNumbers = 1
    let jobComplete = 0
    this.updateScheduleId = '0'

    if (event != null) {
      const schedule = event.schedule
      sd = schedule.start.toDate()
      ed = schedule.end.toDate()
      sd.setHours(12)
      ed.setHours(12)
      jobTitle = schedule.raw.jobTitle
      jobHours = schedule.raw.jobHours
      jobHoursPerDay = schedule.raw.jobHoursPerDay
      jobWorkerNumbers = schedule.raw.jobWorkerNumbers
      jobComplete = Math.round((jobHoursPerDay * 100) / jobHours)
      this.updateScheduleId = event.schedule.id
      this.updateBgColor = event.schedule.bgColor
    } else {
      const cref = this.calendarRef.current
      if (cref != null) {
        const calendarInstance = cref.getInstance()
        calendarInstance.today()
        this.setRenderRangeText()
        sd = new Date()
        ed = new Date()
        sd.setHours(12)
        ed.setHours(12)
      }
      is_new_job = true
    }

    this.setState({
      openModal: true,
      jobTitle: jobTitle,
      jobStartDate: sd,
      jobEndDate: ed,
      jobHours: jobHours,
      jobWorkerNumbers: jobWorkerNumbers,
      jobHoursPerDay: jobHoursPerDay,
      jobComplete: jobComplete,
      isNewJob: is_new_job,
    })
    return
  }

  onBeforeCreateSchedule = (event: any) => {
    const sd = event.start.toDate()
    const ed = event.end.toDate()
    const jobTitle = ''
    const jobHoursPerDay = 0
    const jobWorkerNumbers = 1
    const job_days = this.getWorkDateNumber(sd, ed)
    if (job_days == 0) {
      event.guide.clearGuideElement()
      return
    }
    while (this.isNoWorkDay(sd)) {
      sd.setDate(sd.getDate() + 1)
    }

    const jobHours = Math.round(0 * job_days)
    this.setState({
      openModal: true,
      jobStartDate: sd,
      jobEndDate: ed,
      isNewJob: true,
      jobTitle: jobTitle,
      jobHours: jobHours,
      jobHoursPerDay: jobHoursPerDay,
      jobWorkerNumbers: jobWorkerNumbers,
      jobComplete: 0,
    })
    event.guide.clearGuideElement()
  }

  setRenderRangeText() {
    const cref = this.calendarRef.current
    if (cref != null) {
      const calendarInstance = cref.getInstance()
      const view = calendarInstance.getViewName()
      const calDate = calendarInstance.getDate()
      const rangeStart = calendarInstance.getDateRangeStart()
      const rangeEnd = calendarInstance.getDateRangeEnd()
      const cDate = calDate.toDate()
      const sDate = rangeStart.toDate()
      const eDate = rangeEnd.toDate()

      let year = cDate.getFullYear()
      let month = cDate.getMonth() + 1
      let date = cDate.getDate()
      let dateRangeText = ''
      let endMonth, endDate, start, end
      const mNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      switch (view) {
        case 'month':
          dateRangeText = mNames[month - 1] + ' ' + year
          break
        case 'week':
          year = sDate.getFullYear()
          month = sDate.getMonth() + 1
          date = sDate.getDate()
          endMonth = eDate.getMonth() + 1
          endDate = eDate.getDate()
          start = `${year}-${month}-${date}`
          end = `${endMonth}-${endDate}`
          dateRangeText = `${start} ~ ${end}`
          break
        default:
          dateRangeText = `${year}.${month}.${date}`
      }
      const curRange = dateRangeText
      this.setState({ curRange: curRange })
    }
  }

  handleModalClose = () => {
    this.setState({ openModal: false })
  }

  handleModalSave = async () => {
    if (this.my_settings.hoursPerDay == 0 || this.my_settings.numberOfWorkers == 0) {
      alert('Please complete company settings !')
      return
    }

    if (this.state.jobHours == 0 || this.state.jobWorkerNumbers == 0 || this.state.jobTitle == '') {
      alert('There are invalid values !')
      return
    }

    const sd = this.state.jobStartDate
    const ed = this.state.jobEndDate

    sd.setHours(12)
    ed.setHours(12)

    let month = '' + (sd.getMonth() + 1)
    let day = '' + sd.getDate()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    const strSD = [month, day].join('-')

    month = '' + (ed.getMonth() + 1)
    day = '' + ed.getDate()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    const strED = [month, day].join('-')

    if (this.state.isNewJob) {
      const cref = this.calendarRef.current
      if (cref != null) {
        const calendarInstance = cref.getInstance()
        const newID = String(+new Date())
        const colorList = [
          '#88ccee',
          '#cc6677',
          '#117733',
          '#332288',
          '#aa4499',
          '#44aa99',
          '#6699cc',
          '#f4436e',
          '#b2e289',
          '#609e8b',
          '#8bc34e',
          '#7095e1',
          '#c993d4',
          '#c1b3be',
          '#00ff7f',
          '#cc8899',
          '#ff0000',
          '#40826d',
          '#9966cc',
        ]

        let bgc = colorList[0]
        if (this.sids.length > 0) {
          let iidx = 0
          let iiid = 0
          for (let ii = 1; ii < this.sids.length; ii++) {
            const lastSch = calendarInstance.getSchedule(this.sids[ii], '1')
            if (Number(lastSch.id) > iiid) {
              iiid = Number(lastSch.id)
              iidx = ii
            }
          }
          const lastSch = calendarInstance.getSchedule(this.sids[iidx], '1')
          const idx = colorList.indexOf(String(lastSch.bgColor)) + 1
          bgc = colorList[idx % colorList.length]
        }
        const new_sc = {
          id: newID,
          title:
            this.state.jobTitle +
            ' (' +
            this.state.jobHours +
            ' total hour' +
            (this.state.jobHours > 1 ? 's : ' : ' : ') +
            strSD +
            ' ~ ' +
            strED +
            ') ' +
            this.state.jobWorkerNumbers +
            ' worker' +
            (this.state.jobWorkerNumbers > 1 ? 's' : ''),
          calendarId: '1',
          start: sd,
          end: ed,
          category: 'allday',
          dueDateClass: '',
          color: '#ffffff',
          bgColor: bgc,
          raw: {
            jobTitle: this.state.jobTitle,
            jobHours: this.state.jobHours,
            jobWorkerNumbers: this.state.jobWorkerNumbers,
            jobHoursPerDay: this.state.jobHoursPerDay,
          },
        }

        await DataStore.save(
          new Schedules({
            s_id: new_sc.id,
            s_calendarId: new_sc.calendarId,
            s_title: new_sc.title,
            s_category: new_sc.category,
            s_dueDateClass: new_sc.dueDateClass,
            s_start: String(new_sc.start),
            s_end: String(new_sc.end),
            s_bgColor: new_sc.bgColor,
            s_jobTitle: new_sc.raw.jobTitle,
            s_jobHours: new_sc.raw.jobHours,
            s_jobWorkerNumbers: new_sc.raw.jobWorkerNumbers,
            s_jobHoursPerDay: new_sc.raw.jobHoursPerDay,
            }),
        )
          .then(() => {
            console.log('created new CompanySettings model')
          })
          .catch(e => {
            console.log('can not create CompanySettings model', e)
          })
        calendarInstance.createSchedules([new_sc])
        this.sids.push(newID)
      }
    } else {
      const cref = this.calendarRef.current

      const changes = {
        id: this.updateScheduleId,
        title:
          this.state.jobTitle +
          ' (' +
          this.state.jobHours +
          ' total hour' +
          (this.state.jobHours > 1 ? 's : ' : ' : ') +
          strSD +
          ' ~ ' +
          strED +
          ') ' +
          this.state.jobWorkerNumbers +
          ' worker' +
          (this.state.jobWorkerNumbers > 1 ? 's' : ''),
        calendarId: '1',
        start: sd,
        end: ed,
        category: 'allday',
        dueDateClass: '',
        color: '#ffffff',
        bgColor: this.updateBgColor,
        raw: {
          jobTitle: this.state.jobTitle,
          jobHours: this.state.jobHours,
          jobWorkerNumbers: this.state.jobWorkerNumbers,
          jobHoursPerDay: this.state.jobHoursPerDay,
        },
      }
      if (cref != null) {
        const original = await DataStore.query(Schedules)
        const idx = this.sids.indexOf(this.updateScheduleId)
        await DataStore.save(
          Schedules.copyOf(original[idx], updated => {
            updated.s_title = changes.title
            updated.s_start = String(changes.start)
            updated.s_end = String(changes.end)
            updated.s_jobTitle = changes.raw.jobTitle
            updated.s_jobHours = changes.raw.jobHours
            updated.s_jobWorkerNumbers = changes.raw.jobWorkerNumbers
            updated.s_jobHoursPerDay = changes.raw.jobHoursPerDay
          }),
        )
          .then(() => console.log('updated schedule'))
          .catch(e => console.log('can not update schedule', e))
        const calendarInstance = cref.getInstance()
        calendarInstance.deleteSchedule(this.updateScheduleId, '1')
        calendarInstance.createSchedules([changes])
      }
    }
    this.setState({ openModal: false })
  }

  handleStartDateChanged = (event: any) => {
    const jobStartDate = event
    const jobEndDate = new Date(jobStartDate)
    jobStartDate.setHours(12)
    const jobHours = this.state.jobHours
    const jobWorkerNumbers = this.state.jobWorkerNumbers
    let jobDateNumbers = 0
    const jobHoursPerDay = this.state.jobHoursPerDay
    if (jobWorkerNumbers > 0 && this.my_settings.hoursPerDay > 0) {
      jobDateNumbers = Math.ceil((jobHours - jobHoursPerDay) / jobWorkerNumbers / this.my_settings.hoursPerDay) - 1
    }
    jobEndDate.setDate(jobEndDate.getDate() + this.getDateNumbersWitoutWeekend(jobEndDate, jobDateNumbers))
    jobEndDate.setHours(12)
    this.setState({
      jobStartDate: jobStartDate,
      jobEndDate: jobEndDate,
      jobHours: jobHours,
      jobWorkerNumbers: jobWorkerNumbers,
      jobHoursPerDay: jobHoursPerDay,
    })
  }

  handleEndDateChanged = (event: any) => {
    const jobEndDate = event
    const jobStartDate = new Date(jobEndDate)
    const jobHours = this.state.jobHours
    const jobWorkerNumbers = this.state.jobWorkerNumbers
    let jobDateNumbers = 0
    const jobHoursPerDay = this.state.jobHoursPerDay
    if (jobWorkerNumbers > 0 && this.my_settings.hoursPerDay > 0) {
      jobDateNumbers = Math.ceil((jobHours - jobHoursPerDay) / jobWorkerNumbers / this.my_settings.hoursPerDay) - 1
    }
    jobStartDate.setDate(jobStartDate.getDate() - this.getDateNumbersWitoutWeekend(jobEndDate, jobDateNumbers, false))
    this.setState({
      jobStartDate: jobStartDate,
      jobEndDate: jobEndDate,
      jobHours: jobHours,
      jobWorkerNumbers: jobWorkerNumbers,
      jobHoursPerDay: jobHoursPerDay,
    })
  }

  handleModalDelete = async () => {
    const cref = this.calendarRef.current
    if (cref != null) {
      const original = await DataStore.query(Schedules)
      const idx = this.sids.indexOf(this.updateScheduleId)
      await DataStore.delete(original[idx])
        .then(() => console.log('deleted schedule'))
        .catch(e => console.log('can not delete schedule', e))

      const calendarInstance = cref.getInstance()
      calendarInstance.deleteSchedule(this.updateScheduleId, '1')
      const index = this.sids.indexOf(this.updateScheduleId)
      if (index > -1) {
        this.sids.splice(index, 1)
      }
    }
    this.setState({ openModal: false })
  }

  handleModalChange = (event: any) => {
    const jobStartDate = this.state.jobStartDate
    jobStartDate.setHours(12)
    const jobEndDate = new Date(jobStartDate)
    let jobTitle = this.state.jobTitle
    let jobHours = this.state.jobHours
    let jobWorkerNumbers = this.state.jobWorkerNumbers
    let jobDateNumbers = 0
    let jobHoursPerDay = this.state.jobHoursPerDay
    let jobComplete = this.state.jobComplete
    if (event != null) {
      if (event.target.name == 'textGuysApplied') {
        jobWorkerNumbers = Number(event.target.value)
      } else if (event.target.name == 'textEstimated') {
        jobHours = Number(event.target.value)
        jobComplete = Math.round((jobHoursPerDay * 100) / jobHours)
      } else if (event.target.name == 'textHoursPerDay') {
        jobHoursPerDay = Number(event.target.value)
        jobComplete = Number(Math.round((jobHoursPerDay * 100) / jobHours))
      } else if (event.target.name == 'textTitle') {
        jobTitle = event.target.value
      } else if (event.target.name == 'textComplete') {
        jobComplete = Number(event.target.value)
        jobHoursPerDay = Number(Math.round((jobComplete * jobHours) / 100))
      }
    }

    if (jobHours > 0 && /*jobHoursPerDay > 0 &&*/ jobWorkerNumbers > 0 && this.my_settings.hoursPerDay > 0) {
      jobDateNumbers = Math.ceil((jobHours - jobHoursPerDay) / jobWorkerNumbers / this.my_settings.hoursPerDay) - 1
      jobEndDate.setDate(jobEndDate.getDate() + this.getDateNumbersWitoutWeekend(jobEndDate, jobDateNumbers))
    }

    jobEndDate.setHours(12)
    this.setState({
      jobTitle: jobTitle,
      jobStartDate: jobStartDate,
      jobEndDate: jobEndDate,
      jobHours: jobHours,
      jobWorkerNumbers: jobWorkerNumbers,
      jobHoursPerDay: jobHoursPerDay,
      jobComplete: jobComplete,
    })
  }

  // log out
  handleLogout = () => {
    Auth.signOut()
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
  }

  // Setting Modal

  handleSetting = () => {
    this.my_temp_settings = this.my_settings
    this.setState({ openSettingModal: true })
  }

  handleSettingModalClose = () => {
    this.setState({ openSettingModal: false })
    this.my_temp_settings = this.my_settings
  }

  handleSettingChange = (event: any) => {
    let t1 = this.my_temp_settings.companyName
    let t2 = this.my_temp_settings.numberOfWorkers
    let t3 = this.my_temp_settings.hoursPerDay
    let t4 = this.my_temp_settings.workWeek
    if (event.target.name == 'textCompanyName') {
      t1 = event.target.value
    } else if (event.target.name == 'textNumberOfWorkers') {
      t2 = event.target.value
    } else if (event.target.name == 'textHoursPerDay') {
      t3 = event.target.value
    } else if (event.target.name == 'checkWorkWeek') {
      t4 = event.target.checked
      console.log('dddddddd')
      console.log(t4)
    }
    this.my_temp_settings = {
      companyName: String(t1),
      numberOfWorkers: Number(t2),
      hoursPerDay: Number(t3),
      workWeek: Boolean(t4),
    }
  }

  handleSettingSave = async () => {
    const original = await DataStore.query(CompanySettings)
    const sts = this.my_temp_settings
    await DataStore.save(
      CompanySettings.copyOf(original[0], updated => {
        updated.companyName = sts.companyName
        updated.numberOfWorkers = sts.numberOfWorkers
        updated.hoursPerDay = sts.hoursPerDay
        updated.workWeek = sts.workWeek
      }),
    )
      .then(() => {
        console.log('updated CompanySettings')
      })
      .catch(() => {
        console.log('can not update CompanySettings')
      })

    if (this.my_settings.hoursPerDay != this.my_temp_settings.hoursPerDay) {
      // change schedules....
      const cref = this.calendarRef.current
      if (cref != null) {
        const calendarInstance = cref.getInstance()
        for (let i = 0; i < this.sids.length; i++) {
          let sch = null as any
          sch = calendarInstance.getSchedule(this.sids[i], '1')
          const jobStartDate = sch.start.toDate()
          jobStartDate.setHours(12)
          const jobEndDate = new Date(jobStartDate)
          const jobTitle = sch.raw.jobTitle
          const jobHours = sch.raw.jobHours
          const jobWorkerNumbers = sch.raw.jobWorkerNumbers
          let jobDateNumbers = 0
          const jobHoursPerDay = sch.raw.jobHoursPerDay
          if (jobHours > 0 && /*jobHoursPerDay > 0 &&*/ jobWorkerNumbers > 0 && this.my_temp_settings.hoursPerDay > 0) {
            jobDateNumbers =
              Math.ceil((jobHours - jobHoursPerDay) / jobWorkerNumbers / this.my_temp_settings.hoursPerDay) - 1
            jobEndDate.setDate(jobEndDate.getDate() + this.getDateNumbersWitoutWeekend(jobEndDate, jobDateNumbers))
          }
          jobEndDate.setHours(12)

          const sd = jobStartDate
          const ed = jobEndDate

          sd.setHours(12)
          ed.setHours(12)

          let month = '' + (sd.getMonth() + 1)
          let day = '' + sd.getDate()

          if (month.length < 2) month = '0' + month
          if (day.length < 2) day = '0' + day
          const strSD = [month, day].join('-')

          month = '' + (ed.getMonth() + 1)
          day = '' + ed.getDate()

          if (month.length < 2) month = '0' + month
          if (day.length < 2) day = '0' + day
          const strED = [month, day].join('-')

          const changes = {
            id: this.sids[i],
            title:
              jobTitle +
              ' (' +
              sch.raw.jobHours +
              ' total hour' +
              (sch.raw.jobHours > 1 ? 's : ' : ' : ') +
              strSD +
              ' ~ ' +
              strED +
              ') ' +
              sch.raw.jobWorkerNumbers +
              ' worker' +
              (sch.raw.jobWorkerNumbers > 1 ? 's' : ''),
            calendarId: '1',
            start: sd,
            end: ed,
            category: 'allday',
            dueDateClass: '',
            color: '#ffffff',
            bgColor: sch.bgColor,
            raw: {
              jobTitle: sch.raw.jobTitle,
              jobHours: sch.raw.jobHours,
              jobWorkerNumbers: sch.raw.jobWorkerNumbers,
              jobHoursPerDay: sch.raw.jobHoursPerDay,
            },
          }

          const original = await DataStore.query(Schedules)
          const idx = this.sids.indexOf(this.sids[i])
          await DataStore.save(
            Schedules.copyOf(original[idx], updated => {
              updated.s_title = changes.title
              updated.s_start = String(changes.start)
              updated.s_end = String(changes.end)
            }),
          )
            .then(() => console.log('updated schedule'))
            .catch(e => console.log('can not update schedule', e))
          calendarInstance.deleteSchedule(this.sids[i], '1')
          calendarInstance.createSchedules([changes])
        }
      }
    }

    this.my_settings = {
      companyName: this.my_temp_settings.companyName,
      numberOfWorkers: this.my_temp_settings.numberOfWorkers,
      hoursPerDay: this.my_temp_settings.hoursPerDay,
      workWeek: this.my_temp_settings.workWeek,
    }
    this.setState({ openSettingModal: false })
    window.location.reload()
  }

  // custom functions
  getDateNumbersWitoutWeekend = (dt: any, dn: number, isForward = true) => {
    let ii = 0
    let tdn = 0
    const tdt = new Date(dt)
    while (ii < dn) {
      if (isForward) {
        tdt.setDate(tdt.getDate() + 1)
      } else {
        tdt.setDate(tdt.getDate() - 1)
      }

      tdn++
      if (this.isNoWorkDay(tdt)) continue
      ii++
    }
    return tdn
  }

  getWorkDateNumber = (sdt: any, edt: any) => {
    const tdt = new Date(sdt)
    const vdt = new Date(edt)
    tdt.setHours(12)
    vdt.setHours(12)
    let ii = 0
    while (tdt <= vdt) {
      if (this.isNoWorkDay(tdt)) {
        tdt.setDate(tdt.getDate() + 1)
        continue
      }
      tdt.setDate(tdt.getDate() + 1)
      ii++
    }
    return ii
  }

  isNoWorkDay = (dt: any) => {
    if (this.my_settings.workWeek == false && (dt.getDay() == 0 || dt.getDay() == 6)) {
      return true
    }

    // 12-25
    if (dt.getMonth() == 11 && dt.getDate() == 25) return true

    if (dt.getMonth() == 6 && dt.getDate() == 4) return true

    // easter day
    const Y = dt.getFullYear()
    const C = Math.floor(Y / 100)
    const N = Y - 19 * Math.floor(Y / 19)
    const K = Math.floor((C - 17) / 25)
    let I = C - Math.floor(C / 4) - Math.floor((C - K) / 3) + 19 * N + 15
    I = I - 30 * Math.floor(I / 30)
    I = I - Math.floor(I / 28) * (1 - Math.floor(I / 28) * Math.floor(29 / (I + 1)) * Math.floor((21 - N) / 11))
    let J = Y + Math.floor(Y / 4) + I + 2 - C + Math.floor(C / 4)
    J = J - 7 * Math.floor(J / 7)
    const L = I - J
    const M = 3 + Math.floor((L + 40) / 44)
    const D = L + 28 - 31 * Math.floor(M / 4)
    if (dt.getDate() == D && dt.getMonth() == M - 1) return true

    // thanksgiving day
    if (dt.getMonth() == 10) {
      if (dt.getDay() == 4) {
        if (dt.getDate() > 21 && dt.getDate() < 29) return true
      }
    }
    return false
  }

  getCapacityForMonth = () => {
    const cref = this.calendarRef.current
    if (cref != null) {
      const calendarInstance = cref.getInstance()
      const cDate = calendarInstance.getDate()
      const sDate = cDate.toDate()
      sDate.setDate(1)
      sDate.setHours(12)
      const eDate = new Date(sDate)
      eDate.setDate(1)
      eDate.setMonth(eDate.getMonth() + 1)
      const tempDate = new Date(sDate)

      let workDayCount = 0
      let bookHourCount = 0
      let weekDayCount = 0
      let weekBookHourCount = 0

      const weekCps = []

      while (tempDate < eDate) {
        if (tempDate.getDay() == 0) {
          if (tempDate.getDate() > 1) {
            const wcp = Math.round(
              (weekBookHourCount * 100) /
                weekDayCount /
                this.my_settings.numberOfWorkers /
                this.my_settings.hoursPerDay,
            )
            weekCps.push(wcp)
          }
          weekDayCount = 0
          weekBookHourCount = 0
        }

        if (this.isNoWorkDay(tempDate)) {
          tempDate.setDate(tempDate.getDate() + 1)
          continue
        }

        workDayCount++
        weekDayCount++

        for (let i = 0; i < this.sids.length; i++) {
          let sch = null as any
          sch = calendarInstance.getSchedule(this.sids[i], '1')
          const sst = new Date(sch.start)
          const eet = new Date(sch.end)
          sst.setHours(12)
          eet.setHours(12)
          if (sst > tempDate || eet < tempDate) continue
          bookHourCount += sch.raw.jobWorkerNumbers * this.my_settings.hoursPerDay
          weekBookHourCount += sch.raw.jobWorkerNumbers * this.my_settings.hoursPerDay
        }
        tempDate.setDate(tempDate.getDate() + 1)
      }

      const wcp =
        weekDayCount > 0
          ? Math.round(
              (weekBookHourCount * 100) /
                weekDayCount /
                this.my_settings.numberOfWorkers /
                this.my_settings.hoursPerDay,
            )
          : 0
      weekCps.push(wcp)

      const cp = Math.round(
        (bookHourCount * 100) / workDayCount / this.my_settings.numberOfWorkers / this.my_settings.hoursPerDay,
      )

      this.capacity = {
        monthCp: cp,
        weekCps: weekCps,
      }
    } else {
      this.capacity = { monthCp: 0, weekCps: [0, 0, 0, 0, 0, 0] }
    }
  }

  applyStyle = () => {}

  render() {
    this.getCapacityForMonth()
    this.applyStyle()
    return (
      <div style={{ width: '100vw', marginTop: 15, display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '90%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div>
                <Button variant="outline-secondary" size="sm" onClick={this.handleClickToday}>
                  {' '}
                  Today{' '}
                </Button>
              </div>
              <div style={{ marginLeft: 10 }}>
                <Button variant="outline-secondary" size="sm" onClick={this.handleClickPreviousButton}>
                  {' '}
                  {'<'}{' '}
                </Button>
              </div>
              <div style={{ marginLeft: 10 }}>
                <Button variant="outline-secondary" size="sm" onClick={this.handleClickNextButton}>
                  {' '}
                  {'>'}{' '}
                </Button>
              </div>
              <div>
                <p style={{ marginLeft: 10, fontSize: 20, padding: 0, marginTop: 0 }}> {this.state.curRange} </p>
              </div>
              <div>
                <p style={{ color: 'red', marginLeft: 20, fontSize: 20, padding: 0, marginTop: 0 }}>
                  {' '}
                  @ {this.capacity.monthCp} % Capacity{' '}
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button style={{ height: 30, marginRight: 10 }} size="sm" onClick={this.handleSetting}>
                Settings
              </Button>
              <Form.Control as="select" style={{ borderColor: '#6c7570' }} size="sm" onChange={this.handleChangeView}>
                <option> Month </option>
                <option> 3 Months </option>
                <option> 6 Months </option>
                <option> 1 Year </option>
              </Form.Control>
              <Button
                style={{ height: 30, marginLeft: 10 }}
                variant="outline-secondary"
                size="sm"
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
          <div style={{ marginTop: 5, marginBottom: 20, borderStyle: 'solid', borderWidth: 1, borderColor: '#e5e5e5' }}>
            <Calendar
              ref={this.calendarRef}
              {...calendarOptions}
              onBeforeUpdateSchedule={this.onBeforeUpdateSchedule.bind(this)}
              onBeforeCreateSchedule={this.onBeforeCreateSchedule.bind(this)}
              onClickSchedule={this.onClickSchedule.bind(this)}
            />
          </div>

          <Modal show={this.state.openModal} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
                {this.state.isNewJob ? 'ADD JOB' : 'EDIT JOB'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '0 30px' }}>
              <Form noValidate validated={true}>
                <Form.Group controlId="formHorizontalEmail">
                  <Row>
                    <Form.Label column sm={12} style={{ fontWeight: 'bold' }}>
                      {' '}
                      Job{' '}
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Title :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="text"
                        name="textTitle"
                        defaultValue={this.state.jobTitle}
                        size="sm"
                        onChange={this.handleModalChange}
                        minLength={1}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Estimated # of Hours :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="number"
                        name="textEstimated"
                        min="1"
                        defaultValue={this.state.jobHours}
                        size="sm"
                        onChange={this.handleModalChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Hours Worked to Date :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="number"
                        size="sm"
                        name="textHoursPerDay"
                        value={String(this.state.jobHoursPerDay)}
                        min="0"
                        max={this.state.jobHours}
                        onChange={this.handleModalChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Estimated % Complete :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="number"
                        name="textComplete"
                        value={String(this.state.jobComplete)}
                        min="0"
                        max="100"
                        size="sm"
                        onChange={this.handleModalChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Row>
                    <Form.Label column sm={12} style={{ fontWeight: 'bold' }}>
                      {' '}
                      Job Details{' '}
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Start Date :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <DatePicker value={new Date(this.state.jobStartDate)} onChange={this.handleStartDateChanged} />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Finish Date :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <DatePicker
                        value={new Date(this.state.jobEndDate)}
                        minDate={new Date(this.state.jobStartDate)}
                        onChange={this.handleEndDateChanged}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      # of Workers Applied :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="number"
                        size="sm"
                        name="textGuysApplied"
                        defaultValue={this.state.jobWorkerNumbers}
                        min="1"
                        onChange={this.handleModalChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleModalSave}>
                {this.state.isNewJob ? 'Add' : 'Save'}
              </Button>
              {this.state.isNewJob ? (
                ''
              ) : (
                <Button variant="danger" onClick={this.handleModalDelete}>
                  Delete
                </Button>
              )}
              <Button variant="secondary" onClick={this.handleModalClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.openSettingModal} onHide={this.handleSettingModalClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ width: '100%', textAlign: 'center' }}>Company Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '0 30px' }}>
              <Form noValidate validated={true}>
                <Form.Group>
                  <Row>
                    <Form.Label column sm={6}>
                      Company Name :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="text"
                        size="sm"
                        name="textCompanyName"
                        defaultValue={this.my_temp_settings.companyName}
                        onChange={this.handleSettingChange}
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Number of Workers :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="number"
                        size="sm"
                        name="textNumberOfWorkers"
                        defaultValue={this.my_temp_settings.numberOfWorkers}
                        onChange={this.handleSettingChange}
                        min="1"
                        required
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Form.Label column sm={6}>
                      Hours in a Work Day :
                    </Form.Label>
                    <Col sm={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Form.Control
                        type="number"
                        size="sm"
                        name="textHoursPerDay"
                        defaultValue={this.my_temp_settings.hoursPerDay}
                        onChange={this.handleSettingChange}
                        min="0"
                        max="24"
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleSettingSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={this.handleSettingModalClose}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div></div>
        <div
          style={{
            width: 100,
            marginTop: 50,
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <div style={{ textAlign: 'left' }}>{this.capacity.weekCps[0]}%</div>
          <div>{this.capacity.weekCps[1]}%</div>
          <div>{this.capacity.weekCps[2]}%</div>
          <div>{this.capacity.weekCps[3]}%</div>
          <div>{this.capacity.weekCps[4]}%</div>
          <div>
            {this.capacity.weekCps[5]}
            {this.capacity.weekCps.length > 5 ? '%' : ''}
          </div>
        </div>
      </div>
    )
  }
}
