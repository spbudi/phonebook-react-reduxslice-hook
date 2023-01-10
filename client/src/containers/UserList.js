import UserItem from "../components/UserItem"
import React, { useEffect } from "react"
import { loadUser, removeUser, resendUser, updateUser, loadMore } from "../actions/users";
import { useDispatch, useSelector } from "react-redux";

export default function UserList (props) {

    const users = useSelector((state) => state.users.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    },[dispatch])

     const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(loadMore())
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
                                    remove={() => dispatch(removeUser(user.id))}
                                    resend={() => dispatch(resendUser(user.id, user.name, user.phone))}
                                    update={(name, phone)=> dispatch(updateUser(user.id, name, phone))}

                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    
}
