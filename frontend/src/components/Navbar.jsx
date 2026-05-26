import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
      ? "text-indigo-400 bg-indigo-500/10 border-indigo-500/30"
      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border-transparent"
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-950/80 border-b border-slate-800/80 px-4 py-4 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              LingoComp
            </span>
            <span className="text-[10px] block font-semibold uppercase tracking-widest text-indigo-400">
              PBL Compiler
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 ${isActive("/")}`}
          >
            Home
          </Link>
          <Link
            to="/compiler"
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 ${isActive("/compiler")}`}
          >
            Compiler
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-200 ${isActive("/about")}`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
