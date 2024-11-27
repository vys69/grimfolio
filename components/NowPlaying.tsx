"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RefreshCw } from "lucide-react";
import { fetchLastFmData } from "@/lib/api";
import { Spotlight } from '@/components/motion/spotlight';
import type { LastFmResponse } from "@/types/lastfm";

const POLL_INTERVAL = 3000; // 3 seconds

export function NowPlaying() {
  const [currentTrack, setCurrentTrack] = useState<LastFmResponse['recenttracks']>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchNowPlaying = async () => {
    try {
      console.log('🎵 Fetching now playing...');
      setIsLoading(true);
      setError(null);
      
      const data = await fetchLastFmData('vyzss');
      console.log('✅ Fetched track data:', {
        track: data.recenttracks?.track[0]?.name,
        album: data.recenttracks?.track[0]?.album?.['#text'],
        isPlaying: data.recenttracks?.track[0]?.['@attr']?.nowplaying === 'true'
      });
      
      setCurrentTrack(data.recenttracks);
    } catch (error) {
      console.error('❌ Error fetching now playing:', error);
      setError("Failed to load track info");
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchNowPlaying();

    const intervalId = setInterval(fetchNowPlaying, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const track = currentTrack?.track[0];
  const isPlaying = track?.['@attr']?.nowplaying === 'true';

  if (!mounted) {
    return null;
  }

  if (isInitialLoad) {
    return (
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between animate-pulse">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
            <div className="space-y-2">
              <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-500">
            {error || "No track information available"}
          </div>
          <button
            onClick={fetchNowPlaying}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4 text-neutral-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop version with spotlight */}
      <div className="hidden lg:block relative overflow-hidden rounded-xl bg-neutral-200/30 p-[1px] dark:bg-black">
        <Spotlight
          className="from-blue-500/40 via-blue-500/20 to-blue-500/10 blur-xl 
            dark:from-blue-400/40 dark:via-blue-400/20 dark:to-blue-400/10"
          size={124}
        />
        <div className="relative block p-4 rounded-xl bg-white dark:bg-black">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              {/* Album Art with conditional inversion */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={track.image[2]['#text'] || '/placeholder.png'}
                  alt={track.album?.['#text'] || 'Album artwork'}
                  width={64}
                  height={64}
                  className={`object-cover ${!track.image[2]['#text'] ? 'dark:invert' : ''}`}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder.png';
                    img.classList.add('dark:invert');
                  }}
                />
              </div>

              {/* Track Info */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {isPlaying ? 'Now playing' : 'Last played'}
                  </div>
                </div>
                <div className="font-medium truncate mt-1">
                  {track.name}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                  {track.album?.['#text']}
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchNowPlaying}
              disabled={isLoading}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label="Refresh now playing"
            >
              <RefreshCw 
                className={`h-4 w-4 text-neutral-500 ${isLoading ? 'animate-spin' : ''}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet version with regular border */}
      <div className="lg:hidden p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {/* Album Art with conditional inversion */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={track.image[2]['#text'] || '/placeholder.png'}
                alt={track.album?.['#text'] || 'Album artwork'}
                width={64}
                height={64}
                className={`object-cover ${!track.image[2]['#text'] ? 'dark:invert' : ''}`}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = '/placeholder.png';
                  img.classList.add('dark:invert');
                }}
              />
            </div>

            {/* Track Info */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                  {isPlaying ? 'Now playing' : 'Last played'}
                </div>
              </div>
              <div className="font-medium truncate mt-1">
                {track.name}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                {track.album?.['#text']}
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchNowPlaying}
            disabled={isLoading}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            aria-label="Refresh now playing"
          >
            <RefreshCw 
              className={`h-4 w-4 text-neutral-500 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>
    </>
  );
}