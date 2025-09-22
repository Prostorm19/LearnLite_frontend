import React from "react";

export default function StatusTag({ status }) {
    return (
        <span className={`status-tag ${status.toLowerCase().replace(" ", "-")}`}>
            {status}
        </span>
    );
}