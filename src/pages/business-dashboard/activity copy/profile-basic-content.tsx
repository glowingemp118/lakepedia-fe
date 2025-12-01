

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Building, Fish, Map, MessageCircleHeart } from "lucide-react";
import { useState } from "react";
import BusinessReviews from "./business-review";
import FishingReports from "./fishing-reports";
import LakeReviews from "./lakes-review";
import POIsReviews from "./pois-reviews";

function ProfileActivityContent() {


  const [subActiveTab, setSubActiveTab] = useState("lakes");


  return (
    <div className="space-y-6">
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5 ">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className='grid grid-cols-1'>
            <ScrollArea className=''>
              <div className="gap-6 flex  border-b">
                {[
                  { key: 'lakes', label: 'Lakes', icon: <Map size={16} /> },
                  { key: 'fishing', label: 'Fishing Reports', icon: <Fish size={16} /> },
                  { key: 'pois', label: 'POIs', icon: <MessageCircleHeart size={16} /> },
                  // { key: 'businessess', label: 'Businessess', icon: <Building size={16} /> },

                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSubActiveTab(tab.key as any)}
                    className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${subActiveTab === tab.key
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-gray-500 hover:text-primary'
                      }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </motion.div>
      </div>

      {subActiveTab === 'lakes' && <LakeReviews />}

      {subActiveTab === 'fishing' && <FishingReports />}

      {subActiveTab === 'pois' && <POIsReviews />}

      {/* {subActiveTab === 'businessess' && <BusinessReviews />} */}

    </div >
  );
}
export { ProfileActivityContent };
