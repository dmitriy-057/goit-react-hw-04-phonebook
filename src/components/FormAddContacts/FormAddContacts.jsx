import { Component } from 'react'
import { nanoid } from 'nanoid'
import css from './FormAddContacts.module.css'
import PropTypes from "prop-types";
export class FormAddContacts extends Component {
    state = {
        name: '',
        number: ''
      }
      nameId = nanoid()
      numberId = nanoid()

      handleChange = (e) => {
        const {name, value} = e.target
        this.setState ({[name]: value }) 
      }
      handleSubmit = (e) => {
        e.preventDefault()
        console.log(e);
        const {name,number} = this.state;
        this.props.onSubmit({name,number})
        this.setState({
          name: '',
          number: ''
          })
          console.log(name,number);
      }
  render() {
    const {nameId,numberId, handleSubmit,handleChange} = this;
    return (
     <form onSubmit={handleSubmit}>
      <div className={css.formContainer}>
        <label htmlFor={nameId}>Name</label>
        <input
            onChange={handleChange}
            value={this.state.name}
            id ={nameId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
        />
        <label htmlFor={numberId}>Number</label>
        <input
            onChange={handleChange}
            value={this.state.number}
            id={numberId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
        />
       
        <button className={css.formBtn}>Add contact</button>
      </div>
    </form>
    )
  }
}
FormAddContacts.propTypes = {
    FormAddContacts:PropTypes.func
    }