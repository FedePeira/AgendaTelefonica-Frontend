const PersonsForm = (props) => {
  return(
    <form onSubmit={props.createPerson}>
      <div>
        name: <input value={props.valueName} onChange={props.handleNameChange}/>
      </div>
      <div>number: <input value={props.valueNumber} onChange={props.handleNumberChange}/></div>
      <div> <button type="submit">Add</button> </div>
    </form>
  )
}

export default PersonsForm
