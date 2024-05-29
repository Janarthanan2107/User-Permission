import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const BlogForm = ({ blog, saveBlog }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [blog]);

    const onSubmit = () => {
        saveBlog({ id: blog?.id, title, content });
    };

    return (
        <div className='flex flex-column gap-2'>
            <div className="p-field">
                <label htmlFor="title">Title</label>
                <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} required autoFocus />
            </div>
            <div className="p-field">
                <label htmlFor="content">Content</label>
                <InputTextarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={5} cols={30} />
            </div>
            <Button label="Save" icon="pi pi-check" onClick={onSubmit} />
        </div>
    );
};

export default BlogForm;
