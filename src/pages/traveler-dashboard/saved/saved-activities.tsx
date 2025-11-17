import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, List } from "lucide-react";
import { ActivityCard } from "./activity-card";
import { useState } from "react";

interface RecommendationItem {
  title: string;
  description: string;
  image: string;
  id: string
}
const activities: RecommendationItem[] = [
  {
    id: "activity-1",
    title: "Hiking in Hunza Valley",
    description: "Enjoy breathtaking mountain views and fresh air while hiking.",
    image: "/media/images/hiking.jpg",
  },
  {
    id: "activity-2",
    title: "Boating at Attabad Lake",
    description: "Experience crystal blue waters and scenic boat rides.",
    image: "/media/images/attabad.jpg",
  },
  {
    id: "activity-3",
    title: "Cultural Tour of Karimabad",
    description: "Explore local traditions, crafts, and cuisine in the heart of Hunza.",
    image: "/media/images/karimabad.jpg",
  },
  {
    id: "activity-4",
    title: "Visit Baltit Fort",
    description: "Discover the history and architecture of this ancient fort.",
    image: "/media/images/baltit-fort.webp",
  },
];

const SavedActivities = () => {

  const [activeView, setActiveView] = useState<"cards" | "list">("cards");


  const [data, setData] = useState<RecommendationItem[]>(activities);

  const handleDelete = (id: string) => {
    const filteredActivities = data.filter((activity) => activity.title !== id);
    setData(filteredActivities);
  }


  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{data.length} Activities</h3>
        <div className="flex gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={activeView}
            onValueChange={() =>
              setActiveView(activeView === "cards" ? "list" : "cards")
            }
          >
            <ToggleGroupItem value="cards">
              <LayoutGrid size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="list">
              <List size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Card View */}
      {activeView === "cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {activities.map((activity) => (
            <ActivityCard key={activity.title} handleDelete={handleDelete} {...activity} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-4">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="border p-4 rounded-lg hover:border-blue-400 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {activity.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">{activity.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>

  )
}

export default SavedActivities