# 반짝 수집장

찾고, 닦고, 모으는 동전·메달·뱃지 힐링 게임 (PWA)

## 배포 (GitHub Pages)

1. GitHub에 `banjjak` 레포를 만들고 이 폴더의 파일을 모두 올립니다. (`.nojekyll` 포함)
2. 레포 **Settings → Pages → Source**를 `Deploy from a branch`, 브랜치 `main`, 폴더 `/ (root)`로 지정합니다.
3. 잠시 후 `https://<아이디>.github.io/banjjak/` 에서 열립니다.
4. 휴대폰에서 열고 **홈 화면에 추가**하면 앱처럼 쓸 수 있습니다.

배포가 안 뜨면 Pages Source를 다른 값으로 바꿨다가 다시 `main`으로 돌려 보세요.

## 업데이트할 때

- `sw.js` 맨 위 `VERSION` 숫자를 올려야 사용자 기기에 새 버전이 내려갑니다.
- `index.html`의 `app.js?v=` 숫자도 같이 올리면 확실합니다.
- 새 버전은 앱을 한 번 닫았다 다시 열면 적용됩니다.

## 파일 구성

| 파일 | 내용 |
| --- | --- |
| `index.html` | 화면과 스타일 |
| `app.js` | 게임 코드 (번들) |
| `vendor/three.module.min.js` | 3D 라이브러리 three.js r170 (MIT, `vendor/THREE-LICENSE.txt`) |
| `vendor/jsm/environments/RoomEnvironment.js` | 금속 반사용 조명 환경 |
| `sw.js` | 오프라인 캐시 |
| `manifest.webmanifest`, `icons/` | 홈 화면 앱 정보와 아이콘 |

## 저장

- 수집 기록과 바구니는 기기 브라우저의 IndexedDB에 저장됩니다.
- 수집장 맨 아래 **기록 백업**에서 백업 파일을 저장하거나 불러올 수 있습니다. 기기를 바꿀 때 쓰세요.
- 테스트용 기능은 주소 끝에 `?debug`를 붙였을 때만 켜집니다.
