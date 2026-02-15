import HeaderBar from '../components/HeaderBar';
import Sidebar from '../components/Sidebar';

const PortalLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-100">
    <HeaderBar />
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  </div>
);

export default PortalLayout;
