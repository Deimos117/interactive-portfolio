export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        
        // 씬에 객체 추가 및 물리 엔진 활성화
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // 플레이어 설정
        this.speed = 150; // 이동 속도
        
        // 기준점을 발밑(하단 중앙)으로 설정 (Isometric에서 깊이 정렬을 위해 필수)
        this.setOrigin(0.5, 1); 

        // WASD 키 입력 설정
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        // 매 프레임마다 속도를 0으로 초기화
        this.setVelocity(0);

        // 상하좌우 이동 (화면 기준 이동)
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(this.speed);
        }

        // 대각선 이동 시 속도가 빨라지는 현상 방지 (정규화)
        if (this.body.velocity.x !== 0 || this.body.velocity.y !== 0) {
            this.body.velocity.normalize().scale(this.speed);
        }

        // 깊이 정렬 (Y 좌표가 클수록 화면 아래쪽에 있으므로 더 나중에 그려져서 앞을 가리게 됨)
        this.setDepth(this.y);
    }
}
