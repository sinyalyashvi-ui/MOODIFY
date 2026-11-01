import { motion } from 'framer-motion';
import {
  Bell,
  ChevronRight,
  CreditCard,
  Download,
  Flame,
  Headphones,
  Heart,
  House,
  Languages,
  ListMusic,
  Mic,
  Moon,
  Pause,
  Play,
  Search,
  Settings,
  ShieldCheck,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  SunMedium,
  UserCircle2,
  Volume2,
  Wand2,
  Wifi,
  CircleHelp,
  Camera,
} from 'lucide-react';
import { useMemo, useState } from 'react';

type MoodKey =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'relaxed'
  | 'romantic'
  | 'confident'
  | 'sleepy'
  | 'excited'
  | 'loved'
  | 'lonely'
  | 'thoughtful'
  | 'energetic';

type ThemeName = 'dark' | 'light' | 'midnight';

type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  mood: MoodKey;
  color: string;
};

type NavigationItem = {
  key: string;
  label: string;
  icon: typeof House;
  href: string;
};

const moodMeta: Record<
  MoodKey,
  { label: string; emoji: string; description: string; color: string; playlist: string; vibe: string }
> = {
  happy: {
    label: 'Happy',
    emoji: '😊',
    description: 'Sunrise energy and feel-good moments',
    color: '#fbbf24',
    playlist: 'Happy Vibes',
    vibe: 'Playful, bright and uplifting'
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    description: 'Gentle, reflective and comforting music',
    color: '#60a5fa',
    playlist: 'Sad Hours',
    vibe: 'Soft, emotional and soothing'
  },
  angry: {
    label: 'Angry',
    emoji: '😡',
    description: 'High-impact tracks to release the tension',
    color: '#f87171',
    playlist: 'Angry Mode',
    vibe: 'Heavy, bold and electrifying'
  },
  relaxed: {
    label: 'Relaxed',
    emoji: '😌',
    description: 'Smooth and easygoing soundtracks',
    color: '#22c55e',
    playlist: 'Peaceful Mind',
    vibe: 'Calm, smooth and airy'
  },
  romantic: {
    label: 'Romantic',
    emoji: '❤️',
    description: 'Sweet and intimate melodies',
    color: '#fb7185',
    playlist: 'Romantic Nights',
    vibe: 'Warm, intimate and dreamy'
  },
  confident: {
    label: 'Confident',
    emoji: '😎',
    description: 'Power-packed songs with swagger',
    color: '#a78bfa',
    playlist: 'Power Drive',
    vibe: 'Champion energy and rhythm'
  },
  sleepy: {
    label: 'Sleepy',
    emoji: '😴',
    description: 'Slow, dreamy soundscapes',
    color: '#94a3b8',
    playlist: 'Sleep Mode',
    vibe: 'Quiet, dreamy and mellow'
  },
  excited: {
    label: 'Excited',
    emoji: '🤩',
    description: 'Big hooks and exciting pulses',
    color: '#f97316',
    playlist: 'Party Mode',
    vibe: 'Electric and full of momentum'
  },
  loved: {
    label: 'Loved',
    emoji: '🥰',
    description: 'Heartfelt tunes for treasured moments',
    color: '#f472b6',
    playlist: 'Love Bloom',
    vibe: 'Tender, affectionate and joyful'
  },
  lonely: {
    label: 'Lonely',
    emoji: '😔',
    description: 'Reflective tracks for quiet nights',
    color: '#7dd3fc',
    playlist: 'Late Night Echo',
    vibe: 'Delicate and introspective'
  },
  thoughtful: {
    label: 'Thoughtful',
    emoji: '🤔',
    description: 'Focused, mellow and introspective',
    color: '#c084fc',
    playlist: 'Deep Thoughts',
    vibe: 'Curious and atmospheric'
  },
  energetic: {
    label: 'Energetic',
    emoji: '🔥',
    description: 'Workout-ready songs with a pulse',
    color: '#f43f5e',
    playlist: 'Workout Mode',
    vibe: 'High-drive and adrenaline-filled'
  }
};

const moodOrder: MoodKey[] = [
  'happy',
  'sad',
  'angry',
  'relaxed',
  'romantic',
  'confident',
  'sleepy',
  'excited',
  'loved',
  'lonely',
  'thoughtful',
  'energetic'
];

const songLibrary: Record<MoodKey, Song[]> = {
  happy: [
    { id: 1, title: 'Good as Hell', artist: 'Lizzo', album: 'Cuz I Love You', duration: '2:39', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', mood: 'happy', color: '#fbbf24' },
    { id: 2, title: 'Can’t Stop the Feeling!', artist: 'Justin Timberlake', album: 'Trolls', duration: '3:56', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80', mood: 'happy', color: '#fcd34d' },
    { id: 3, title: 'Walking on Sunshine', artist: 'Katrina & The Waves', album: 'Walking on Sunshine', duration: '3:59', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80', mood: 'happy', color: '#f59e0b' }
  ],
  sad: [
    { id: 4, title: 'Someone Like You', artist: 'Adele', album: '21', duration: '4:45', cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80', mood: 'sad', color: '#7dd3fc' },
    { id: 5, title: 'All I Want', artist: 'Kodaline', album: 'In a Perfect World', duration: '4:37', cover: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80', mood: 'sad', color: '#93c5fd' },
    { id: 6, title: 'River Flows in You', artist: 'Yiruma', album: 'River Flows in You', duration: '3:30', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80', mood: 'sad', color: '#60a5fa' }
  ],
  angry: [
    { id: 7, title: 'Eye of the Tiger', artist: 'Survivor', album: 'Eye of the Tiger', duration: '4:04', cover: 'https://images.unsplash.com/photo-1555157446-98e3c7f7f2d7?auto=format&fit=crop&w=600&q=80', mood: 'angry', color: '#f87171' },
    { id: 8, title: 'Believer', artist: 'Imagine Dragons', album: 'Evolve', duration: '3:24', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', mood: 'angry', color: '#fca5a5' },
    { id: 9, title: 'Break Stuff', artist: 'Limp Bizkit', album: 'Results May Vary', duration: '2:52', cover: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80', mood: 'angry', color: '#ef4444' }
  ],
  relaxed: [
    { id: 10, title: 'Weightless', artist: 'Marconi Union', album: 'Weightless', duration: '8:09', cover: 'https://images.unsplash.com/photo-1471478331149-c72f17e0e9d5?auto=format&fit=crop&w=600&q=80', mood: 'relaxed', color: '#34d399' },
    { id: 11, title: 'Breezeblocks', artist: 'alt-J', album: 'An Awesome Wave', duration: '3:47', cover: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=600&q=80', mood: 'relaxed', color: '#4ade80' },
    { id: 12, title: 'Dreams', artist: 'Fleetwood Mac', album: 'Rumours', duration: '4:32', cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80', mood: 'relaxed', color: '#2dd4bf' }
  ],
  romantic: [
    { id: 13, title: 'Perfect', artist: 'Ed Sheeran', album: '÷', duration: '4:23', cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80', mood: 'romantic', color: '#f472b6' },
    { id: 14, title: 'At Last', artist: 'Etta James', album: 'At Last!', duration: '3:03', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', mood: 'romantic', color: '#fb7185' },
    { id: 15, title: 'La Vie En Rose', artist: 'Louis Armstrong', album: 'Satchmo', duration: '3:05', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', mood: 'romantic', color: '#f9a8d4' }
  ],
  confident: [
    { id: 16, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', album: 'Uptown Special', duration: '4:30', cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=600&q=80', mood: 'confident', color: '#a78bfa' },
    { id: 17, title: 'Roar', artist: 'Katy Perry', album: 'Prism', duration: '3:42', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80', mood: 'confident', color: '#8b5cf6' },
    { id: 18, title: 'Titanium', artist: 'David Guetta ft. Sia', album: 'Nothing but the Beat', duration: '4:05', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', mood: 'confident', color: '#c084fc' }
  ],
  sleepy: [
    { id: 19, title: 'A Thousand Years', artist: 'Christina Perri', album: 'The Twilight Saga: Breaking Dawn', duration: '4:45', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80', mood: 'sleepy', color: '#94a3b8' },
    { id: 20, title: 'Softly', artist: 'Kina', album: 'Sleep Sound', duration: '2:58', cover: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80', mood: 'sleepy', color: '#a5b4fc' },
    { id: 21, title: 'Hallelujah', artist: 'Jeff Buckley', album: 'Grace', duration: '6:53', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', mood: 'sleepy', color: '#cbd5e1' }
  ],
  excited: [
    { id: 22, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80', mood: 'excited', color: '#f97316' },
    { id: 23, title: 'Don’t Start Now', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:03', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80', mood: 'excited', color: '#fb923c' },
    { id: 24, title: 'Firework', artist: 'Katy Perry', album: 'Teenage Dream', duration: '3:48', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', mood: 'excited', color: '#f59e0b' }
  ],
  loved: [
    { id: 25, title: 'Marry You', artist: 'Bruno Mars', album: 'Doo-Wops & Hooligans', duration: '3:50', cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80', mood: 'loved', color: '#f472b6' },
    { id: 26, title: 'Can’t Help Falling in Love', artist: 'Elvis Presley', album: 'Blue Suede Shoes', duration: '3:01', cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80', mood: 'loved', color: '#f9a8d4' },
    { id: 27, title: 'My Favorite Things', artist: 'John Coltrane', album: 'My Favorite Things', duration: '4:17', cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80', mood: 'loved', color: '#fbbf24' }
  ],
  lonely: [
    { id: 28, title: 'Someone You Loved', artist: 'Lewis Capaldi', album: 'Divinely Uninspired to a Hellish Extent', duration: '3:17', cover: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80', mood: 'lonely', color: '#7dd3fc' },
    { id: 29, title: 'Unbreak My Heart', artist: 'Toni Braxton', album: 'Secrets', duration: '4:32', cover: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80', mood: 'lonely', color: '#60a5fa' },
    { id: 30, title: 'The Night We Met', artist: 'Lord Huron', album: 'Strange Trails', duration: '3:13', cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80', mood: 'lonely', color: '#93c5fd' }
  ],
  thoughtful: [
    { id: 31, title: 'The Less I Know the Better', artist: 'Tame Impala', album: 'Currents', duration: '3:38', cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', mood: 'thoughtful', color: '#c084fc' },
    { id: 32, title: 'Quiet', artist: 'Milky Chance', album: 'Blossom', duration: '4:19', cover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', mood: 'thoughtful', color: '#d8b4fe' },
    { id: 33, title: 'Spaceship', artist: 'The Notorious B.I.G.', album: 'Life After Death', duration: '5:14', cover: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=600&q=80', mood: 'thoughtful', color: '#a78bfa' }
  ],
  energetic: [
    { id: 34, title: 'Titanium', artist: 'David Guetta ft. Sia', album: 'Nothing but the Beat', duration: '4:05', cover: 'https://images.unsplash.com/photo-1471478331149-c72f17e0e9d5?auto=format&fit=crop&w=600&q=80', mood: 'energetic', color: '#f43f5e' },
    { id: 35, title: 'Turn Down for What', artist: 'DJ Snake & Lil Jon', album: 'Turn Down for What', duration: '3:47', cover: 'https://images.unsplash.com/photo-1555157446-98e3c7f7f2d7?auto=format&fit=crop&w=600&q=80', mood: 'energetic', color: '#f87171' },
    { id: 36, title: 'Thriller', artist: 'Michael Jackson', album: 'Thriller', duration: '5:58', cover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80', mood: 'energetic', color: '#fb7185' }
  ]
};

const navItems: NavigationItem[] = [
  { key: 'home', label: 'Home', icon: House, href: '/' },
  { key: 'mood', label: 'Mood', icon: Sparkles, href: '/mood' },
  { key: 'explore', label: 'Explore', icon: Search, href: '/explore' },
  { key: 'player', label: 'Player', icon: Headphones, href: '/player' },
  { key: 'premium', label: 'Premium', icon: CreditCard, href: '/premium' },
  { key: 'profile', label: 'Profile', icon: UserCircle2, href: '/profile' },
  { key: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  { key: 'help', label: 'Help', icon: CircleHelp, href: '/help' }
];

const themeStyles = {
  dark: {
    shell: 'bg-slate-950 text-white',
    panel: 'bg-slate-900/80 border-white/10',
    muted: 'text-slate-300',
    accent: 'from-fuchsia-500 via-violet-500 to-cyan-500'
  },
  light: {
    shell: 'bg-stone-50 text-slate-900',
    panel: 'bg-white/90 border-slate-200',
    muted: 'text-slate-600',
    accent: 'from-rose-400 via-orange-400 to-amber-300'
  },
  midnight: {
    shell: 'bg-[#0a1028] text-slate-50',
    panel: 'bg-slate-900/80 border-cyan-500/20',
    muted: 'text-slate-300',
    accent: 'from-cyan-400 via-blue-500 to-violet-500'
  }
};

export default function MusicApp({ activeTab = 'home' }: { activeTab?: string }) {
  const [selectedMood, setSelectedMood] = useState<MoodKey>('happy');
  const [currentTrack, setCurrentTrack] = useState<Song>(songLibrary.happy[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedTracks, setLikedTracks] = useState<number[]>([1]);
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [language, setLanguage] = useState('English');

  const selectedMeta = moodMeta[selectedMood];
  const moodTracks = songLibrary[selectedMood];

  const currentTrackIndex = useMemo(
    () => moodTracks.findIndex((track) => track.id === currentTrack.id),
    [currentTrack.id, moodTracks]
  );

  const handleMoodSelect = (mood: MoodKey) => {
    const nextTrack = songLibrary[mood][0];
    setSelectedMood(mood);
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const toggleLike = (trackId: number) => {
    setLikedTracks((prev) => (prev.includes(trackId) ? prev.filter((id) => id !== trackId) : [...prev, trackId]));
  };

  const goToTrackByOffset = (direction: 'prev' | 'next') => {
    const currentIndex = moodTracks.findIndex((track) => track.id === currentTrack.id);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = direction === 'next' ? (safeIndex + 1) % moodTracks.length : (safeIndex - 1 + moodTracks.length) % moodTracks.length;
    setCurrentTrack(moodTracks[nextIndex]);
    setIsPlaying(true);
  };

  const shellClasses = themeStyles[theme];

  return (
    <div className={`${shellClasses.shell} min-h-screen transition-colors duration-300`}>
      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-4 lg:px-6">
        <aside className={`hidden min-h-[92vh] w-72 flex-col rounded-3xl border p-5 shadow-soft backdrop-blur-xl lg:flex ${shellClasses.panel}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-400">Moodify</p>
              <h1 className="mt-2 text-3xl font-black">MOODIFY</h1>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-2 text-white shadow-lg">
              <Headphones className="h-5 w-5" />
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {navItems.map(({ key, label, icon: Icon, href }) => (
              <a
                key={key}
                href={href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20 text-white ring-1 ring-white/10'
                    : `${shellClasses.muted} hover:bg-white/5 hover:text-white`
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {label}
                </span>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </a>
            ))}
          </nav>

          <div className="mt-auto rounded-3xl bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-500/20 p-4 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-2 text-fuchsia-300">
                <Wand2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Mood Match</p>
                <p className="text-xs text-slate-300">92% match</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500" />
              </div>
              <span className="text-xs font-semibold text-fuchsia-300">92%</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 pb-28 lg:pb-6">
          <div className={`rounded-[28px] border p-4 shadow-soft backdrop-blur-xl ${shellClasses.panel}`}>
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-400">Every Mood Deserves a Melody</p>
                <h2 className="mt-2 text-3xl font-black">Discover your soundtrack.</h2>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10">
                  <Bell className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <div className="flex items-center gap-2 text-sm text-slate-200">
                    <Languages className="h-4 w-4 text-fuchsia-300" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-transparent text-sm outline-none"
                    >
                      <option className="text-slate-900">English</option>
                      <option className="text-slate-900">Hindi</option>
                      <option className="text-slate-900">Spanish</option>
                    </select>
                  </div>
                </div>
                <button className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30">
                  Upgrade to Premium
                </button>
              </div>
            </header>

            <section className="mt-6 grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
              <div className="rounded-[28px] bg-gradient-to-br from-fuchsia-600 via-violet-600 to-cyan-500 p-6 text-white shadow-xl shadow-fuchsia-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Current mood</p>
                    <h3 className="mt-3 text-4xl font-black">{selectedMeta.emoji} {selectedMeta.label}</h3>
                  </div>
                  <div className="rounded-full border border-white/20 bg-white/10 p-3">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-5 max-w-md text-sm text-white/80">{selectedMeta.description}</p>
                <div className="mt-6 flex items-center gap-3">
                  <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-fuchsia-600 shadow-md">Play mix</button>
                  <button className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">View playlist</button>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-200">Mood analytics</p>
                  <button className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">This week</button>
                </div>

                <div className="mt-5 space-y-4">
                  {[75, 62, 88, 71].map((value, index) => (
                    <div key={value}>
                      <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                        <span>{['Happy', 'Focused', 'Calm', 'Energetic'][index]}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500" style={{ width: `${value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-bold">Mood selection</h3>
                <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">AI scan</button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                {moodOrder.map((mood) => {
                  const meta = moodMeta[mood];
                  const active = selectedMood === mood;
                  return (
                    <button
                      key={mood}
                      onClick={() => handleMoodSelect(mood)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active ? 'border-fuchsia-400 bg-fuchsia-500/10 shadow-lg shadow-fuchsia-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-4xl">{meta.emoji}</div>
                      <p className="mt-3 text-base font-semibold">{meta.label}</p>
                      <p className="mt-1 text-xs text-slate-400">{meta.playlist}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.75fr]">
              <div className="rounded-[28px] border border-white/10 bg-black/10 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300">Recommended playlist</p>
                    <h3 className="mt-2 text-2xl font-bold">{selectedMeta.playlist}</h3>
                  </div>
                  <button className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-slate-200">Customize</button>
                </div>

                <div className="space-y-3">
                  {moodTracks.map((track) => {
                    const isActive = currentTrack.id === track.id;
                    const isLiked = likedTracks.includes(track.id);
                    return (
                      <div
                        key={track.id}
                        className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                          isActive ? 'border-fuchsia-400/70 bg-fuchsia-500/10' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <img src={track.cover} alt={track.title} className="h-14 w-14 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{track.title}</p>
                          <p className="truncate text-xs text-slate-400">{track.artist} • {track.album}</p>
                        </div>
                        <span className="text-xs text-slate-400">{track.duration}</span>
                        <button onClick={() => toggleLike(track.id)} className={`rounded-full p-2 ${isLiked ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-300'}`}>
                          <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <button onClick={() => setCurrentTrack(track)} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-2 text-white shadow-lg shadow-fuchsia-500/20">
                          {isActive && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-200">Quick actions</p>
                    <button className="rounded-full bg-white/5 p-2"><Camera className="h-4 w-4 text-cyan-300" /></button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    {[
                      { label: 'Face Scan', icon: Camera },
                      { label: 'Voice Detection', icon: Mic },
                      { label: 'Downloads', icon: Download },
                      { label: 'Mood History', icon: Flame }
                    ].map(({ label, icon: Icon }) => (
                      <button key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-3 text-left hover:bg-white/5">
                        <span className="flex items-center gap-3 text-sm text-slate-200">
                          <Icon className="h-4 w-4 text-fuchsia-300" />
                          {label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300">Premium</p>
                  <h3 className="mt-3 text-3xl font-black">₹49/month</h3>
                  <p className="mt-2 text-sm text-slate-300">Ad-free streaming, face & voice AI, unlimited playlists, offline downloads.</p>
                  <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-4 py-3 font-semibold text-white">Start premium</button>
                </div>
              </div>
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-3">
              {[
                { title: 'Trending songs', value: '24 New this week', icon: Flame },
                { title: 'Your vibe', value: selectedMeta.playlist, icon: Sparkles },
                { title: 'Storage', value: '4.2GB / 25GB', icon: Download }
              ].map(({ title, value, icon: Icon }) => (
                <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-300">{title}</p>
                    <Icon className="h-4 w-4 text-fuchsia-300" />
                  </div>
                  <p className="mt-5 text-xl font-bold">{value}</p>
                </div>
              ))}
            </section>

            <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Theme & language</h3>
                  <button className="rounded-full bg-white/5 px-3 py-1.5 text-sm text-slate-300">Save</button>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    { name: 'Dark', value: 'dark', icon: Moon },
                    { name: 'Light', value: 'light', icon: SunMedium },
                    { name: 'Midnight', value: 'midnight', icon: ShieldCheck }
                  ].map(({ name, value, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value as ThemeName)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                        theme === value ? 'border-fuchsia-400 bg-fuchsia-500/10 text-white' : 'border-white/10 bg-white/5 text-slate-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Settings</h3>
                  <Settings className="h-5 w-5 text-fuchsia-300" />
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 px-3 py-3">
                    <span>Offline mode</span>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">On</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 px-3 py-3">
                    <span>Auto lyrics</span>
                    <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">Enabled</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950/50 px-3 py-3">
                    <span>Privacy mode</span>
                    <span className="rounded-full bg-violet-500/20 px-2 py-1 text-xs text-violet-300">Secure</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 lg:px-8">
        <div className={`flex w-full max-w-5xl items-center gap-3 rounded-[28px] border border-white/10 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-xl ${theme === 'light' ? 'bg-white/90' : ''}`}>
          <img src={currentTrack.cover} alt={currentTrack.title} className="h-16 w-16 rounded-2xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{currentTrack.title}</p>
            <p className="truncate text-xs text-slate-400">{currentTrack.artist}</p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => goToTrackByOffset('prev')} className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"><SkipBack className="h-4 w-4" /></button>
            <button onClick={() => setIsPlaying((prev) => !prev)} className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 p-3 text-white shadow-lg shadow-fuchsia-500/20">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <button onClick={() => goToTrackByOffset('next')} className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"><SkipForward className="h-4 w-4" /></button>
          </div>
          <div className="hidden flex-1 items-center gap-3 md:flex">
            <span className="text-xs text-slate-400">1:08</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500" />
            </div>
            <span className="text-xs text-slate-400">{currentTrack.duration}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"><Shuffle className="h-4 w-4" /></button>
            <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"><Volume2 className="h-4 w-4" /></button>
            <button onClick={() => toggleLike(currentTrack.id)} className={`rounded-full p-2 ${likedTracks.includes(currentTrack.id) ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-300'}`}>
              <Heart className={`h-4 w-4 ${likedTracks.includes(currentTrack.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden">
        <div className="flex w-full max-w-md items-center justify-between rounded-full border border-white/10 bg-slate-950/90 p-2 shadow-2xl backdrop-blur-xl">
          {navItems.slice(0, 5).map(({ key, label, icon: Icon }) => (
            <a key={key} href={key === 'home' ? '/' : `/${key}`} className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[10px] ${activeTab === key ? 'bg-white/10 text-white' : 'text-slate-400'}`}>
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
