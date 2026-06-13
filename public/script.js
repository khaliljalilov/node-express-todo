async function getTasks() {
    try {
        const response = await fetch('../data/tasks.json');
        const tasks = await response.json();
        
        const ul = document.getElementById('task-list');
        ul.innerHTML = ''; 

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title; 
            ul.appendChild(li); 
        });

    } catch (error) {
        console.error('Frontend-də xəta baş verdi:', error);
    }
}

getTasks();