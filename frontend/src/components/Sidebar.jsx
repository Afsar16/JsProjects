const sections = {
  MAIN: ['Dashboard', 'My Courses', 'Assignments', 'Schedule'],
  ACADEMIC: ['Grades', 'Degree Audit', 'Registration'],
  SERVICES: ['Financial Aid', 'Library', 'Advising']
};

const Sidebar = () => (
  <aside className="hidden w-64 border-r border-slate-200 bg-white lg:block">
    {Object.entries(sections).map(([title, items]) => (
      <div key={title} className="px-4 py-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li
              key={item}
              className={`rounded-md px-3 py-2 text-sm ${
                item === 'Dashboard' ? 'border-l-4 border-university-blue bg-blue-50 font-semibold text-university-blue' : 'text-slate-700'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </aside>
);

export default Sidebar;
