import PropTypes from 'prop-types';

const Persons = ({ array, deletePerson }) => {
  return(
    <ul>
        {array && array.map(person => 
          <li key={person.id}>
            {person.name} / {person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>)}
      </ul>
  )
}

Persons.propTypes = {
  array: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deletePerson: PropTypes.func.isRequired,
};

export default Persons