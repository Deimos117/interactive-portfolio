export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        console.log('BootScene: preloading assets...');
        
        // 그래픽 객체를 사용해 임시 Isometric 바닥 타일 생성 (64x32 픽셀)
        const graphics = this.add.graphics();
        graphics.fillStyle(0xcccccc, 1); // 흑백 테마에 맞춰 회색 바닥
        graphics.lineStyle(1, 0x000000, 1); // 검은색 테두리
        
        // 다이아몬드 형태 그리기 (Isometric)
        graphics.beginPath();
        graphics.moveTo(32, 0);   // 상단 점
        graphics.lineTo(64, 16);  // 우측 점
        graphics.lineTo(32, 32);  // 하단 점
        graphics.lineTo(0, 16);   // 좌측 점
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();

        // 그린 형태를 'iso-tile' 이라는 텍스처(이미지)로 메모리에 저장
        graphics.generateTexture('iso-tile', 64, 32);
        graphics.destroy(); // 그래픽 객체는 사용 후 삭제

        // ---------------------------------------------------------
        // 임시 플레이어 캐릭터 그래픽 생성 (32x64 크기의 흰색 사각형)
        // [조건 반영] 프로토타입 이후 PNG 모델로 대체 가능하도록 작성
        // TODO: 추후 그래픽이 준비되면 아래 코드들을 삭제하고 다음 코드로 대체합니다:
        // this.load.image('player-placeholder', 'assets/sprites/player.png');
        // ---------------------------------------------------------
        const playerGraphics = this.add.graphics();
        playerGraphics.fillStyle(0xffffff, 1); // 흰색 캐릭터
        playerGraphics.lineStyle(1, 0x000000, 1); // 검은색 테두리
        playerGraphics.fillRect(0, 0, 32, 64);
        playerGraphics.strokeRect(0, 0, 32, 64);
        playerGraphics.generateTexture('player-placeholder', 32, 64);
        playerGraphics.destroy();
    }

    create() {
        console.log('BootScene: starting ExteriorScene');
        // 에셋 로드가 끝나면 실제 외부 맵 씬으로 이동
        this.scene.start('ExteriorScene');
    }
}
