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

export const MOCK_PLACES: Place[] = [
  {
    id: 1,
    name: '경복궁',
    nameEn: 'Gyeongbokgung Palace',
    category: '문화재 / 사적',
    distance: '350m',
    rating: 4.9,
    reviewCount: 2450,
    description: '조선 왕조의 법궁으로, 한국의 전통 건축미를 느낄 수 있는 대표적인 명소입니다. 태조 이성계에 의해 창건된 이후 조선의 역사를 함께해온 가장 웅장한 궁궐입니다.',
    historyText: '1395년에 창건된 경복궁은 조선의 5대 궁궐 중 가장 규모가 크고 중심이 되는 법궁입니다. 임진왜란 때 소실되었다가 흥선대원군에 의해 중건되었으며, 현재는 한국을 대표하는 문화유산으로 자리매김하고 있습니다.',
    image: 'gyeongbokgung.png',
    gallery: ['gyeongbokgung.png', 'hanok.png'],
    amenities: [
      { icon: '♿', label: '휠체어 대여 가능', available: true },
      { icon: '🛗', label: '엘리베이터 운영', available: true },
      { icon: '🚻', label: '장애인 화장실', available: true },
      { icon: '🔊', label: '음성 가이드기 대여', available: true },
      { icon: '🅿️', label: '전용 주차장', available: true },
    ],
    hours: '매일 09:00 - 18:00 (화요일 휴궁)',
    fee: '성인 3,000원 / 소인 1,500원',
    docentScript: [
      { time: '00:00', text: '안녕하세요. 너울 AI 도슨트입니다. 지금부터 경복궁 근정전 투어를 시작합니다.' },
      { time: '00:15', text: '근정전은 경복궁의 중심 건물로, 임금님이 신하들과 정사를 논하고 국가 의식을 치르던 곳입니다.' },
      { time: '00:30', text: '지금 발 아래를 보시면 거칠게 깎인 돌들이 깔려있죠? 이를 박석이라고 합니다.' },
      { time: '00:45', text: '햇빛의 반사를 막고, 비가 올 때 물이 잘 빠지도록 설계된 조상들의 지혜가 담겨 있습니다.' },
    ]
  },
  {
    id: 2,
    name: '북촌 한옥마을',
    nameEn: 'Bukchon Hanok Village',
    category: '전통마을 / 관광지',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 1820,
    description: '경복궁과 창덕궁, 종묘 사이에 위치한 서울의 대표적인 전통 거주지입니다. 조선시대 고위 관료들이 살던 지역으로 현재까지도 주민들이 거주하며 한옥의 명맥을 잇고 있습니다.',
    historyText: '북촌이라는 이름은 청계천과 종로의 북쪽 동네라는 뜻에서 유래되었습니다. 실제 사람들이 거주하는 공간인 만큼 고즈넉한 분위기와 한국의 주거 문화를 동시에 경험할 수 있는 소중한 장소입니다.',
    image: 'hanok.png',
    gallery: ['hanok.png', 'gyeongbokgung.png'],
    amenities: [
      { icon: '♿', label: '경사로 설치', available: false },
      { icon: '🚻', label: '공공 화장실', available: true },
      { icon: 'ℹ️', label: '안내소 운영', available: true },
      { icon: '☕', label: '전통 찻집', available: true },
    ],
    hours: '매일 09:00 - 17:00 (일부 구역 거주자 보호)',
    fee: '입장료 무료 (박물관 등 별도)',
    docentScript: [
      { time: '00:00', text: '고즈넉한 한옥의 정취가 느껴지는 북촌 한옥마을에 오신 것을 환영합니다.' },
      { time: '00:10', text: '이곳은 실제 주민분들이 거주하고 계시는 공간이니, 목소리를 낮춰주시는 배려가 필요합니다.' },
      { time: '00:25', text: '한옥의 지붕 곡선을 보세요. 주변 능선과 어우러지는 자연스러운 곡선미가 일품입니다.' },
    ]
  }
];
