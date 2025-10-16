import { Container } from "@/components/common/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toAbsoluteUrl } from "@/lib/helpers";
import { Rating } from "@/partials/common/rating";
import { motion } from "framer-motion";
import {
    Activity,
    Calendar,
    Droplets,
    FileText,
    Image,
    MapPin,
    Ruler,
    Users,
    Waves
} from "lucide-react";
import { useState } from "react";

export default function LakeDetailPage() {
    const [activeTab, setActiveTab] = useState("overview");

    const lake = {
        id: 1,
        name: "Satpara Lake",
        location: "Skardu, Gilgit-Baltistan, Pakistan",
        country: "Pakistan",
        status: "In Progress",
        description:
            "Satpara Lake is a stunning freshwater lake located in Skardu, surrounded by snow-capped mountains. It provides a peaceful environment, boating options, and panoramic views of nature.",
        area: 2.5,
        formedYear: 2003,
        depth: 45,
        waterType: "Freshwater",
        images: [
            "/media/images/600x600/lake1.jpg",
            "/media/images/600x600/lake2.jpg",
            "/media/images/600x600/lake1.jpg",
            "/media/images/600x600/lake2.jpg",
        ],
        facilities: [
            { icon: "⛵", name: "Boating" },
            { icon: "🎣", name: "Fishing" },
            { icon: "🏕️", name: "Camping" },
            { icon: "📸", name: "Photography" },
            { icon: "🚤", name: "Jet Ski" },
        ],
        activityLogs: [
            { id: 1, time: "09:45 AM", description: "Lake maintenance update", by: "Admin" },
            { id: 2, time: "12:10 PM", description: "Water level checked", by: "Environment Dept" },
        ],
    };
    const reviews = [
        {
            id: 1,
            user: {
                name: "John Doe",
                avatar: "/media/avatars/300-1.png",
                role: "Traveler"
            },
            rating: 5,
            comment: "Beautiful lake with crystal-clear water! Perfect for boating and photography.",
            date: "2024-09-21",
            role: "Traveler"
        },
        {
            id: 2,
            user: {
                name: "Sarah Ahmed",
                avatar: "/media/avatars/300-2.png",
                role: "Traveler"
            },
            rating: 4,
            comment: "Amazing scenery, but the road to the lake was a bit rough.",
            date: "2024-08-11",
            role: "Traveler"
        },
        {
            id: 3,
            user: {
                name: "John Doe",
                avatar: "/media/avatars/300-3.png",
                role: "Traveler"
            },
            rating: 5,
            comment: "A serene getaway with breathtaking views.",
            date: "2024-07-30",
            role: "Traveler"
        },
        {
            id: 4,
            user: {
                name: "Jane Smith",
                avatar: "/media/avatars/300-4.png",
            },
            rating: 1.5,
            comment: "Great for a day trip, but bring your own food as there are limited options nearby.",
            date: "2024-06-15",
            role: "Traveler"
        }
    ];


    return (
        <Container className="flex flex-col gap-6">
            {/* Header */}
            <Card className="p-6 shadow-lg border rounded-2xl">
                <div className="flex flex-col md:flex-row justify-between ">
                    <div>
                        <h1 className="text-2xl font-bold">{lake.name}</h1>
                        <div className="flex items-center gap-2 mt-2 text-gray-500">
                            <MapPin size={16} className="text-green-500" />
                            <span>{lake.location}</span>
                        </div>
                        <p className="text-gray-600 mt-3">{lake.description}</p>
                    </div>
                    <div className="flex gap-3">
                        <Badge appearance={"light"} className="w-full" variant={"success"}>{lake.country}</Badge>
                        <Badge appearance="light" className="w-full border border-red-400"
                            variant={
                                lake.status === "In Progress"
                                    ? "success"
                                    : lake.status === "Completed"
                                        ? "success"
                                        : "warning"}
                        >In Progress {/* {lake.status} */}
                        </Badge>
                    </div>
                </div>
            </Card>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sidebar */}
                <div className="col-span-1 space-y-6">
                    {/* Lake Summary */}
                    <Card className="p-6 border rounded-2xl shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Droplets size={18} /> Lake Summary
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-3">
                            <li className="flex justify-between">
                                <span>Area:</span> <span>{lake.area} km²</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Depth:</span> <span>{lake.depth} m</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Water Type:</span> <span>{lake.waterType}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Formed Year:</span> <span>{lake.formedYear}</span>
                            </li>
                        </ul>
                    </Card>


                    <Card className="p-6 border rounded-2xl shadow-sm">
                        <div className='flex justify-between items-center mb-4'>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users size={18} />
                                Reviewers
                            </h3>
                            <span className="text-sm text-gray-500">{reviews.length} Members</span>
                        </div>
                        <div className="space-y-3">
                            {reviews.map((p) => (
                                <div key={p.id} className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <img src={toAbsoluteUrl(p.user.avatar)} alt={p.user.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <p className="font-medium">{p.user.name}</p>
                                            <p className="text-xs text-gray-500">{p.role}</p>
                                        </div>
                                    </div>
                                    <div>

                                        <Rating rating={Math.floor(p.rating)} round={p.rating % 1} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="col-span-2">
                    {/* Tabs */}
                    <div className="flex border-b mb-4">
                        {[
                            { key: "overview", label: "Overview", icon: Waves },
                            { key: "facilities", label: "Facilities", icon: Activity },
                            { key: "gallery", label: "Gallery", icon: Image },
                            { key: "activity", label: "Activity Log", icon: FileText },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all cursor-pointer ${activeTab === tab.key
                                    ? "border-primary text-primary font-medium"
                                    : "border-transparent text-gray-500 hover:text-primary"
                                    }`}
                            >
                                <tab.icon size={16} /> {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-4 rounded-xl border shadow-sm bg-white dark:bg-gray-900">
                        {activeTab === "overview" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Waves size={16} /> About the Lake
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {lake.description}
                                </p>
                                <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Ruler size={16} />
                                        <span>
                                            Area: <b>{lake.area} km²</b>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>
                                            Formed Year: <b>{lake.formedYear}</b>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "facilities" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Activity size={16} /> Facilities
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {lake.facilities.map((facility, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-md flex flex-col items-center text-center border"
                                        >
                                            <div className="text-3xl mb-2">{facility.icon}</div>
                                            <p className="text-gray-700 dark:text-gray-200 font-medium">
                                                {facility.name}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "gallery" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Image size={16} /> Lake Gallery
                                </h3>
                                <ScrollArea className="w-full">
                                    <div className="flex gap-6">
                                        {lake.images.map((img, i) => (
                                            <motion.img
                                                key={i}
                                                src={img}
                                                alt={`${lake.name} ${i}`}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="rounded-xl w-[350px] h-[220px] object-cover border shadow-md hover:shadow-lg transition-all"
                                            />
                                        ))}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </motion.div>
                        )}

                        {activeTab === "activity" && (
                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-2"
                            >
                                {lake.activityLogs.map((log) => (
                                    <li
                                        key={log.id}
                                        className="text-sm text-gray-700 border-l-2 border-green-500 pl-3 py-2"
                                    >
                                        <span className="font-medium">{log.time}</span> —{" "}
                                        {log.description}{" "}
                                        <span className="italic">by {log.by}</span>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
