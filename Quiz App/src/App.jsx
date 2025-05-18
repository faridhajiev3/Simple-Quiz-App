import './App.css'
import QuizProviderProvider from './global/GlobalState'
import QuizApp from './pages/QuizApp'

function App() {

  return (
    <QuizProviderProvider>
      <QuizApp />
    </QuizProviderProvider>
  )
}

export default App
