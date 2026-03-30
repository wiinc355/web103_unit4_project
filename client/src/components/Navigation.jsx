import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><h1>Bolt Bucket 🏎️</h1></li>
            </ul>

            <ul>
                <li><a href='/' role='button'>Customize</a></li>
                <li><a href='/customcars' role='button'>View Cars</a></li>
                <li><a href='/manage-custom-items' role='button'>Manage Custom Items</a></li>
            </ul>
            
        </nav>
    )
}

export default Navigation