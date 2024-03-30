const getUserData=async(email)=>{  
        const response = await fetch('http://localhost:3000/getUserData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:email }),
        });
        const data = await response.json();
  
        if (response.ok == true) {  
          return data.user;
        }
        else {
            console.log("Something went wrong!!!")
          return;
        }
}

export default getUserData;