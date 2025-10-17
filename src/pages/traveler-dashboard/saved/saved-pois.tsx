import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Heart, LayoutGrid, List, Plus } from "lucide-react";
import { useState } from "react";
import { PoiCard } from "./pois-card";

interface PoiItem {
    id: string;
    title: string;
    description: string;
    image: string;
}

const SavedPOIs = () => {
    const [activeView, setActiveView] = useState<"cards" | "list">("cards");

    const pois: PoiItem[] = [
        {
            id: "poi-1",
            title: "Rakaposhi View Point",
            description: "Capture stunning views of the famous Rakaposhi Peak.",
            image: "/media/images/rakaposhi.jpg",
        },
        {
            id: "poi-2",
            title: "Eagle’s Nest Viewpoint",
            description: "Panoramic views of Hunza Valley at sunset.",
            image: "/media/images/eagles-nest.jpg",
        },
        {
            id: "poi-3",
            title: "Passu Cones",
            description: "Iconic pointed peaks along the Karakoram Highway.",
            image: "/media/images/passu-cones.webp",
        },
        {
            id: "poi-4",
            title: "Altit Fort",
            description: "Historic fort with beautiful architecture and gardens.",
            image: "/media/images/altit-fort.jpg",
        },
    ];

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        //console.log("Favorite clicked!");
    };

    const renderRow = (poi: PoiItem) => (
        <div
            key={poi.id}
            className="flex flex-col sm:flex-row items-center gap-4 border rounded-xl p-4 hover:border-blue-400 transition-all duration-300 cursor-pointer"
        >
            {/* Image */}
            <img
                src={poi.image}
                alt={poi.title}
                className="w-full sm:w-40 h-48 object-cover rounded-lg"
            />

            {/* Details */}
            <div className="flex flex-col gap-1 w-full">
                <h3 className="text-lg font-semibold text-gray-900">{poi.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{poi.description}</p>
            </div>

            {/* Favorite Button */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(e);
                }}
                className="mt-2 sm:mt-0 sm:ml-auto bg-white/70 hover:bg-white p-2 rounded-full shadow-sm transition cursor-pointer"
            >
                <Heart size={18} className="text-red-500" />
            </div>
        </div>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{pois.length} POIs</h3>
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

            {/* Content */}
            {activeView === "cards" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {pois.map((poi) => (
                        <PoiCard
                            key={poi.id}
                            image={poi.image}
                            title={poi.title}
                            description={poi.description}
                            onFavorite={() => console.log("Favorited:", poi.title)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {pois.map((poi) => renderRow(poi))}
                </div>
            )}

            {/* Show More */}
            <div className="flex justify-center pt-5">
                <Button variant="dashed">Show more POIs</Button>
            </div>
        </div>
    );
};

export default SavedPOIs;
