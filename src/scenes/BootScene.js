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
        
        // =========================================================
        // [추후 수정 포인트] 진짜 캐릭터 이미지(png, gif)로 교체할 때 사용하는 곳
        // =========================================================
        // 실제 에셋이 준비되면 아래와 같이 코드를 수정하세요:
        // this.load.image('player-temp', 'assets/sprites/player.png');
        // 혹은 스프라이트 시트(애니메이션용)인 경우:
        // this.load.spritesheet('player-temp', 'assets/sprites/player_sheet.png', { frameWidth: 32, frameHeight: 32 });
        
        // 현재는 임시 흰색 사각형 캐릭터 텍스처 생성 (가로 20, 세로 40)
        graphics.clear();
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 20, 40);
        graphics.lineStyle(1, 0x000000, 1);
        graphics.strokeRect(0, 0, 20, 40);
        graphics.generateTexture('player-temp', 20, 40);
        
        graphics.destroy(); // 그래픽 객체는 사용 후 삭제
    }

    create() {
        console.log('BootScene: starting ExteriorScene');
        // 에셋 로드가 끝나면 실제 외부 맵 씬으로 이동
        this.scene.start('ExteriorScene');
    }
}
