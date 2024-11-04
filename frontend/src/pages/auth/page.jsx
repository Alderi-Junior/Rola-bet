import { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"
import styles from './page.module.css'
import authServices from "../../services/auth"
import {useNavigate} from  "react-router-dom"


export default function Auth(){
    const [formType, setFormType] = useState('login')
    const [formData, setFormData] = useState(null)
    const { login, signup, authLoading } = authServices() 
    const navigate = useNavigate()
    const authData = JSON.parse(localStorage.getItem('auth'))

    useEffect(() => {
        if(authData){
            return navigate('/profile')
        }
    }, [])

const handleChangeFormType = () =>{
    setFormData(null)
    if(formType === 'login'){
        setFormType('signup')
    }else{
        setFormType('login')
    }

}

const handleFormDataChange = (e) =>{
    setFormData({
        ...formData,
        [e.target.name]: e.target.value

    })
}

const handleSubmitForm = (e) =>{
    e.preventDefault()

    switch (formType) {
        case 'login':
            login(formData)
            break
        case 'signup':
            if(formData.password !== formData.confirmPassword){      
                console.log('Passowords do not match!')
                return
            }
            signup(formData)
        break

    }
    
}

    if (authLoading) {
        return (      <div className="flex items-center justify-center h-screen">
            <span className="loading loading-ring loading-lg"></span>
          </div>)
    }

    if(formType === 'login'){
    return(
            <div className={styles.authPageContainer}>
                <h1>Login</h1>
                <button onClick={handleChangeFormType}>Don't you have an account? Click Here</button>
                <form onSubmit={handleSubmitForm}>
                    <TextField 
                        required
                        label = "E-mail"
                        type="email"
                        name="email"
                        onChange={handleFormDataChange}
                    />
                    <TextField 
                        required
                        label = "Password"
                        type="password"
                        name="password"
                        onChange={handleFormDataChange}

                    />
                    <Button type="submit">Login </Button>


                </form>
            </div>

        )
    }

    if(formType === 'signup'){
        return(
            <div className={styles.authPageContainer}>
            <h1>SignUp</h1>
            <button onClick={handleChangeFormType}>Aldready have an account? Click here</button>
            <form onSubmit={handleSubmitForm}>
                <TextField 
                            required
                            label = "Fullname"
                            type="name"
                            name="fullname"
                            onChange={handleFormDataChange}

                />
                <TextField 
                            required
                            label = "E-mail"
                            type="email"
                            name="email"
                            onChange={handleFormDataChange}
                        />
                <TextField 
                            required
                            label = "Password"
                            type="password"
                            name="password"
                            onChange={handleFormDataChange}

                />
                <TextField 
                            required
                            label = "Confirm Password"
                            type="password"
                            name="confirmPassword"
                            onChange={handleFormDataChange}

                />
                        <Button type="submit">SignUp </Button>

            </form>
            
        </div>
            )
        }
}