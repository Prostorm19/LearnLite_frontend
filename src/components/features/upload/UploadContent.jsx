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
                    <label>Select Subject</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option>Linked Lists</option>
                        <option>Trees</option>
                        <option>Maps</option>
                        <option>Arrays</option>
                    </select>
                </div>
                <Button className="primary">Upload New</Button>
            </div>

            <div>
                <UploadForm />

            </div>
        </Panel>
    );
}
