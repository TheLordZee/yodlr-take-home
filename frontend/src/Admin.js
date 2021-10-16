import React  from "react"
import { useHistory } from "react-router";
import { ListGroup, ListGroupItem } from "reactstrap";
import User from "./User";

const Admin = ({users, setStatus}) => {
    console.log(users)
    const history = useHistory()
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    if(!currUser || !currUser.isAdmin){
        history.push("/invalid")
    }

    return(
        <>
            <h1>Welcome Admin!</h1>
            <ListGroup>
                {users.map((u) => {
                    if(u.email !== currUser.email){
                        return(
                            <ListGroupItem>
                                <User user={u} setStatus={setStatus}/>
                            </ListGroupItem>
                    )
                }})}
            </ListGroup>
        </>
    )
}

export default Admin;