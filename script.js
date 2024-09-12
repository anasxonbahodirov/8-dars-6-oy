// Foydalanuvchilarni yuklash va DOMga chiqarish uchun asynxron funksiyani yaratamiz
async function fetchUsers() {
    try {
        // API'ga so'rov yuborib, foydalanuvchilarni olish
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        // DOM elementlarini yuklab olish
        const usersContainer = document.getElementById('users-container');
        const filterInput = document.getElementById('filter-input');

        // Foydalanuvchilarni ko'rsatish funksiyasi
        function displayUsers(filteredUsers) {
            usersContainer.innerHTML = ''; // Oldingi foydalanuvchilarni tozalaymiz

            filteredUsers.forEach(user => {
                const userElement = document.createElement('div');
                userElement.classList.add('user');
                userElement.innerHTML = `
                    <h3>${user.name}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                    <p><strong>Website:</strong> ${user.website}</p>
                `;
                usersContainer.appendChild(userElement);
            });
        }

        // Barcha foydalanuvchilarni ko'rsatamiz
        displayUsers(users);

        // Foydalanuvchilarni filtrlash funksiyasi
        filterInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            const filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(searchTerm)
            );

            displayUsers(filteredUsers); // Filtrlangan foydalanuvchilarni ko'rsatamiz
        });

    } catch (error) {
        console.error('Xatolik yuz berdi:', error);
    }
}

// Funksiyani chaqiramiz
fetchUsers();
