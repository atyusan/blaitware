const icons = {
  note: (
    <svg fill="none" viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.5" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
  ),
  tip: (
    <svg fill="none" viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.5" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.1 14.1 0 0 1-3 0M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
    </svg>
  ),
  info: (
    <svg fill="none" viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.5" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  warning: (
    <svg fill="none" viewBox="0 0 24 24" width="22" height="22" strokeWidth="1.5" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

const titles = {
  note: "Note",
  tip: "Tip",
  info: "Info",
  warning: "Warning",
};

const Notice = ({ type = "note", title, children }) => {
  const kind = String(type).toLowerCase();
  const label = title || titles[kind] || "Note";

  return (
    <div className={`notice ${kind}`}>
      <div className="notice-head">
        {icons[kind] || icons.note}
        <p>{label}</p>
      </div>
      <div className="notice-body">{children}</div>
    </div>
  );
};

export default Notice;
