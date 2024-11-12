import { AuthProvider } from './context/AuthContext.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { LoginPage, InicioPage, AutoevaluacionPage, CalificarPage, ResultadoPage } from './pages/index.jsx';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1 className="text-4xl font-bold text-center">Hola</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/inicio' element={<InicioPage />} />
          <Route path='/talento/:talento' element={<AutoevaluacionPage />} />
          <Route path='/calificar/:talento/:userId' element={<CalificarPage />} />
          <Route path='/pdi/:uderId/' element={<ResultadoPage />} />
        </Routes>
      </BrowserRouter> 
    </AuthProvider>
  )
}

export default App
