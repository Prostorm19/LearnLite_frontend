import React, { useState } from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";
import UploadForm from "./UploadForm.jsx";
import ContentTable from "./ContentTable.jsx";

export default function UploadContent() {
    const [selectedCourse, setSelectedCourse] = useState("MTech");

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

            <div>
                <UploadForm />
                <div className="content-list" style={{ marginTop: '2rem' }}>
                    <h3>My Content List</h3>
                    <ContentTable />
                </div>
            </div>
        </Panel>
    );
}
