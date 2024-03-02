import React from "react";
const AuthContext = React.createContext();
export default AuthContext;


export const logout = async() =>{
    await SignOut(AuthContext)
    return{success:true}
}