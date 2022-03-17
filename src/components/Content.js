const Person = ({person, deleteCallback}) => {
  return <p>{person.name} {person.number} <button onClick={() => deleteCallback(person.id, person.name)}>Delete</button></p>
}

const Content = ({persons, filter, deleteCallback}) => {
  let listToUse = persons

  filter = filter.toLowerCase()

  if (filter !== '') {
    listToUse = persons.filter(p => p.name.toLowerCase().startsWith(filter))
  }

  return <>{
    listToUse.map((p) => 
      <Person key={p.id} person={p} deleteCallback={deleteCallback} />
    )
  }</>
}

export default Content;