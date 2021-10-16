import React from "react"
import { Card, CardBody, CardText, CardTitle, Button } from "reactstrap"

const User = ({user, setStatus}) => {
    const {id, email, firstName, lastName, state} = user;
    return(
    <Card>
        <CardBody>
            <CardTitle>
                { firstName } {lastName}
            </CardTitle>
            <CardText>
                {email}
            </CardText>
            <p>Status: {state}</p>
            <Button color="primary" onClick={() => setStatus(id)}>
                {(state === "active") ? "Deactiate" : "Activate" }
            </Button>
        </CardBody>
    </Card>
)}

export default User;