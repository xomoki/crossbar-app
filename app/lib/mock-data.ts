export interface User {
  id: string;
  name: string;
  role: 'Executive' | 'Employee';
  status: 'Drink' | 'Career' | 'Work' | 'Chat' | 'Ghost';
  tags: string[];
  isRecommended?: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Match {
  id: string;
  userId: string; // 相手のID
  userName: string;
  lastMessage?: string;
  expiresAt: Date;
  messages: Message[];
}

// 恵比寿駅周辺のダミーデータ (Lat: 35.6467, Lng: 139.7101)
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Kenji Sato',
    role: 'Executive',
    status: 'Drink',
    tags: ['#M&A', '#Wine', '#Startup'],
    isRecommended: true,
    location: { lat: 35.6475, lng: 139.7115 }
  },
  {
    id: '2',
    name: 'Misaki Tanaka',
    role: 'Employee',
    status: 'Career',
    tags: ['#Career', '#Sales', '#Coffee'],
    location: { lat: 35.6460, lng: 139.7120 }
  },
  {
    id: '3',
    name: 'Taro Yamada',
    role: 'Executive',
    status: 'Work',
    tags: ['#SaaS', '#Investment'],
    location: { lat: 35.6485, lng: 139.7090 }
  },
  {
    id: '4',
    name: 'Hanako Suzuki',
    role: 'Employee',
    status: 'Chat',
    tags: ['#Marketing', '#Gourmet'],
    isRecommended: true,
    location: { lat: 35.6455, lng: 139.7085 }
  }
];

// 24時間後の期限を設定するためのヘルパー
const getExpiry = (hours: number) => {
  const d = new Date();
  d.setHours(d.getHours() + hours);
  return d;
};

export const mockMatches: Match[] = [
  {
    id: 'm1',
    userId: '1',
    userName: 'Kenji Sato',
    lastMessage: '恵比寿横丁の入り口にいます！',
    expiresAt: getExpiry(18), // 18時間後に削除
    messages: [
      { id: '1', senderId: '1', text: 'マッチありがとうございます！', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
      { id: '2', senderId: 'me', text: 'こちらこそ！今どちらですか？', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
      { id: '3', senderId: '1', text: '恵比寿横丁の入り口にいます！', timestamp: new Date(Date.now() - 1000 * 60 * 20) },
    ]
  },
  {
    id: 'm2',
    userId: '4',
    userName: 'Hanako Suzuki',
    lastMessage: '承知しました、向かいます！',
    expiresAt: getExpiry(2), // 2時間後に削除（もうすぐ消える）
    messages: [
      { id: '1', senderId: '4', text: 'はじめまして！', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
    ]
  }
];

export const statusConfig = {
  Drink: { label: '一杯飲も', icon: '🍸', color: 'bg-teal-500' },
  Career: { label: 'キャリア相談', icon: '👂', color: 'bg-pink-500' },
  Work: { label: '仕事相談', icon: '🤝', color: 'bg-amber-500' },
  Chat: { label: '雑談', icon: '💬', color: 'bg-blue-500' },
  Ghost: { label: '非表示', icon: '🚫', color: 'bg-slate-700' },
};
