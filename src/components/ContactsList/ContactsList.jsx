import css from "./ContactsList.module.css"
import PropTypes from "prop-types";
export function ContactsList({items, removeContact}) {
  
  return (
    <ul>
        {items.map(({name,number, id}) => {
       return <li className={css.ContactItem}
        key={id}>{name}: <span className={css.number}>{number}</span>
        <button className={css.button} onClick={()=> removeContact(id)}>Delete</button>
       </li> 
    })}
    </ul>
  )
}
ContactsList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.number,
    }))
  }