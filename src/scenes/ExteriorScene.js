import { Player } from '../objects/Player.js';

export class ExteriorScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ExteriorScene' });
        
        // 아이소메트릭 타일의 실제 픽셀 크기
        this.tileWidth = 64;
        this.tileHeight = 32;
    }

    create() {
        console.log('ExteriorScene: created');
        
        // 카메라 배경색 (다크 그레이)
        this.cameras.main.setBackgroundColor('#1a1a1a');

        // 안내 문구
        this.add.text(400, 50, 'Exterior Isometric Map (Prototype)', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'Courier'
        }).setOrigin(0.5);

        // 10x10 크기의 맵 데이터 (0: 빈 공간, 1: 일반 바닥, 2: 시네마 위치, 3: 상점 위치)
        const mapData = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 2, 2, 1, 1, 3, 3, 1, 1],
            [1, 1, 2, 2, 1, 1, 3, 3, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];

        // 맵이 화면 중앙에 오도록 시작점(Origin) 위치 조정
        const startX = 400;
        const startY = 150;

        // 2중 반복문으로 맵 데이터를 읽어와서 타일을 배치
        for (let y = 0; y < mapData.length; y++) {
            for (let x = 0; x < mapData[y].length; x++) {
                const tileType = mapData[y][x];
                if (tileType === 0) continue; // 0이면 그리지 않음

                // 카테시안(2D 격자) 좌표를 아이소메트릭 좌표로 변환하는 공식
                const isoX = startX + (x - y) * (this.tileWidth / 2);
                const isoY = startY + (x + y) * (this.tileHeight / 2);

                // 계산된 위치에 타일 이미지 추가
                const tile = this.add.image(isoX, isoY, 'iso-tile');
                
                // Y-sorting: 아이소메트릭은 화면상 아래쪽(y가 큰 값)에 있는 오브젝트가 나중에 그려져야 겹침 현상이 자연스러움
                tile.setDepth(isoY); 
                
                // 타일 종류에 따라 색상(Tint) 적용 - 흑백 테마
                if (tileType === 2) {
                    tile.setTint(0x555555); // 시네마 바닥 영역 (진한 회색)
                } else if (tileType === 3) {
                    tile.setTint(0x888888); // 상점 바닥 영역 (중간 회색)
                }
            }
        }
        // 맵의 전체 크기를 계산 (카메라가 맵 밖을 비추지 않도록 제한하기 위해)
        const mapWidth = mapData[0].length * this.tileWidth;
        const mapHeight = mapData.length * this.tileHeight;

        // 플레이어 캐릭터 생성 (시작 위치: 400, 200)
        // 나중에 'player-temp' 대신 실제 에셋 이름('player_idle' 등)으로 교체하면 됩니다.
        this.player = new Player(this, 400, 200, 'player-temp');

        // 카메라 설정: 캐릭터를 따라다니도록 (Follow Camera)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        
        // 카메라 이동 제한 (선택 사항: 현재는 맵 밖으로 너무 멀리 가지 않게 임의 설정)
        // this.cameras.main.setBounds(0, 0, 1000, 800);
    }

    update() {
        // 게임 루프 로직 (캐릭터 이동 시 프레임마다 실행됨)
        if (this.player) {
            this.player.update();
        }
    }
}
