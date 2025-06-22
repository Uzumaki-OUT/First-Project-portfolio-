function startPong() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    // Game settings
    const PADDLE_WIDTH = 12;
    const PADDLE_HEIGHT = 80;
    const BALL_RADIUS = 10;
    const PLAYER_X = 20;
    const AI_X = canvas.width - 20 - PADDLE_WIDTH;
    const BALL_SPEED = 5;
    const AI_SPEED = 4;

    // Game state
    let playerY = (canvas.height - PADDLE_HEIGHT) / 2;
    let aiY = (canvas.height - PADDLE_HEIGHT) / 2;
    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: BALL_SPEED * (Math.random() > 0.5 ? 1 : -1),
        vy: BALL_SPEED * (Math.random() * 2 - 1)
    };
    let playerScore = 0;
    let aiScore = 0;

    // Mouse control for player paddle
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        playerY = mouseY - PADDLE_HEIGHT / 2;
        playerY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, playerY));
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dashed center line
        ctx.save();
        ctx.setLineDash([8, 12]);
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.restore();

        // Paddles
        ctx.fillStyle = "#fff";
        ctx.fillRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
        ctx.fillRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

        // Ball
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        // Scores
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.fillText(playerScore, canvas.width / 4, 50);
        ctx.fillText(aiScore, 3 * canvas.width / 4, 50);
    }

    function update() {
        // Ball movement
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
        if (ball.y - BALL_RADIUS < 0 || ball.y + BALL_RADIUS > canvas.height) {
            ball.vy *= -1;
        }

        // Player paddle collision
        if (
            ball.x - BALL_RADIUS < PLAYER_X + PADDLE_WIDTH &&
            ball.y > playerY &&
            ball.y < playerY + PADDLE_HEIGHT
        ) {
            ball.x = PLAYER_X + PADDLE_WIDTH + BALL_RADIUS;
            ball.vx *= -1;
            ball.vy += (ball.y - (playerY + PADDLE_HEIGHT / 2)) * 0.15;
        }

        // AI paddle collision
        if (
            ball.x + BALL_RADIUS > AI_X &&
            ball.y > aiY &&
            ball.y < aiY + PADDLE_HEIGHT
        ) {
            ball.x = AI_X - BALL_RADIUS;
            ball.vx *= -1;
            ball.vy += (ball.y - (aiY + PADDLE_HEIGHT / 2)) * 0.15;
        }

        // Scoring
        if (ball.x - BALL_RADIUS < 0) {
            aiScore++;
            resetBall(-1);
        } else if (ball.x + BALL_RADIUS > canvas.width) {
            playerScore++;
            resetBall(1);
        }

        // AI movement
        const aiCenter = aiY + PADDLE_HEIGHT / 2;
        if (aiCenter < ball.y - 10) {
            aiY += AI_SPEED;
        } else if (aiCenter > ball.y + 10) {
            aiY -= AI_SPEED;
        }
        aiY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, aiY));
    }

    function resetBall(direction) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.vx = BALL_SPEED * direction;
        ball.vy = BALL_SPEED * (Math.random() * 2 - 1);
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
}
