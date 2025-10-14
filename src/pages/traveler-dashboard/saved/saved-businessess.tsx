import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { BusinessCard } from "./business-card";

interface BusinessItem {
  id: string;
  image: string;
  name: string;
  businessType: string;
  servicesOffered: string;
  description: string;
}

export function SavedBusinesses() {
  const [activeView, setActiveView] = useState<"cards" | "list">("cards");

  const businesses: BusinessItem[] = [
    {
      id: "biz-1",
      image: "/media/images/hunza-cafe.png",
      name: "Hunza Café",
      businessType: "Restaurant",
      servicesOffered: "Local cuisine, outdoor dining, takeaway",
      description:
        "A cozy café located in the heart of Hunza, offering traditional Hunza dishes and scenic mountain views.",
    },
    {
      id: "biz-2",
      image: "/media/images/skardu-hotel.jpg",
      name: "Skardu Heights Hotel",
      businessType: "Hotel",
      servicesOffered: "Accommodation, food, tour guidance",
      description:
        "A luxury hotel in Skardu providing top-tier hospitality with breathtaking views of the Karakoram range.",
    },
    {
      id: "biz-3",
      image: "/media/images/naran-tours.webp",
      name: "Naran Adventure Tours",
      businessType: "Travel Agency",
      servicesOffered: "Adventure trips, guided tours, vehicle rental",
      description:
        "Organizing safe and exciting tours around Naran Valley and northern Pakistan for local and international tourists.",
    },
    {
      id: "biz-4",
      image: "/media/images/lake-view-resort.jpg",
      name: "Lake View Resort",
      businessType: "Resort",
      servicesOffered: "Accommodation, lake view rooms, boating",
      description:
        "A serene lakeside resort near Attabad Lake offering peaceful stays and adventure experiences.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{businesses.length} Businesses</h3>
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
          {businesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-4">
          {businesses.map((business) => (
            <div
              key={business.id}
              className="border p-4 rounded-lg hover:border-blue-400 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {business.name}
              </h3>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {business.businessType}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Services:</strong> {business.servicesOffered}
              </p>
              <p className="text-sm text-gray-600 mt-2">{business.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
