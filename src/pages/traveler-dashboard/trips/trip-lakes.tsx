import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';


export const TripLakes = ({ lakes }: { lakes: any[] }) => {
    if (!lakes || lakes.length === 0) return null;

    return (
        <>
            <ScrollArea className="w-full">
                <div className="flex gap-6 min-w-max">
                    {lakes.map((lake, i) => (
                        <motion.div
                            key={lake.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className=" rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-gray-900 transition-all border rounded-t-xl w-[280px] bg-cover bg-center"
                        >
                            <img
                                src={toAbsoluteUrl(`/media/images/600x600/${lake.imageUrl}`)}
                                alt={lake.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                                    {lake.name}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <MapPin size={14} className="text-green-500" />
                                    <span>{lake.location}</span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                                    {lake.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <ScrollBar orientation="horizontal" />
            </ScrollArea>

        </>
    );
};

export default TripLakes