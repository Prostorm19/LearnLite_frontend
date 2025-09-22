import React, { useState, useRef } from "react";
import "./TeacherDashboard.css"; // Optional: create and use this CSS file

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("lectures");
  const [selectedCourse, setSelectedCourse] = useState("MTech");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [drafts, setDrafts] = useState([
    { id: 1, title: "Introduction", duration: "10:47", size: "21 MB", course: "MCA", date: "Sept 1, 2025" },
    { id: 2, title: "Introduction", duration: "10:47", size: "21 MB", course: "MBA Tech", date: "Sept 1, 2025" }
  ]);
  const [publishSelection, setPublishSelection] = useState({ MCA: true, MTech: false, MBA: true, "MCA B1": false, "MCA B2": false });
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef(null);

  // ---------- Reusable Components ----------
  const NavBar = () => (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="title">Teachers / Downloads</h1>
        <Tabs />
      </div>
      <div className="navbar-right">
        <button className="btn primary">Sign in</button>
        <button className="btn outline">Try Whimsical</button>
      </div>
    </div>
  );

  const Tabs = () => {
    const tabs = ["lectures", "upload", "analytics", "assignments", "quiz", "schedule", "settings"];
    return (
      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`tab ${activeTab === t ? "active" : ""}`}
          >
            {capitalize(t)}
          </button>
        ))}
      </nav>
    );
  };

  const Button = ({ children, onClick, className = "" }) => (
    <button onClick={onClick} className={`btn ${className}`}>{children}</button>
  );

  const SearchBar = ({ value, onChange, placeholder = "Search..." }) => (
    <input value={value} onChange={onChange} placeholder={placeholder} className="search-bar" />
  );

  const UploadContent = () => (
    <div className="panel">
      <div className="panel-header">
        <div className="form-group">
          <label>Select Course</label>
          <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option>MTech</option>
            <option>MBA (Tech)</option>
            <option>MCA</option>
            <option>MCA B1</option>
            <option>MCA B2</option>
          </select>
        </div>
        <Button className="primary">Upload New</Button>
      </div>

      <div className="grid">
        <div className="left-col">
          <UploadForm />
          <div className="content-list">
            <h3>My Content List</h3>
            <ContentTable />
          </div>
        </div>
        <div className="right-col">
          <div className="checkbox-group">
            <h4>Select Course</h4>
            {Object.keys(publishSelection).map((c) => (
              <label key={c}>
                <input type="checkbox" checked={publishSelection[c]} onChange={() => togglePublish(c)} />
                {c}
              </label>
            ))}
            <Button className="primary full-width">Publish</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const UploadForm = () => {
    const onFiles = (files) => {
      const newItems = Array.from(files).map((f, i) => ({ id: Date.now() + i, name: f.name, size: f.size }));
      setUploadedFiles((s) => [...s, ...newItems]);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
    };

    return (
      <div className="upload-form" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <h3>Upload</h3>
        <div className="drop-zone" onClick={() => fileInputRef.current.click()}>
          <p>Drag & drop files or <span className="link">Browse</span></p>
          <small>Supported formats: JPEG, PNG, GIF, MP4, PDF, PPT</small>
          <input ref={fileInputRef} type="file" multiple hidden onChange={(e) => onFiles(e.target.files)} />
        </div>

        <div className="uploaded-files">
          <h4>Uploading ({uploadedFiles.length})</h4>
          <ul>
            {uploadedFiles.map((f) => (
              <li key={f.id} className="file-row">
                <div>
                  <div>{f.name}</div>
                  <small>{Math.round(f.size / 1024)} KB</small>
                </div>
                <span className="uploaded-status">Uploaded</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const ContentTable = () => {
    const rows = [
      { id: 1, name: "UX UI Design Blog Post", campaign: "Design Marketing", date: "20-01-2025", lastModified: "02 minute ago", status: "In Progress" },
      { id: 2, name: "Website Marketing Content", campaign: "Facebook Campaign", date: "18-01-2025", lastModified: "10 minute ago", status: "Completed" }
    ];

    return (
      <table className="content-table">
        <thead>
          <tr>
            <th>Name Content</th>
            <th>Campaign</th>
            <th>Create Date</th>
            <th>Last Modified</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.campaign}</td>
              <td>{r.date}</td>
              <td>{r.lastModified}</td>
              <td><StatusTag status={r.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const StatusTag = ({ status }) => {
    return <span className={`status-tag ${status.toLowerCase().replace(" ", "-")}`}>{status}</span>;
  };

  const Lectures = () => {
    const filtered = drafts.filter((d) => d.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
      <div className="panel">
        <div className="panel-header">
          <h2>Lectures</h2>
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search for Lecture" />
          <div className="panel-actions">
            <Button className="primary">Create new lecture</Button>
            <Button>View Drafts</Button>
          </div>
        </div>

        <div className="lecture-drafts">
          <h3>Drafts</h3>
          {filtered.map((d) => (
            <div key={d.id} className="lecture-row">
              <div>
                <div className="lecture-title">{d.title}</div>
                <div className="lecture-meta">{d.duration} • {d.size} • {d.course}</div>
              </div>
              <div className="lecture-actions">
                <Button className="primary">Edit Lecture</Button>
                <Button className="primary">Publish Lecture</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LectureForm = () => (
    <div className="panel">
      <h3>Record New Lecture</h3>
      <div className="lecture-form-grid">
        <div className="lecture-form-left">
          <div className="form-group">
            <label>Lecture Title</label>
            <input placeholder="Enter lecture title" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input placeholder="e.g., Mathematics, Biology" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea rows={4} placeholder="Brief description (optional)" />
          </div>
          <div className="form-group">
            <label>Upload Slides</label>
            <div className="drop-box">Drag & drop PPT, PDF, JPG, PNG</div>
          </div>
          <div className="form-group">
            <label>Recording Controls</label>
            <div className="recording-box">
              Please add a title, subject, and upload at least one slide before recording.
              <div><Button className="success">Start Recording</Button></div>
            </div>
          </div>
        </div>
        <div className="lecture-form-right">
          <div className="preview-box">Upload slides to begin (preview area)</div>
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        </div>
      </div>
    </div>
  );

  const Assignments = () => <Panel title="Assignments" />;
  const Quiz = () => <Panel title="Quiz" />;
  const Analytics = () => <Panel title="Analytics" />;
  const Schedule = () => <Panel title="Schedule" />;
  const Settings = () => <Panel title="Settings" />;

  function Panel({ title }) {
    return (
      <div className="panel">
        <h2>{title}</h2>
        <p>This page is a placeholder — implement features as needed.</p>
      </div>
    );
  }

  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function togglePublish(key) { setPublishSelection((s) => ({ ...s, [key]: !s[key] })); }

  return (
    <div className="dashboard">
      <NavBar />
      <div className="dashboard-content">
        {activeTab === "upload" && <UploadContent />}
        {activeTab === "lectures" && <Lectures />}
        {activeTab === "analytics" && <Analytics />}
        {activeTab === "assignments" && <Assignments />}
        {activeTab === "quiz" && <Quiz />}
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "settings" && <Settings />}
        <LectureForm />
      </div>
    </div>
  );
}
