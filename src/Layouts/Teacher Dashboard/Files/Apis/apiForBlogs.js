//getting API for showing all the data
export const getBlogs = () => fetch("http://localhost:7000/blogs").then(res => res.json())

//getting API for inserting the data
export const createBlogs = (todo) => fetch("http://localhost:7000/blogs/create", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  


//getting API for updating specific data
export const updateBlog= (todo, id) => fetch(`http://localhost:7000/coursePlannings/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  
//getting API for deleting specific data
export const deleteBlog= (todo, id) => fetch(`http://localhost:7000/coursePlannings/${id}`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(todo)
})  


//getting API for getting specific data
export const getBlog = (id) => fetch(`http://localhost:7000/${id}`).then(res => res.json())