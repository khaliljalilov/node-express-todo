console.log("JavaScript tamamilə yeniləndi! 🚀");

async function getTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        
        const ul = document.getElementById('task-list');
        ul.innerHTML = ''; // İçini əvvəlcə təmizləyirik

        // Sənin dediyin o qəşəng += üsulu:
        tasks.forEach(task => {
            // Əgər task obyektdirsə task.title, düz mətndirsə task-ın özünü yazdırır
            const taskText = task.title ? task.title : task;
            ul.innerHTML += `<li>${taskText}</li>`;
        });

    } catch (error) {
        console.error('Frontend-də xəta baş verdi:', error);
    }
}

getTasks();