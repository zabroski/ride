import React from 'react'
import { userInfo } from 'os';

function Dashboard(props) {
    const {user} = props
    return( 
    <div>
        <h1>{user.name &&  `Welcome back ${user.name}`}</h1>
    </div>
    )
}


export default Dashboard;