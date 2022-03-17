const Nameform = ({name, setName, setNumber, submitCallback}) => {
  const onChangeName = (e) => {
    setName(e.target.value)
  }

  const onChangeNumber = (e) => {
    setNumber(e.target.value)
  }

  return <form onSubmit={submitCallback}>
    <div>
      Name: <input onChange={onChangeName} />
    </div>
    <div>
      Number: <input onChange={onChangeNumber} />
    </div>
    <div>
      <button type="submit">Add to Phonebook</button>
    </div>
  </form>
}

export default Nameform;