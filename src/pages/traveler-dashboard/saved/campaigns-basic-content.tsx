import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { Bell, Building, Map, MessageCircleHeart } from 'lucide-react';
import { useState } from 'react';
import SavedActivities from './saved-activities';
import { SavedBusinesses } from './saved-businessess';
import { SavedLakes } from './saved-lakes';
import SavedPOIs from './saved-pois';

export interface ICampaignsContentItem {
  logo: string;
  logoSize?: string;
  logoDark?: string;
  title: string;
  description: string;
  status: {
    variant?:
    | 'primary'
    | 'destructive'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | null
    | undefined;
    label: string;
  };
  statistics: Array<{ total: string; description: string }>;
  progress: {
    variant: string;
    value: number;
  };
}

export interface ICampaignsContentProps {
  mode: string;
}

export function CampaignsContent({ mode }: ICampaignsContentProps) {


  const [subActiveTab, setSubActiveTab] = useState<'lakes' | 'activities' | 'pois' | 'businessess'>('lakes');


  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      {/* <div className="flex flex-wrap items-center gap-5 justify-between"> */}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <ScrollArea className=''>
            <div className="gap-6 min-w-fit flex  border-b">
              {[
                { key: 'lakes', label: 'Lakes', icon: Map },
                { key: 'activities', label: 'Activities', icon: Bell },
                { key: 'pois', label: 'POIs', icon: MessageCircleHeart },
                { key: 'businessess', label: 'Businessess', icon: Building },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSubActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all cursor-pointer ${subActiveTab === tab.key
                    ? 'border-primary text-primary font-medium'
                    : 'border-transparent text-gray-500 hover:text-primary'
                    }`}
                >
                  <tab.icon size={16} /> {tab.label}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      
      {/* </div> */}

      {subActiveTab === 'lakes' && <SavedLakes />}

      {subActiveTab === 'activities' && <SavedActivities />}

      {subActiveTab === 'pois' && <SavedPOIs />}

      {subActiveTab === 'businessess' && <SavedBusinesses />}

    </div>
  );
}
