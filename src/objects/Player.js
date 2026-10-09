export class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture) {
        super(scene, x, y);
        
        // 1. 스프라이트 객체를 컨테이너 내부에 생성 (점프 시 이 스프라이트만 위아래로 움직임)
        this.sprite = scene.add.sprite(0, 0, texture);
        this.sprite.setOrigin(0.5, 1); // 발끝 기준 정렬
        this.add(this.sprite);

        // 2. 씬에 컨테이너 추가 및 물리 엔진 활성화
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // 3. 물리 충돌 히트박스(Body) 설정
        // 히트박스는 캐릭터의 발밑에 위치하도록 설정 (벽이나 건물과의 충돌용)
        this.body.setSize(32, 16); 
        this.body.setOffset(-16, -16); 

        // 4. 플레이어 설정
        this.speed = 200; // 맵이 커졌으므로 속도 증가
        this.isJumping = false;
        this.jumpVelocity = 0;

        // 5. WASD 및 Space(점프) 키 입력 설정
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });
    }

    update() {
        // === 1. 이동(WASD) 로직 ===
        this.body.setVelocity(0);

        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }

        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.body.setVelocityY(this.speed);
        }

        // 대각선 이동 시 정규화
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.body.velocity.normalize().scale(this.speed);
        }

        // === 2. 점프(Space) 로직 ===
        // Space를 눌렀고, 현재 점프 중이 아닐 때
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && !this.isJumping) {
            this.isJumping = true;
            this.jumpVelocity = -12; // 위로 튀어오르는 속도
        }

        // 점프 진행 중일 때 (Z축 시뮬레이션)
        if (this.isJumping) {
            this.sprite.y += this.jumpVelocity;
            this.jumpVelocity += 0.8; // 중력 적용 (점점 아래로 떨어짐)

            // 원래 위치(바닥)에 닿으면 점프 종료
            if (this.sprite.y >= 0) {
                this.sprite.y = 0;
                this.isJumping = false;
                this.jumpVelocity = 0;
            }
        }

        // === 3. 깊이 정렬 (Y축 기준) ===
        // 컨테이너 전체의 깊이를 설정하여 건물/벽과 겹칠 때 자연스럽게 보이도록 함
        this.setDepth(this.y);
    }
}
