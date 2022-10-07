import { Component } from 'react'
import {Contacts} from 'components/Contacts/Contacts'

export  class App extends Component {
  render() {
    return (
      <div>
        <h1>Phonebook</h1> 
        <Contacts />
      </div>
    )
  }
}
