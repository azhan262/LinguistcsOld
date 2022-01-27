//getting API for showing all the data
export const getTeachers = () => fetch("http://localhost:7000/teachers").then(res => res.json())

//getting API for inserting the data
export const createTodoForTeacher = (todo) => fetch("http://localhost:7000/teachers/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for updating specific data
export const updateTodoForTeacher = (todo, id) => fetch(`http://localhost:7000/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  

//getting API for getting specific data
export const getTeacher = (id) => fetch(`http://localhost:7000/teachers${id}`).then(res => res.json())