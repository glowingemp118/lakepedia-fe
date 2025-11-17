



import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { LakeCard } from "./lake-card";

interface LakeItem {
  id: string;
  image: string;
  title: string;
  description: string;
  location: string;
  country: string;
  area: string;
  year: string;
}

export function SavedLakes() {
  
  const [activeView, setActiveView] = useState<"cards" | "list">("cards");

  const lakes: LakeItem[] = [
    {
      id: "lake-1",
      image: "/media/images/attabad.jpg",
      title: "Attabad Lake",
      description:
        "A stunning turquoise lake formed by a landslide in Hunza Valley, Pakistan.",
      location: "Hunza Valley, Gilgit-Baltistan",
      country: "Pakistan",
      area: "13 km²",
      year: "2010",
    },
    {
      id: "lake-2",
      image: "/media/images/altit-fort.jpg",
      title: "Sheosar Lake",
      description:
        "A high-altitude lake in Deosai National Park known for its breathtaking views.",
      location: "Deosai Plains, Gilgit-Baltistan",
      country: "Pakistan",
      area: "2.3 km²",
      year: "Unknown",
    },
    {
      id: "lake-3",
      image: "/media/images/baltit-fort.webp",
      title: "Upper Kachura Lake",
      description:
        "A crystal-clear lake located in Skardu, surrounded by rugged mountains.",
      location: "Skardu, Gilgit-Baltistan",
      country: "Pakistan",
      area: "1.5 km²",
      year: "Natural",
    },
    {
        id: "lake-4",
        image: "/media/images/altit-fort.jpg",
        title: "Kachura Lake",
        description:
          "A beautiful lake located in Skardu, known for its stunning scenery.",
        location: "Skardu, Gilgit-Baltistan",
        country: "Pakistan",
        area: "1.2 km²",
        year: "Natural",
      },
      {
        id: "lake-5",
        image: "/media/images/baltit-fort.webp",
        title: "Satpara Lake",
        description:
          "A serene lake located in Skardu, known for its tranquility.",
        location: "Skardu, Gilgit-Baltistan",
        country: "Pakistan",
        area: "2.5 km²",
        year: "Natural",
      },
      {
        id: "lake-6",
        image: "/media/images/attabad.jpg",
        title: "Borith Lake",
        description:
          "A high-altitude lake located in the Hunza Valley, known for its stunning views.",
        location: "Hunza Valley, Gilgit-Baltistan",
        country: "Pakistan",
        area: "1.5 km²",
        year: "Natural",
      }
  ];

  const [data, setData] = useState<LakeItem[]>(lakes);

  const handleDelete=(id: string) => {
    const filteredLakes = data.filter((lake) => lake.id !== id);
    setData(filteredLakes);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{data.length} Lakes</h3>
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

      {activeView === "cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {data.map((lake) => (
            <LakeCard key={lake.id} handleDelete={handleDelete} {...lake} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((lake) => (
            <div
              key={lake.id}
              className="border p-4 rounded-lg hover:border-blue-400 transition"
            >
              <h3 className="text-lg font-semibold">{lake.title}</h3>
              <p className="text-sm text-gray-600">{lake.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                📍 {lake.location} — {lake.country} ({lake.year})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
