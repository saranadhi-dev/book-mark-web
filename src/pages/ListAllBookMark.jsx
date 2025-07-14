import { Link } from "react-router-dom";
import useAppStore from "../storage/storage";
import { useState } from "react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function ListAllBookMark() {

    const data = useAppStore((state) => state.bookMarkData);

    const [search, setSearch] = useState("")

    const formattedTime = (epoch) => {
        const localDateTime = epoch ? new Date(epoch).toLocaleString("en-US", {
            year: "numeric",
            month: "short",   // "Apr"
            day: "2-digit",   // "07"
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,     // "AM/PM"
        }) : "";
        return localDateTime
    }

    const exportToExcel = (e) => {
        e.preventDefault();
        const fileName = `BookMark_${Date.now()}`
        const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to worksheet
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // Add worksheet to workbook

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); // Generate Excel buffer
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' }); // Create a Blob
        saveAs(blob, `${fileName}.xlsx`); // Save the file
    };

    return (
        <div className="card card-padding container-padding">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h2 className="mb-0">My Data</h2>
                <div className="d-flex gap-2 mt-3 mt-md-0">
                    <button className="btn btn-success" onClick={exportToExcel}>
                        Export Data
                    </button>
                    <Link to="/create-book-mark" className="btn btn-success">
                        Create New Mark
                    </Link>
                </div>
            </div>

            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {
                data.length === 0 ?
                    (
                        <p className="list-group-item">No data.</p>
                    ) :
                    (
                        <div className="d-flex flex-wrap gap-3">
                            {
                                data
                                    .filter((obj) => {
                                        if (search) {
                                            return obj.title.toLowerCase().includes(search.toLowerCase())
                                        }
                                        else {
                                            return obj
                                        }
                                    })
                                    .map((obj, index) => (
                                        <div
                                            key={index}
                                            className="card p-3 shadow-sm"
                                            style={{
                                                width: "200px",
                                                height: "120px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => window.open(obj.link, "_blank", "noopener,noreferrer")}
                                        >
                                            <div className="card-body d-flex flex-column justify-content-between p-0 h-100">
                                                <div className="d-flex justify-content-center align-items-center flex-grow-1">
                                                    <h6 className="card-title text-center mb-0">
                                                        <strong>{obj.title}</strong>
                                                    </h6>
                                                </div>
                                                <div className="text-end text-muted small">
                                                    {obj.created_at ? formattedTime(obj.created_at) : ""}
                                                </div>
                                            </div>
                                        </div>

                                    ))
                            }
                        </div>
                    )}
        </div>
    );
}

export default ListAllBookMark;
