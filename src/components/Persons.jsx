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

export default Persons