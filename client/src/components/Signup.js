import React from 'react'
import SignUpForm from './SignUpForm'


function Signup(props) {
    return(
        <div>
            <SignUpForm {...props} />
        </div>
    )
}


export default Signup