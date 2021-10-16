import { Route, useHistory } from "react-router-dom";
import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import Home from "./ Home";
import "./Routes.css"
import YoldrApi from "./api";
import RegisterForm from "./RegisterForm"
import Welcome from "./Welcome";
import AdminForm from "./AdminForm";
import Admin from "./Admin"

const Routes = () => {
    const INITIAL_STATE = {
        firstName: "", 
        lastName: "", 
        email: "",
        type: "user"
    }
    const INITIAL_ADMIN_STATE = {
        email: "",
        password: "",
        type: "admin"
    }
    const INTIAL_ERROR = {error: false, msg: ""}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [adminData, setAdminData] = useState(INITIAL_ADMIN_STATE);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(INITIAL_STATE);
    const history = useHistory();
    const [currUser, setUser] = useState(null);
    const signout = () => {
        localStorage.removeItem("currUser")
        history.push('/');
        setUser(null);
    }

    const setStatus = async(id) => {
        const u = await YoldrApi.getUser(id);
        let newState;
        switch(u.state){
            case "active":
                newState = "deactive";
                break;
            case "deactive":
            case "pending":
                newState = "active";
                break;
        }

        u.state = newState;
        await YoldrApi.updateUser(id, u)
        let updatedUsers = [...users];
        for(let user of updatedUsers){
            if(user.email === u.email){
                user.state = newState;
            }
        }
        setUsers(updatedUsers);
    }

    useEffect(() => {
        async function fetchUsers() {
            const u = await YoldrApi.getUsers();
            setUsers(u)
        }
        fetchUsers();
        console.log(users)
    }, [])

    const onAdminChange = e => {
        let {name, value} = e.target;
        setAdminData(fD => ({
            ...fD,
            [name]: value
        }));
    }

    const onChange = e => {
        let {name, value} = e.target;
        setFormData(fD => ({
            ...fD,
            [name]: value
        }));
    }

    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        let er = INTIAL_ERROR;
        for(let key of Object.keys(adminData)){
            if(adminData[key] === ""){
                er.error = true;
                er.msg = "All inputs must be filled!";
            }
        }
        if(!er.error){
            try{
                for(let u of users){
                    if(u.email === adminData.email && u.password === adminData.password && u.isAdmin){
                        setUser(u);
                        localStorage.setItem("currUser", JSON.stringify(u))
                        history.push("/admin")
                    }else{
                        er.error = true;
                        er.msg = "Either invalid credentials or not a admin";
                    }
                }
            }catch(e){
                console.log(e)
            }
        }
        setError(er)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let er = INTIAL_ERROR;
        for(let key of Object.keys(formData)){
            if(formData[key] === ""){
                er.error = true;
                er.msg = "All inputs must be filled!";
            }
        }

        for(let u of users){
            console.log(formData.email, u.email)
            if(formData.email === u.email){
                er.error = true;
                er.msg = "Email is already registered!"
            }
        }
        if(!er.error){
            try{
                const u = await YoldrApi.addUser(formData);
                console.log(u)
                localStorage.setItem("currUser", JSON.stringify(u))
                setUser(u)
                let allUsers = [...users, u]
                setUsers(allUsers)
                history.push("/welcome")
            }catch(e){
                console.log(e)
            }
        }
        setError(er)
    }

    return(
        <>
            <NavBar signout={signout}/>
            <div className="container Routes">
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/register">
                    <RegisterForm 
                        onChange={onChange} 
                        handleSubmit={handleSubmit}
                        formData={formData}
                        error={error}
                    />
                </Route>
                <Route exact path="/welcome">
                    <Welcome currUser={currUser}/>
                </Route>
                <Route exact path="/invalid">
                    <h1>Invalid attempt to access route!</h1>
                </Route>
                <Route exact path="/login">
                    <AdminForm 
                        onChange={onAdminChange} 
                        handleSubmit={handleAdminSubmit}
                        formData={adminData}
                        error={error}
                    />
                </Route>
                <Route exact path="/admin">
                    <Admin users={users} setStatus={setStatus}/>
                </Route>
            </div>
        </>
    )
}

export default Routes;