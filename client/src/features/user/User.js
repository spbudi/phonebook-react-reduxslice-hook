import UserForm from "./UserForm";
import UserList from "./UserList";
import UserSearchForm from "./UserSearchForm";
import React, { useState } from "react";

export default function UserBox(props) {

    const [user, setUser] = useState({
        isAdd: false
    })

    const handleClickAdd = () => {
        setUser({
            isAdd: true
        })
    }

    const handleCancelClick = () => {
        setUser({
            isAdd: false
        })
    }


    return (
        <div className="container mt-3">
            <div className="card">
                <div className="card-header text-center p-4">
                    <h1>Phone Book Apps</h1>
                </div>
            </div>
            <div>
                {user.isAdd ?
                    <div className="card mt-4">
                        <div className="card-header">
                            <h6>Adding Form</h6>
                        </div>
                        <div className="card-body">
                            <UserForm cancel={handleCancelClick} />
                        </div>
                    </div>
                    :
                    <button className='btn btn-primary mt-4' onClick={handleClickAdd} ><i className="fa-solid fa-plus"></i> add</button>}
            </div>

            <div className="card mt-4">
                <div className="card-header">
                    <h6>Search Form</h6>
                </div>
                <div className="card-body">
                    <UserSearchForm />
                </div>
            </div>
            <UserList
            />
        </div>
    )

}