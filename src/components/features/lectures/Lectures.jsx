import React, { useState } from "react";
import Panel from "../../ui/Panel.jsx";
import SearchBar from "../../ui/SearchBar.jsx";
import Button from "../../ui/Button.jsx";
import { Link } from "react-router-dom";

export default function Lectures() {
    const [searchQuery, setSearchQuery] = useState("");
    const [drafts, setDrafts] = useState([
        {
            id: 1,
            title: "Linked Lists",
            duration: "10:47",
            size: "21 MB",
            course: "MCA",
            date: "Sept 1, 2025",
        },
        {
            id: 2,
            title: "Trees and Graphs",
            duration: "10:47",
            size: "30 MB",
            course: "MCA",
            date: "Sept 1, 2025",
        },
    ]);

    const filtered = drafts.filter((d) =>
        d.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Panel>
            <div className="panel-header">
                <h2>Lectures</h2>
                <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Lecture"
                />
                <div className="panel-actions" style={{ marginTop: '1rem' }}>
                    <Link to="/dashboard/lectures/new">
                        <Button className="primary">Create new lecture</Button>
                    </Link>
                    <Button>View Drafts</Button>
                </div>
            </div>

            <div className="lecture-drafts">
                <h3>Drafts</h3>
                {filtered.map((d) => (
                    <div key={d.id} className="lecture-row">
                        <div>
                            <div className="lecture-title">{d.title}</div>
                            <div className="lecture-meta">
                                {d.duration} • {d.size} • {d.course}
                            </div>
                        </div>
                        <div className="lecture-actions">
                            <Button className="primary">Edit Lecture</Button>
                            <Button className="primary">Publish Lecture</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Panel>
    );
}
