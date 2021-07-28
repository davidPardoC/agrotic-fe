import { Redirect, Route } from "react-router-dom"

export const PrivateRoute = (props:any) => {
    const token = ():string | null => {
        return localStorage.getItem('token')
    }
    return token()?<Route {...props}/>:<Redirect to='/signin'/>
}