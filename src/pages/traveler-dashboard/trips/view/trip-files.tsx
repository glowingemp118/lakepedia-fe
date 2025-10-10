import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CardWork, CardWorkRow } from '@/partials/cards';
import { LayoutGrid, List } from 'lucide-react';
import { FC, useState } from 'react'

interface PropsProps {
    trip: any
}
const TripFiles:FC<PropsProps> = ({trip}) => {

     const [activeView, setActiveView] = useState('cards');

    return (
        <div >
            <div className="flex items-center justify-end mb-4">
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={activeView}
                    onValueChange={(value:string) => {
                        if (value) setActiveView(value);
                    }}
                >
                    <ToggleGroupItem value="cards">
                        <LayoutGrid size={16} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="list">
                        <List size={16} />
                    </ToggleGroupItem>
                </ToggleGroup>


            </div>
            {activeView === 'cards' &&
                <div id="works_cards">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">

                        {trip.attachments.map((file: any) => (
                            <CardWork
                                title={file.title}
                                image={file.image}
                                authorName={file.authorName}
                                authorAvatar={file.authorAvatar}
                                likes={file.likes}
                                comments={file.comments}
                                key={file.title}
                            />
                        ))}
                    </div>
                </div>
            }
            {activeView === 'list' &&
                <div id="works_list">
                    <div className="flex flex-col gap-5 lg:gap-7.5">
                        {trip.attachments.map((file: any) => {
                            return (
                                <CardWorkRow
                                    description={file.description}
                                    title={file.title}
                                    image={file.image}
                                    authorName={file.authorName}
                                    authorAvatar={file.authorAvatar}
                                    likes={file.likes}
                                    comments={file.comments}
                                    key={file.title}
                                />
                            );
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default TripFiles;