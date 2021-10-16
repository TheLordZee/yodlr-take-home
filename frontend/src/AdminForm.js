import React from "react"
import { Form, Label, Input, Alert } from "reactstrap";

const AdminForm = ({handleSubmit, onChange, formData, error}) => (
    <Form 
        onSubmit={handleSubmit} 
        className=" col-md-8 offset-md-2">
        {(error.error) ? 
            <Alert color="danger">
                {error.msg}
            </Alert>
            : null
        }
        <Label htmlFor="email">Email:</Label>
        <Input 
            value={formData.email}
            onChange={onChange}
            name="email"
            type="email"
            placeholder="email"
        />
        <Label htmlFor="password">Password:</Label>
        <Input 
            value={formData.password}
            onChange={onChange}
            name="password"
            type="password"
            placeholder="password"
        />
        <button className="btn btn-danger">Submit</button>
    </Form>
)

export default AdminForm;