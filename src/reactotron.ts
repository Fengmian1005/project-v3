import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron.configure({
  name: 'Booked-Up',
  host: '192.168.100.32',
}) // controls connection & communication settings
  .use(reactotronRedux())
  .connect() // let's connect!

export default reactotron
