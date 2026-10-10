import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Timeline from './components/Timeline/Timeline';
import Sidebar from './components/Sidebar';
import DreamPanel from './components/DreamPanel/DreamPanel';

// Placeholder components
import SongsList from './components/Songs/SongList';
import Curses from './components/Curses/Curses';
import WorldMap from './components/WorldMap/WorldMap';
import Charts from './components/Charts/Charts';
import NotFound from './components/NotFound';
import Easy from './components/Songs/Songs/Easy';
import RED from './components/Songs/Songs/RED';
import Grow from './components/Grow/Grow';

function App() {
  const isMobile = window.innerWidth < 768;
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  return (
    <div className="flex flex-row min-h-screen text-white">
      
      {/* Sidebar */}
      <Sidebar
        isMobile={isMobile}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        desktopSidebarOpen={desktopSidebarOpen}
        setDesktopSidebarOpen={setDesktopSidebarOpen}
      />

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <main className="flex-1 flex flex-col w-full h-full p-0 m-0">
    
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/songs" element={<SongsList />} />
            <Route path="/songs/easy" element={<Easy />} />
            <Route path="/songs/red" element={<RED />} />
          <Route path="/curses" element={<Curses />} />
          <Route path="/worldmap" element={<WorldMap />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/grow" element={<Grow />} />
          
          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound/>} />
        
        </Routes>
      </main>

      {/* Right panel */}
      <DreamPanel />
    </div>
  );
}

export default App;
