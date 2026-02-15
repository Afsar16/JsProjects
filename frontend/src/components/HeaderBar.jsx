import { useAuth } from '../context/AuthContext';

const HeaderBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between bg-university-blue px-5 py-3 text-white">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold">University Portal</h1>
        <nav className="hidden gap-4 md:flex">
          {['Dashboard', 'Academics', 'Finances', 'Resources'].map((label) => (
            <span key={label} className={`rounded px-3 py-1 text-sm ${label === 'Dashboard' ? 'bg-white/20' : ''}`}>
              {label}
            </span>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-indigo-400 px-3 py-2 text-sm font-semibold">{user?.name?.[0] || 'S'}</div>
        <div className="text-sm">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-blue-100">Verified Student</p>
        </div>
        <button onClick={logout} className="rounded bg-white/20 px-3 py-1 text-xs hover:bg-white/30">
          Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderBar;
