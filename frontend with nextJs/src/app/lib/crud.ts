"use server"

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
    
       
      } catch (error) {
        console.error('Error adding user:', error);
        throw error;
      }
}