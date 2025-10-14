import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toAbsoluteUrl } from "@/lib/helpers";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";

interface Accommodation {
  title: string;
  description: string;
  image: string;
}

const accommodations: Accommodation[] = [
  {
    title: "Serena Hotel Gilgit",
    description: "Luxury stay with top-notch amenities and mountain views.",
    image: "/media/images/serena.jpg",
  },
  {
    title: "Hunza Darbar Hotel",
    description: "Elegant stay with traditional touches and scenic views.",
    image: "/media/images/hunza-hotel.jpg",
  },
  {
    title: "Eagle's Nest Hotel",
    description: "Boutique hotel with panoramic views of Hunza Valley.",
    image: "/media/images/eagles-nest-hotel.webp",
  },
  {
    title: "Baltit Heritage Inn",
    description: "Charming inn with historic ambiance and modern comforts.",
    image: "/media/images/baltit-inn.jpg",
  },
];

const RecommendationsAccommodations: FC = () => {
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
        {accommodations.map((item, i) => {
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
                  isAdded
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-primary hover:bg-primary/90 text-white"
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

export default RecommendationsAccommodations;
