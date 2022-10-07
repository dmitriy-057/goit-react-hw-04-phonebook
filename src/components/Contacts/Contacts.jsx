import { Component } from 'react'
import { FormAddContacts } from 'components/FormAddContacts/FormAddContacts'
import { ContactsList } from 'components/ContactsList/ContactsList'
import { nanoid } from 'nanoid'
export class Contacts extends Component {
    state = { 
        contacts: [    
            // {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            // {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            // {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            // {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: ''
    }

    componentDidUpdate(prevState) {
      const {contacts} = this.state;
      if(prevState !== contacts) {
        localStorage.setItem("contacts", JSON.stringify(contacts))
      }
    }

    componentDidMount(){
      const newContacts = JSON.parse(localStorage.getItem("contacts"))

      if(newContacts && newContacts.length) {
        this.setState({
          contacts: newContacts
        }) 
      }
    }

  addContact = (contact) => {
    if (this.isDuplicate(contact)) {
        return alert(`${contact.name}has already added`)
    }
    this.setState((prev)=>{
        const contactsId = {
            id: nanoid(), 
            ...contact}
      return {
        contacts: [...prev.contacts, contactsId]
      }
    })
  }
  removeContact =(id)=> {
    this.setState((prev) => {
        const newContacts = prev.contacts.filter((item)=> item.id !== id);
        return  {
            contacts: newContacts
        }
    })
  }

  isDuplicate({name}) {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === name);
    return result;
  }
  handleChange = (e) => {
    const {name, value} = e.target
    this.setState ({[name]: value }) 
  }
  getFilteredContacts() {
    const {contacts, filter} = this.state;

    if(!filter) {
        return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({name}) => {
        const normalizedName = name.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter)
        return result;
    })
    return filteredContacts;
  }
  render() {
    
    const {addContact, handleChange, removeContact} = this;
    const { filter} = this.state;
    const contacts = this.getFilteredContacts()
    return (
    <div>
        <div>
            <FormAddContacts onSubmit={addContact} />
        </div>
        <div>
            <h2>Contacts</h2>
            <label htmlFor="">Find contacts by name</label>
            <input 
                onChange={handleChange} 
                value={filter}  
                type="text" 
                name='filter' 
            />
            <ContactsList items= {contacts} removeContact={removeContact}/>
        </div>
    </div>
        
    )
  }
}

