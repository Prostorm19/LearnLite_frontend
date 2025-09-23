import React from "react";
import Panel from "../../ui/Panel.jsx";
import Button from "../../ui/Button.jsx";

export default function LectureForm() {
    return (
        <Panel title="Record New Lecture">
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
                </div>
                <div className="lecture-form-right">
                    <div className="form-group">
                        <label>Recording Controls</label>
                        <div className="recording-box">
                            Please add a title, subject, and upload at least one slide before
                            recording.
                            <div style={{ marginTop: "1rem" }}>
                                <Button className="success">Start Recording</Button>
                            </div>
                        </div>
                    </div>
                    <div className="preview-box">
                        Upload slides to begin (preview area)
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" />
                    </div>
                </div>
            </div>
        </Panel>
    );
}