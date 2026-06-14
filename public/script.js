console.log("JavaScript tamamilə yeniləndi! 🚀");

async function getTasks() {
  try {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    const ul = document.getElementById("task-list");
    ul.innerHTML = ""; 


    tasks.forEach(task => {
      ul.innerHTML += `
        <li>
            ${task.title} 
            <button onclick="deleteTask(${task.id})" style="color: red; margin-left: 10px;">X</button>
        </li>
    `;
    });
  } catch (error) {
    console.error("Frontend-də xəta baş verdi:", error);
  }
}

async function deleteTask(id) {
    try{
        const response = await fetch('/api/tasks' , {
            method: 'DELETE' , 
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({taskId: id})
        })
        if(response.ok){
            getTasks()
        }
    }catch(error){
        console.log("silme xetasi:",error);
        
    }
}

getTasks();
