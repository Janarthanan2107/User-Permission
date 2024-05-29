import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserForm from './userForm';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDialog, setUserDialog] = useState(false);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const saveUsersToLocalStorage = (users) => {
        localStorage.setItem('users', JSON.stringify(users));
    };

    const openNew = () => {
        setSelectedUser({ name: '', age: null, email: '', roles: { view: false, create: false, update: false, delete: false } });
        setUserDialog(true);
    };

    const hideDialog = () => {
        setUserDialog(false);
    };

    const saveUser = (user) => {
        let _users = [...users]; // Create a copy of the existing users array
        if (!user.id) {
            // If it's a new user, add default password
            user.password = "12345678";
            user.id = new Date().getTime(); // Generate a unique ID
            _users.push(user); // Add the new user to the array
        } else {
            const index = _users.findIndex((u) => u.id === user.id); // Find the index of the user
            _users[index] = user; // Update the user in the array
        }
        setUsers(_users); // Update state with the new users array
        saveUsersToLocalStorage(_users); // Save users to local storage
        setUserDialog(false); // Close the dialog
    };


    const editUser = (user) => {
        setSelectedUser(user);
        setUserDialog(true);
    };

    const deleteUser = (user) => {
        const _users = users.filter((u) => u.id !== user.id);
        setUsers(_users);
        saveUsersToLocalStorage(_users);
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteUser(rowData)} />
            </div>
        );
    };

    const rolesBodyTemplate = (rowData) => {
        return (
            <div className='flex gap-1'>
                {rowData.roles.view && <span className="p-tag p-tag-primary p-mr-2">View</span>}
                {rowData.roles.create && <span className="p-tag p-tag-secondary p-mr-2">Create</span>}
                {rowData.roles.update && <span className="p-tag p-tag-success p-mr-2">Update</span>}
                {rowData.roles.delete && <span className="p-tag p-tag-danger">Delete</span>}
            </div>
        );
    };

    return (
        <div className="UserTable">
            <div className="p-d-flex p-jc-between p-ai-center p-mb-4 mb-2">
                <h1>User Management</h1>
                <Button label="New User" icon="pi pi-plus" onClick={openNew} />
            </div>

            <DataTable value={users} paginator rows={5}>
                <Column field="name" header="Name" />
                <Column field="age" header="Age" />
                <Column field="email" header="Email" />
                <Column field="roles" header="Roles" body={rolesBodyTemplate} />
                <Column body={actionBodyTemplate} header="Actions" />
            </DataTable>

            {userDialog && (
                <UserForm
                    user={selectedUser}
                    visible={userDialog}
                    onHide={hideDialog}
                    onSave={saveUser}
                />
            )}
        </div>
    );
};

export default UserTable;
