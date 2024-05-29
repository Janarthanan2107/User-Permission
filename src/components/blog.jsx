import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import BlogForm from './BlogForm';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { getLoggedInUser } from '../auth/authUtils.js'; // Adjust the path accordingly

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogDialog, setBlogDialog] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [userRoles, setUserRoles] = useState({ view: false, read: false, update: false, delete: false });

    useEffect(() => {
        const loggedInUser = getLoggedInUser();
        setUserRoles(loggedInUser?.roles || {});

        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs);
    }, []);

    const openNew = () => {
        setCurrentBlog(null);
        setBlogDialog(true);
    };

    const editBlog = (blog) => {
        setCurrentBlog(blog);
        setBlogDialog(true);
    };

    const deleteBlog = (blog) => {
        const filteredBlogs = blogs.filter(b => b.id !== blog.id);
        setBlogs(filteredBlogs);
        localStorage.setItem('blogs', JSON.stringify(filteredBlogs));
    };

    const saveBlog = (blog) => {
        let updatedBlogs = [...blogs];
        if (blog.id) {
            const index = updatedBlogs.findIndex(b => b.id === blog.id);
            updatedBlogs[index] = blog;
        } else {
            blog.id = new Date().getTime();
            updatedBlogs.push(blog);
        }
        setBlogs(updatedBlogs);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setBlogDialog(false);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                {userRoles.update && <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editBlog(rowData)} />}
                {userRoles.delete && <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteBlog(rowData)} />}
            </div>
        );
    };

    return (
        <div className="p-d-flex p-flex-column p-ai-center p-mt-4">
            <h1>Blog Management</h1>
            {userRoles.create && <Button label="New Blog" icon="pi pi-plus" className="p-mb-4 mb-2" onClick={openNew} />}
            {userRoles.view && (
                <DataTable value={blogs}>
                    <Column field="title" header="Title" />
                    <Column field="content" header="Content" />
                    <Column body={actionBodyTemplate} />
                </DataTable>
            )}

            <Dialog visible={blogDialog} style={{ width: '450px' }} header="Blog Details" modal className="p-fluid" onHide={() => setBlogDialog(false)}>
                <BlogForm blog={currentBlog} saveBlog={saveBlog} />
            </Dialog>
        </div>
    );
};

export default Blog;
