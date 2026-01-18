import CustomCursor from './core/components/customCursor/CustomCursor'
import './core/styles/Core.scss'
import Dashboard from './pages/dashboard/presentation/screens/Dashboard'


function App() {

  return (
    <div className='root-layout'>
      <CustomCursor />
      <Dashboard />
    </div>
  )
}

export default App
