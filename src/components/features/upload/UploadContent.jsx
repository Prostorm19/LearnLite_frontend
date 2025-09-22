import React, { useState } from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";
import UploadForm from "./UploadForm.jsx";
import ContentTable from "./ContentTable.jsx";

export default function UploadContent() {
    const [selectedCourse, setSelectedCourse] = useState("MTech");
    const [publishSelection, setPublishSelection] = useState({
        MCA: true,
        MTech: false,
        MBA: true,
        "MCA B1": false,
        "MCA B2": false,
    });

    function togglePublish(key) {
        setPublishSelection((s) => ({ ...s, [key]: !s[key] }));
    }

    return (
        <Panel>
            <div className="panel-header">
                <div className="form-group">
                    <label>Select Course</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
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
                                <input
                                    type="checkbox"
                                    checked={publishSelection[c]}
                                    onChange={() => togglePublish(c)}
                                />
                                {c}
                            </label>
                        ))}
                        <Button className="primary full-width">Publish</Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
}