import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import DevToolsProductPage from './pages/DevToolsProductPage'
import GCDemoPage from './pages/GCDemoPage'
// Temporarily disabled due to encoding issues
// import ProjectStatsPage from './pages/ProjectStatsPage'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/devtools" element={<DevToolsProductPage />} />
        <Route path="/gc-demo" element={<GCDemoPage />} />
        {/* <Route path="/project-stats" element={<ProjectStatsPage />} /> */}
      </Routes>
    </Layout>
  )
}

export default App
