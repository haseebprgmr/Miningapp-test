let timer;
   let timeLeft = 8 * 60 * 60; // 8 hours in seconds

   function startTimer() {
     timer = setInterval(() => {
       timeLeft--;
       const hours = Math.floor(timeLeft / 3600);
       const minutes = Math.floor((timeLeft % 3600) / 60);
       const seconds = timeLeft % 60;
       document.getElementById('timer').innerText = `${hours}:${minutes}:${seconds}`;
       if (timeLeft <= 0) {
         clearInterval(timer);
         alert("Time's up! Claim your points to start the next timer.");
       }
     }, 1000);
   }

   function claimPoints() {
     fetch('/api/claim-points', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ userId: 1 }) // Replace with actual user ID
     })
       .then(response => response.json())
       .then(data => {
         alert(`Points claimed! Total points: ${data.points}`);
         timeLeft = 8 * 60 * 60; // Reset timer
         startTimer();
       });
   }

   function addFriend() {
     const friendCode = document.getElementById('friend-code').value;
     fetch('/api/add-friend', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ userId: 1, friendCode }) // Replace with actual user ID
     })
       .then(response => response.json())
       .then(data => {
         alert(`Friend added: ${data.friendName}`);
         // Update friend list
         const friendList = document.getElementById('friend-list');
         const li = document.createElement('li');
         li.innerText = data.friendName;
         friendList.appendChild(li);
       });
   }

   startTimer();
