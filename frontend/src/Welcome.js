import React from "react";
import { useHistory } from "react-router";

const Welcome = ({currUser}) => {
    const history = useHistory();
    if(currUser === null){
        history.push('/invalid')
    }

    return (
        <>
        <h1 className="text-center mb-5">Welcome {currUser.firstName}!</h1>
        <h2>
           Thank you for registering for Yoldr! An admin will now review your registration in order to approve it! 
        </h2>
        </>
    )
}

export default Welcome;