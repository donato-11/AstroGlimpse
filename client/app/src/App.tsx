import { DayTile } from './components/DayTile'
import './App.css'

function App() {

  return (
    <>
      <div>
        <DayTile day={15} isToday eventImage="/vite.svg" eventAlt="Event Icon" onClick={() => alert('Day clicked!')} />
      </div>
    </>
  )
}

export default App
