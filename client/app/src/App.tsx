import { DayTile } from './components/DayTile'

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
