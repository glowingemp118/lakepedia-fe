import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toAbsoluteUrl } from "@/lib/helpers";
import { motion } from 'framer-motion';
import { Check, Plus } from "lucide-react";
import { FC, useState } from "react";

interface RecommendationItem {
  title: string;
  description: string;
  image: string;
}

const activities: RecommendationItem[] = [
  {
    title: "Hiking in Hunza Valley",
    description: "Enjoy breathtaking mountain views and fresh air while hiking.",
    image: "/media/images/hiking.jpg",
  },
  {
    title: "Boating at Attabad Lake",
    description: "Experience crystal blue waters and scenic boat rides.",
    image: "/media/images/attabad.jpg",
  },
  {
    title: "Cultural Tour of Karimabad",
    description: "Explore local traditions, crafts, and cuisine in the heart of Hunza.",
    image: "/media/images/karimabad.jpg",
  },
  {
    title: "Visit Baltit Fort",
    description: "Discover the history and architecture of this ancient fort.",
    image: "/media/images/baltit-fort.webp",
  },
];

const RecommendationsActivities: FC = () => {
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const handleAddToTrip = (title: string) => {
    if (addedItems.includes(title)) {
      setAddedItems((prev) => prev.filter((item) => item !== title)); 
    } else {
      setAddedItems((prev) => [...prev, title]); // add new
    }
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-6 min-w-max">
        {activities.map((item, i) => {
          const isAdded = addedItems.includes(item.title);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-gray-900 transition-all border w-[280px]"
            >
              <img
                src={toAbsoluteUrl(item.image)}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              {/* Floating Add Button */}
              <Button
                variant={isAdded ? "secondary" : "primary"}
                size="icon"
                onClick={() => handleAddToTrip(item.title)}
                className={`absolute top-3 right-3 rounded-full shadow-md transition-all duration-300 ${
                  isAdded ? "bg-green-500 hover:bg-green-600 text-white" : "bg-primary hover:bg-primary/90 text-white"
                }`}
              >
                {isAdded ? <Check size={16} /> : <Plus size={16} />}
              </Button>

              <CardContent className="p-4">
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </CardContent>
            </motion.div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default RecommendationsActivities;
