import { useCallback, useState } from "react";
import { addUser } from "../actions/users";
import { useDispatch } from 'react-redux'

export default function UserForm(props) {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: '',
        phone: ''
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        dispatch(addUser(user.name, user.phone))
        setUser({ name: '', phone: '' })
    }, [user])

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <label htmlFor="name" className="col-form-label">Name</label>
                </div>
                <div className="col-auto">
                    <input type="text" id="name" name="name" className="form-control" aria-describedby="passwordHelpInline" onChange={handleInputChange} value={user.name} placeholder="name" />
                </div>
                <div className="col-auto">
                    <label htmlFor="phone" className="col-form-label">Phone</label>
                </div>
                <div className="col-auto">
                    <input type="integer" id="phone" name="phone" className="form-control" aria-describedby="passwordHelpInline" onChange={handleInputChange} value={user.phone} placeholder="phone" />
                </div>
                <div className="col-auto">
                    <button className="btn btn-success" type="submit"><i className="fa-regular fa-circle-check"></i> {props.submitLabel || 'Save'}</button>
                    <button className="btn btn-warning text-light" onClick={props.cancel}><i className="fa-solid fa-ban"></i> Cancel</button>
                </div>
            </div>
        </form>
    )

}
