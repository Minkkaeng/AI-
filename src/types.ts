export type Place = {
  id: number;
  name: string;
  category: string;
  distance: string;
  rating: number;
  description: string;
  image: string;
};

export const MOCK_PLACES: Place[] = [
  {
    id: 1,
    name: '경복궁 (Gyeongbokgung)',
    category: '문화재 / 사적',
    distance: '350m',
    rating: 4.8,
    description: '조선 왕조의 법궁으로, 한국의 전통 건축미를 느낄 수 있는 대표적인 명소입니다.',
    image: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 2,
    name: '북촌 한옥마을',
    category: '전통마을',
    distance: '1.2km',
    rating: 4.6,
    description: '전통 한옥이 밀집되어 있는 서울의 대표적인 전통 거주 지역입니다.',
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&q=80&w=1000',
  }
];
