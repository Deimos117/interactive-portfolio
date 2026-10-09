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

        // 안내 문구 (UI 텍스트이므로 카메라 이동에 영향받지 않게 고정)
        this.add.text(400, 50, 'Exterior Isometric Map (Extended + Collision + Jump)', {
            fontSize: '20px',
            fill: '#ffffff',
            fontFamily: 'Courier'
        }).setOrigin(0.5).setScrollFactor(0);

        // 충돌체(벽, 건물)를 저장할 배열
        this.wallBodies = [];

        // 40x40 크기의 확장된 맵 데이터 생성
        const mapSize = 40;
        const mapData = [];
        
        for (let y = 0; y < mapSize; y++) {
            const row = [];
            for (let x = 0; x < mapSize; x++) {
                // 외곽 테두리는 맵 경계선(4)으로 설정
                if (x === 0 || x === mapSize - 1 || y === 0 || y === mapSize - 1) {
                    row.push(4); 
                } else {
                    row.push(1); // 일반 바닥
                }
            }
            mapData.push(row);
        }

        // 시네마(2)와 상점(3) 배치 (맵 내 특정 영역을 지정)
        // 시네마 구역 생성
        for(let i = 15; i < 18; i++) {
            for(let j = 10; j < 13; j++) {
                mapData[i][j] = 2;
            }
        }
        
        // 상점 구역 생성
        for(let i = 25; i < 28; i++) {
            for(let j = 25; j < 28; j++) {
                mapData[i][j] = 3;
            }
        }

        // 맵 시작 지점 (전체 맵이 거대하므로 카메라 중심을 위해 기준점 임의 지정)
        const startX = 400;
        const startY = -400;

        // 맵 타일 렌더링 및 충돌체 생성
        for (let y = 0; y < mapData.length; y++) {
            for (let x = 0; x < mapData[y].length; x++) {
                const tileType = mapData[y][x];
                if (tileType === 0) continue;

                // 카테시안 -> 아이소메트릭 좌표 변환
                const isoX = startX + (x - y) * (this.tileWidth / 2);
                const isoY = startY + (x + y) * (this.tileHeight / 2);

                const tile = this.add.image(isoX, isoY, 'iso-tile');
                tile.setDepth(isoY); // 깊이 정렬
                
                // 타일 종류별 색상 및 충돌체(투명 박스) 적용
                if (tileType === 4 || tileType === 2 || tileType === 3) {
                    if (tileType === 4) tile.setTint(0x333333); // 경계선 벽 (어두운 회색)
                    else if (tileType === 2) tile.setTint(0x555555); // 시네마
                    else if (tileType === 3) tile.setTint(0x888888); // 상점
                    
                    // 보이지 않는 물리 충돌체 생성 (타일 크기보다 약간 작게 하여 모서리 걸림 방지)
                    const wallBlock = this.add.rectangle(isoX, isoY, 32, 16, 0x000000, 0); 
                    this.physics.add.existing(wallBlock, true); // true = 정적(Static) 객체
                    this.wallBodies.push(wallBlock);
                }
            }
        }

        // 플레이어 캐릭터 생성 (맵 중앙인 x:20, y:20 좌표로 계산)
        const playerStartX = startX + (20 - 20) * (this.tileWidth / 2);
        const playerStartY = startY + (20 + 20) * (this.tileHeight / 2);
        
        this.player = new Player(this, playerStartX, playerStartY, 'player-placeholder');

        // 플레이어와 벽(건물, 테두리)의 물리 충돌 처리 등록
        this.physics.add.collider(this.player, this.wallBodies);

        // 카메라가 플레이어를 부드럽게 따라다니도록 설정
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update() {
        // 플레이어 동작 업데이트
        if (this.player) {
            this.player.update();
        }
    }
}
