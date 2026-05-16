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

export type Region = {
  id: string;
  name: string;
  spots: Place[];
};

export const MOCK_PLACES: Place[] = [
  {
    id: 1,
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
  },
  {
    id: 101,
    name: '덕수궁',
    nameEn: 'Deoksugung Palace',
    category: '문화재 / 사적',
    distance: '1.5km',
    rating: 4.7,
    reviewCount: 890,
    description: '전통 목조건축과 서양식 석조 건물이 공존하는 독특한 아름다움의 궁궐입니다.',
    historyText: '대한제국의 황궁으로 사용되었으며, 석조전과 같은 서양식 건물이 있어 이색적인 분위기를 자아냅니다.',
    image: 'gyeongbokgung.png', // Placeholder
    gallery: ['gyeongbokgung.png'],
    amenities: [{ icon: '♿', label: '접근 가능', available: true }],
    hours: '09:00 - 21:00',
    fee: '1,000원',
    docentScript: [{ time: '00:00', text: '덕수궁에 오신 것을 환영합니다.' }]
  },
  {
    id: 102,
    name: '창덕궁',
    nameEn: 'Changdeokgung Palace',
    category: '유네스코 세계유산',
    distance: '800m',
    rating: 4.9,
    reviewCount: 1560,
    description: '자연과 조화를 이룬 한국 최고의 정원, 후원이 있는 궁궐입니다.',
    historyText: '유네스코 세계문화유산으로 지정된 창덕궁은 가장 한국적인 궁궐로 평가받습니다.',
    image: 'hanok.png', // Placeholder
    gallery: ['hanok.png'],
    amenities: [{ icon: '♿', label: '접근 가능', available: true }],
    hours: '09:00 - 18:00',
    fee: '3,000원',
    docentScript: [{ time: '00:00', text: '창덕궁 후원의 미를 경험해보세요.' }]
  }
];

export const MOCK_REGIONS: Region[] = [
  {
    id: 'seoul',
    name: '서울',
    spots: [MOCK_PLACES[0], MOCK_PLACES[1], MOCK_PLACES[2]]
  }
];
