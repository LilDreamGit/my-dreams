import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faRoad, faGlobe, faChartBar, faSkull, faSeedling } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Sidebar({ isMobile, mobileSidebarOpen, setMobileSidebarOpen, desktopSidebarOpen, setDesktopSidebarOpen }) {
  const menuItems = [
    { icon: faRoad, label: 'Timeline', path: '/' },
    { icon: faMusic, label: 'Songs', path: '/songs' },
    { icon: faSkull, label: 'Curses', path: '/curses' },
    { icon: faGlobe, label: 'World Map', path: '/worldmap' },
    { icon: faChartBar, label: 'Charts', path: '/charts' },
    { icon: faSeedling, label: 'Grow', path: '/grow' },
  ];

  return (
    <>
      {/* Floating Mobile Hamburger Button */}
      <span
        title="Toggle Menu"
        onClick={() => setMobileSidebarOpen(true)}
        className="
          fixed top-4 left-4 z-50 md:hidden
          inline-flex items-center justify-center
          h-12 w-12 rounded-2xl
          bg-gradient-to-br from-fuchsia-600 via-violet-700 to-indigo-800
          border border-white/10 ring-1 ring-white/10
          shadow-[0_10px_20px_rgba(0,0,0,0.45)]
          backdrop-blur-sm
          hover:scale-105 active:scale-95 transition-transform
          text-2xl leading-none select-none
        "
      >
        🍔
      </span>

      {/* Desktop Sidebar */}
      <aside className={`
        hidden md:block bg-gray-800 p-4 transition-[width] duration-300 overflow-hidden h-auto
        ${desktopSidebarOpen ? 'w-64' : 'w-16'}
      `}>
        <h4 className="text-white mb-4 flex items-center">
          <span
            title="Toggle Menu"
            onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
            className="cursor-pointer text-xl mr-2"
          >
            🍔
          </span>
          <span className={`font-semibold text-lg transition-all duration-300 ${desktopSidebarOpen ? 'inline' : 'hidden'}`}>
            Lil Dream Menu
          </span>
        </h4>

        <ul className="space-y-1">
          {menuItems.map((item, i) => (
            <li key={i}>
              <Link 
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition"
              >
                <FontAwesomeIcon icon={item.icon} className="text-white" />
                <span className={`${desktopSidebarOpen ? 'inline' : 'hidden'} transition-all duration-300`}>
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <aside 
          className={`
            md:hidden fixed top-0 left-0 h-screen w-64 bg-gray-800 z-50 p-4
            transform transition-transform duration-300 ease-in-out
            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <h4 className="text-white mb-4 flex items-center">
            <span
              title="Close Menu"
              onClick={() => setMobileSidebarOpen(false)}
              className="cursor-pointer text-xl mr-2"
            >
              ✖️
            </span>
            <span className="font-semibold text-lg">Lil Dream Menu</span>
          </h4>

          <ul className="space-y-1">
            {menuItems.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  <FontAwesomeIcon icon={item.icon} className="text-white" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;