import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toAbsoluteUrl } from "@/lib/helpers";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { FC, useState } from "react";

const pois = [
  {
    title: "Rakaposhi View Point",
    description: "Capture stunning views of the famous Rakaposhi Peak.",
    image: "/media/images/rakaposhi.jpg",
  },
  {
    title: "Eagle’s Nest Viewpoint",
    description: "Panoramic views of Hunza Valley at sunset.",
    image: "/media/images/eagles-nest.jpg",
  },
  {
    title: "Passu Cones",
    description: "Iconic pointed peaks along the Karakoram Highway.",
    image: "/media/images/passu-cones.webp",
  },
  {
    title: "Altit Fort",
    description: "Historic fort with beautiful architecture and gardens.",
    image: "/media/images/altit-fort.jpg",
  },
];

const RecommendationsPOIs: FC = () => {

   const [addedItems, setAddedItems] = useState<string[]>([]);
  
    const handleAddToTrip = (title: string) => {
      setAddedItems((prev) =>
        prev.includes(title)
          ? prev.filter((item) => item !== title)
          : [...prev, title]
      );
    };
  

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-6 min-w-max">
        {pois.map((item, i) => {
          const isAdded = addedItems.includes(item.title);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-gray-900 transition-all border w-[280px]"
          >
            {/* Image Section with Floating Icon */}
            <div className="relative">
              <img
                src={toAbsoluteUrl(item.image)}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              {/* Add Icon on Top-Right */}
              <Button
                variant={isAdded ? "secondary" : "primary"}
                size="icon"
                onClick={() => handleAddToTrip(item.title)}
                className={`absolute top-3 right-3 rounded-full shadow-md transition-all duration-300 ${isAdded
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-primary hover:bg-primary/90 text-white"
                  }`}
              >
                {isAdded ? <Check size={16} /> : <Plus size={16} />}
              </Button>
            </div>

            {/* Content Section */}
            <CardContent className="p-4">
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
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

export default RecommendationsPOIs;
