import UserItem from "../../components/UserItem"
import React, { useEffect } from "react"
import { loadUserAsync, loadPagination, addUserAsync, removeUserAsync, updateUserAsync, selectUser } from './userSlice'
import { useDispatch, useSelector } from "react-redux";

export default function UserList (props) {

    const users = useSelector(selectUser)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUserAsync())
    },[dispatch])

     const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(loadPagination())
        }
    }

        return (
            <div onScroll={scrolling} style={{ overflow: 'scroll', height: 250 }}>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <UserItem
                                    key={user.id}
                                    no={index + 1}
                                    name={user.name}
                                    phone={user.phone}
                                    sent={user.sent}
                                    remove={() => dispatch(removeUserAsync(user.id))}
                                    resend={() => dispatch(addUserAsync({id: user.id, name:user.name, phone: user.phone}))}
                                    update={(name, phone)=> dispatch(updateUserAsync({id: user.id, name: name, phone: phone}))}

                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    
}
