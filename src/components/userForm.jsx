import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';

const UserForm = ({ user, visible, onHide, onSave }) => {
    const [userData, setUserData] = useState(user);

    useEffect(() => {
        setUserData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleRoleChange = (e) => {
        const { name, checked } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            roles: { ...prevState.roles, [name]: checked },
        }));
    };

    const footer = () => {
        return <div className="p-field">
            <Button label="Save" icon="pi pi-check" onClick={handleSave} />
        </div>
    }

    const handleSave = () => {
        // console.log(userData)
        onSave(userData);
    };

    return (
        <Dialog header="User Details" visible={visible} style={{ width: '400px' }} onHide={onHide} footer={footer}>
            <div className="p-fluid flex flex-column gap-2">
                <div className="p-field flex flex-column gap-2">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" name="name" value={userData.name} onChange={handleChange} />
                </div>
                <div className="p-field flex flex-column gap-2">
                    <label htmlFor="age">Age</label>
                    <InputNumber id="age" name="age" value={userData.age} onValueChange={(e) => handleChange({ target: { name: 'age', value: e.value } })} />
                </div>
                <div className="p-field flex flex-column gap-2">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" name="email" value={userData.email} onChange={handleChange} />
                </div>
                <div className="p-field flex flex-column gap-2">
                    <label>Roles</label>
                    <div className="p-formgrid flex gap-3">
                        <div className="p-field-checkbox p-col-12 p-md-3 flex gap-1">
                            <Checkbox inputId="view" name="view" checked={userData.roles.view} onChange={handleRoleChange} />
                            <label htmlFor="view">View</label>
                        </div>
                        <div className="p-field-checkbox p-col-12 p-md-3 flex gap-1">
                            <Checkbox inputId="create" name="create" checked={userData.roles.create} onChange={handleRoleChange} />
                            <label htmlFor="create">Create</label>
                        </div>
                        <div className="p-field-checkbox p-col-12 p-md-3 flex gap-1">
                            <Checkbox inputId="update" name="update" checked={userData.roles.update} onChange={handleRoleChange} />
                            <label htmlFor="update">Update</label>
                        </div>
                        <div className="p-field-checkbox p-col-12 p-md-3 flex gap-1">
                            <Checkbox inputId="delete" name="delete" checked={userData.roles.delete} onChange={handleRoleChange} />
                            <label htmlFor="delete">Delete</label>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default UserForm;
