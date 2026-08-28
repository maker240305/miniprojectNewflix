-- 실제 작품 정보를 바탕으로 한 개발용 초기 데이터입니다.
INSERT INTO movies (title, content_type, release_year, age_rating, duration_text, description, genre, cast_members, trailer_url, poster_url) VALUES
('오징어 게임', 'drama', 2021, '청소년 관람불가', '3시즌', '막대한 빚을 진 참가자들이 거액의 상금을 위해 목숨이 걸린 어린이 게임에 초대된다.', '한국 드라마, 스릴러, 서바이벌', '이정재, 이병헌, 임시완, 강하늘, 위하준', 'https://www.youtube.com/watch?v=oqxAJKy0ii4', 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg'),
('웬즈데이', 'drama', 2022, '15세 이상 관람가', '2시즌', '냉소적이고 영리한 웬즈데이 아담스가 네버모어 아카데미에서 기이한 미스터리를 추적한다.', '판타지, 미스터리, 코미디', '제나 오르테가, 에마 마이어스, 캐서린 제타존스', 'https://www.youtube.com/watch?v=Q73UhUTs6y0', 'https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg'),
('더 글로리', 'drama', 2022, '청소년 관람불가', '16부작', '학창 시절 폭력을 겪은 한 여성이 오랜 시간 준비한 복수를 시작한다.', '한국 드라마, 복수극, 스릴러', '송혜교, 이도현, 임지연, 염혜란', 'https://www.youtube.com/watch?v=tqVVrTvrI8U', 'https://www.kinonews.ru/insimgs/2023/poster/poster114584_12.jpg'),
('기묘한 이야기', 'drama', 2016, '15세 이상 관람가', '5시즌', '인디애나의 작은 마을에서 한 소년이 사라지고, 친구들과 가족이 낯선 초자연적 비밀을 마주한다.', 'SF, 공포, 청춘 드라마', '밀리 바비 브라운, 핀 울프하드, 노아 슈냅', 'https://www.youtube.com/watch?v=yQEondeGvKo', 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg'),
('익스트랙션', 'movie', 2020, '청소년 관람불가', '1시간 56분', '방글라데시에서 납치된 마약왕의 아들을 구출해야 하는 용병의 위험한 임무를 그린 액션 스릴러.', '액션, 스릴러', '크리스 헴스워스, 루드락시 자이스왈, 랜디프 후다', 'https://www.youtube.com/watch?v=L6P3nI6VnlY', 'https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg'),
('올드 가드', 'movie', 2020, '청소년 관람불가', '2시간 5분', '수 세기 동안 인류를 지켜 온 불멸의 전사들이 새 불멸자를 발견한 뒤 정체를 노리는 세력과 맞선다.', '액션, 판타지, 슈퍼히어로', '샤를리즈 테론, 키키 레인, 마르완 켄자리', 'https://www.youtube.com/watch?v=aK-X2d0lJ_s', 'https://image.tmdb.org/t/p/w500/7H0kcYaOumzjnSord0WTvazLMgI.jpg');

UPDATE movies SET background_url = CASE title
  WHEN '오징어 게임' THEN 'https://static.euronews.com/articles/stories/06/21/45/70/1440x810_cmsv2_6fb465a9-2879-5bb3-a87c-d5d757abc5cc-6214570.jpg'
  WHEN '웬즈데이' THEN 'https://image.tmdb.org/t/p/w1280/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg'
  WHEN '더 글로리' THEN 'https://occ-0-8407-92.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZCA9EjZUqUh6rsyXDVHZeKQ4l3n262l7ZzOAalC4IxT5qq6skdMs6k0v__NK7phHfbLqb30QNeHy_mOVYO-KVh738EExqlCuCNq429trB9UVgyQxHZMUCzLzw.jpg?r=d08'
  WHEN '기묘한 이야기' THEN 'https://images.hdqwalls.com/download/stranger-things-season-2-xe-2560x1080.jpg'
  WHEN '익스트랙션' THEN 'https://cdn.mos.cms.futurecdn.net/pKBvGiUXgq4siWXM9DpbLc-1024-80.jpg'
  WHEN '올드 가드' THEN 'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2020/07/08/Pictures/the-old-guard_51092744-c11e-11ea-b246-8f7a5e10b5dd.jpg'
END
WHERE title IN ('오징어 게임', '웬즈데이', '더 글로리', '기묘한 이야기', '익스트랙션', '올드 가드');

INSERT INTO reviews (movie_id, rating, comment) VALUES
(1, 5, '게임의 긴장감과 인물들의 선택이 끝까지 몰입감을 줍니다.'),
(1, 4, '사회 풍자가 인상적인 작품입니다.'),
(1, 5, '다음 이야기도 단숨에 보고 싶어집니다.'),
(2, 5, '웬즈데이 특유의 분위기와 미스터리가 잘 어울립니다.'),
(2, 4, '배우들의 개성이 뚜렷해서 재미있게 봤어요.'),
(3, 5, '감정선이 촘촘해서 몰입하기 좋았습니다.'),
(3, 4, '배우들의 연기가 특히 강렬합니다.'),
(4, 5, '80년대 분위기와 SF 미스터리의 조합이 매력적입니다.'),
(4, 4, '시즌마다 새로운 전개를 보여줘서 좋습니다.'),
(5, 4, '추격 장면이 시원하고 속도감 있습니다.'),
(5, 3, '액션을 좋아한다면 가볍게 보기 좋습니다.'),
(6, 4, '불멸이라는 소재를 액션으로 잘 풀어냈습니다.'),
(6, 5, '팀원들의 서사가 다음 이야기를 기대하게 합니다.');
