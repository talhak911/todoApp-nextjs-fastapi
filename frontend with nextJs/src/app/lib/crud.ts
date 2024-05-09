"use server"
export   const GetUsersAction = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8080/get_users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};



export const  AddUserAction=async(user:string)=>{
    try {
        const response = await fetch('http://127.0.0.1:8080/add_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: user }), 
        });
    
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        return response.json()
       
      } catch (error) {
        console.error('Error adding user:', error);
        return error
      }
}
export const GetTodosAction=async()=>{
  try {
    const response = await fetch('http://127.0.0.1:8080/get_todos');

    if (!response.ok) {
      throw new Error('Failed to get todos');
    }
    return response.json()
   
  } catch (error) {
    console.error('Error adding user:', error);
    return error
  }
}