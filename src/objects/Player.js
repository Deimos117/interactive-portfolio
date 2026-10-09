export class Player extends Phaser.Physics.Arcade.Sprite {
    // textureKey 파라미터를 통해 텍스처를 동적으로 받습니다. (나중에 png/gif 이름으로 쉽게 교체 가능)
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        
        // 씬에 플레이어 추가 및 물리 엔진 활성화
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // 플레이어 이동 속도
        this.speed = 150;

        // WASD 키 입력 바인딩
        this.keys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        
        // 기준점을 발 밑으로 설정 (아이소메트릭 Y-sorting을 정확하게 하기 위함)
        this.setOrigin(0.5, 1);
    }

    update() {
        let velocityX = 0;
        let velocityY = 0;

        // 화면 기준 직관적인 상하좌우 이동 (W: 위, S: 아래, A: 왼쪽, D: 오른쪽)
        if (this.keys.up.isDown) {
            velocityY -= 1;
        }
        if (this.keys.down.isDown) {
            velocityY += 1;
        }
        if (this.keys.left.isDown) {
            velocityX -= 1;
        }
        if (this.keys.right.isDown) {
            velocityX += 1;
        }

        // 대각선 이동 시 속도가 1.4배 빨라지는 것 방지 (정규화)
        if (velocityX !== 0 && velocityY !== 0) {
            const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
            velocityX /= length;
            velocityY /= length;
        }

        // 속도 적용
        this.setVelocity(velocityX * this.speed, velocityY * this.speed);
        
        // 플레이어의 Y축 위치에 따라 Depth를 실시간으로 업데이트 (건물 앞/뒤 가림 처리)
        // Y값이 클수록(화면 아래쪽) 나중에 렌더링되어 앞에 보임
        this.setDepth(this.y);
    }
}
