  const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Player setup
      const player = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 20,
        speed: 5,
        color: "blue",
      };

      // Enemy setup
      const enemies = [];
      const enemySize = 20;
      const enemySpeed = 2;

      // Create enemies
      function createEnemy() {
        const enemy = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: enemySize,
          speed: enemySpeed,
          color: "red",
        };
        enemies.push(enemy);
      }

      // Movement keys
      const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
      };

      // Event listeners for key presses
      window.addEventListener("keydown", (e) => {
        if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
      });

      window.addEventListener("keyup", (e) => {
        if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
      });

      // Event listeners for touch input
      canvas.addEventListener("touchstart", handleTouch);
      canvas.addEventListener("touchmove", handleTouch);

      function handleTouch(e) {
        const touch = e.touches[0];
        const touchX = touch.clientX;
        const touchY = touch.clientY;

        if (touchY < player.y) keys.ArrowUp = true;
        else keys.ArrowUp = false;

        if (touchY > player.y) keys.ArrowDown = true;
        else keys.ArrowDown = false;

        if (touchX < player.x) keys.ArrowLeft = true;
        else keys.ArrowLeft = false;

        if (touchX > player.x) keys.ArrowRight = true;
        else keys.ArrowRight = false;
      }

      // Update game state
      function update() {
        // Move player
        if (keys.ArrowUp) player.y -= player.speed;
        if (keys.ArrowDown) player.y += player.speed;
        if (keys.ArrowLeft) player.x -= player.speed;
        if (keys.ArrowRight) player.x += player.speed;

        // Keep player within bounds
        if (player.x < 0) player.x = 0;
        if (player.x + player.size > canvas.width)
          player.x = canvas.width - player.size;
        if (player.y < 0) player.y = 0;
        if (player.y + player.size > canvas.height)
          player.y = canvas.height - player.size;

        // Move enemies towards player
        enemies.forEach((enemy) => {
          if (enemy.x < player.x) enemy.x += enemy.speed;
          if (enemy.x > player.x) enemy.x -= enemy.speed;
          if (enemy.y < player.y) enemy.y += enemy.speed;
          if (enemy.y > player.y) enemy.y -= enemy.speed;
        });

        // Check for collisions
        enemies.forEach((enemy) => {
          const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
          if (dist < player.size + enemy.size) {
            alert("Game Over!");
            document.location.reload();
          }
        });
      }

      // Draw game elements
      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw player
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);

        // Draw enemies
        enemies.forEach((enemy) => {
          ctx.fillStyle = enemy.color;
          ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        });
      }

      // Game loop
      function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
      }

      // Initialize game
      function init() {
        for (let i = 0; i < 5; i++) createEnemy();
        gameLoop();
      }

      init();
