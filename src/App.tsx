import { Routes, Route } from "react-router-dom"
import { TaskProvider } from "./lib/task-context"
import Navbar from "./components/navbar"
import Layout from "./app/layout"
import HomePage from "./app/page"
import AcercaPage from "./app/acerca/page"
import EstrategiasPage from "./app/estrategias/page"
import TareasPage from "./app/tareas/page"

function App() {
  return (
    <TaskProvider>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/acerca" element={<AcercaPage />} />
          <Route path="/estrategias" element={<EstrategiasPage />} />
          <Route path="/tareas" element={<TareasPage />} />
        </Routes>
      </Layout>
    </TaskProvider>
  )
}

export default App
