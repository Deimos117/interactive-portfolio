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
    }

    create() {
        console.log('BootScene: starting ExteriorScene');
        // 에셋 로드가 끝나면 실제 외부 맵 씬으로 이동
        this.scene.start('ExteriorScene');
    }
}
