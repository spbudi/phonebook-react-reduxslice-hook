import React, { useState, useCallback, Fragment } from "react"

export default function UserItem (props) {

    const [user, setUser] = useState({
        name: props.name,
        phone: props.phone,

    })

    const [edit, setEdit] = useState({
        isEdit: false
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleEdit = () => {
        setEdit({
            isEdit: true
        });
    }

    const handleCancel = () => {
        setEdit({
            isEdit: false
        });
    }

    const saveEdit = useCallback(() => {
        props.update(user.name, user.phone)
        setEdit({
            isEdit: false
        });
    },[props, user])

        return (
            <tr>
                <td>{props.no}</td>
                {edit.isEdit ?
                    <Fragment>
                        <td>
                            <input type="text" name="name" className="form-control" value={user.name} onChange={handleInputChange} />
                        </td>
                        <td>
                            <input type="text" name="phone" className="form-control" value={user.phone} onChange={handleInputChange} />
                        </td>
                    </Fragment>
                    :
                    <Fragment>
                        <td>{props.name}</td>
                        <td>{props.phone}</td>
                    </Fragment>

    }

                {props.sent ?
                    edit.isEdit ?
                        <td>
                            <button className="btn btn-info mx-1" onClick={saveEdit}><i className="fa-solid fa-floppy-disk"></i> Save</button>
                            <button className="btn btn-warning" type="button" onClick={handleCancel}><i className="fa-solid fa-xmark"></i> Cancel</button>
                        </td>
                        :
                        <td>
                            <button className="btn btn-success mx-1" onClick={handleEdit}><i className="fa-solid fa-pencil"></i> Edit</button>
                            <button className="btn btn-danger" type="button" onClick={props.remove}><i className="fa-regular fa-trash-can"></i> Delete</button>
                        </td>
                    :
                    <td>
                        <button className="btn btn-warning" type="button" onClick={props.resend}><i className="fa-solid fa-rotate-right"></i> Resend</button>
                    </td>
                }
            </tr>
        )
    
}