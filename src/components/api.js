import React, { Component } from 'react'
import axios from 'axios'

export class Api extends Component {
    
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then( response => {
                console.log('response',response)
            })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Api