import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../storage/storage";

function CreateBookMark() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const navigate = useNavigate();

    const _addBookMark = useAppStore((state) => state.addBookMark);

    const submit = (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            link: link,
            created_at: Date.now(),
            isPinned: false
        }
        _addBookMark(data)

        navigate("/my-book-mark")
    };

    return (
        <div className="card shadow-sm p-4">
            <h3 className="header-margin">Create</h3>
            <form onSubmit={submit}>
                <input
                    className="form-control mb-3"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="form-control mb-3"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <input
                    className="form-control mb-3"
                    placeholder="Reference"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
                <button className="btn btn-success" type="submit">
                    Add
                </button>
            </form>
        </div>
    );
}

export default CreateBookMark;