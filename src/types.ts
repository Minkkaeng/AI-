export type Place = {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  distance: string;
  rating: number;
  reviewCount: number;
  description: string;
  historyText: string;
  image: string;
  gallery: string[];
  amenities: {
    icon: string;
    label: string;
    available: boolean;
  }[];
  hours: string;
  fee: string;
  docentScript: {
    time: string;
    text: string;
  }[];
};

export type SubRegion = {
  id: string;
  name: string;
  description: string;
  spots: Place[];
};

export type Region = {
  id: string;
  name: string;
  description: string;
  subRegions: SubRegion[];
};

export const MOCK_PLACES: Place[] = [
  {
    id: 1,
    name: '수원화성',
    nameEn: 'Suwon Hwaseong Fortress',
    category: '세계문화유산 · 조선성곽',
    distance: '200m',
    rating: 4.9,
    reviewCount: 3450,
    description: '조선 후기 실학의 결정체로 불리는 계획도시이자 뛰어난 방어 기능을 갖춘 성곽입니다.',
    historyText: '정조대왕이 아버지 사도세자의 능을 수원으로 옮기며 축조한 성곽으로, 과학적인 설계가 돋보입니다.',
    image: 'gyeongbokgung.png', // Placeholder
    gallery: ['gyeongbokgung.png', 'hanok.png'],
    amenities: [
      { icon: '♿', label: '일부 구간 휠체어 가능', available: true },
      { icon: '🚻', label: '장애인 화장실', available: true },
    ],
    hours: '09:00 - 18:00 (야간개장 시 21:00)',
    fee: '1,000원',
    docentScript: [
      { time: '00:00', text: '수원화성에 오신 것을 환영합니다.' },
    ]
  },
  {
    id: 2,
    name: '화성행궁',
    nameEn: 'Hwaseong Haenggung',
    category: '문화재 / 사적',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 1290,
    description: '임금이 궁궐을 벗어나 머물던 행궁 중 가장 규모가 크고 아름다운 곳입니다.',
    historyText: '정조가 원행 때마다 머물렀던 곳으로, 다양한 전통 체험과 행사가 열립니다.',
    image: 'hanok.png', // Placeholder
    gallery: ['hanok.png'],
    amenities: [{ icon: '♿', label: '접근 가능', available: true }],
    hours: '09:00 - 18:00',
    fee: '1,500원',
    docentScript: [{ time: '00:00', text: '화성행궁의 아름다움을 감상해보세요.' }]
  },
  {
    id: 3,
    name: '경복궁',
    nameEn: 'Gyeongbokgung Palace',
    category: '문화재 / 사적',
    distance: '350m',
    rating: 4.9,
    reviewCount: 2450,
    description: '조선 왕조의 법궁으로, 한국의 전통 건축미를 느낄 수 있는 대표적인 명소입니다.',
    historyText: '1395년에 창건된 경복궁은 조선의 5대 궁궐 중 가장 규모가 크고 중심이 되는 법궁입니다.',
    image: 'gyeongbokgung.png',
    gallery: ['gyeongbokgung.png', 'hanok.png'],
    amenities: [
      { icon: '♿', label: '휠체어 대여 가능', available: true },
      { icon: '🛗', label: '엘리베이터 운영', available: true },
      { icon: '🚻', label: '장애인 화장실', available: true },
    ],
    hours: '09:00 - 18:00',
    fee: '3,000원',
    docentScript: [
      { time: '00:00', text: '안녕하세요. 너울 AI 도슨트입니다. 경복궁 투어를 시작합니다.' },
    ]
  }
];

export const MOCK_REGIONS: Region[] = [
  {
    id: 'gyeonggi',
    name: '경기도',
    description: '조선문화 · 민속체험',
    subRegions: [
      {
        id: 'suwon',
        name: '수원',
        description: '전통성곽, 왕실문화',
        spots: [MOCK_PLACES[0], MOCK_PLACES[1]]
      },
      {
        id: 'yongin',
        name: '용인',
        description: '한국민속촌, 민속체험',
        spots: []
      },
      {
        id: 'paju',
        name: '파주',
        description: '전통가옥, 유교문화',
        spots: []
      }
    ]
  },
  {
    id: 'seoul',
    name: '서울',
    description: '궁궐문화 · 한옥문화',
    subRegions: [
      {
        id: 'jongno',
        name: '종로/중구',
        description: '조선 왕실문화의 중심',
        spots: [MOCK_PLACES[2]]
      }
    ]
  }
];
