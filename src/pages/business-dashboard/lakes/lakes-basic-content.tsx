import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useBoolean } from '@/hooks/use-boolean';
import { CardCampaign, CardCampaignRow } from '@/partials/cards';
import { LayoutGrid, List, Plus } from 'lucide-react';
import { useState } from 'react';
import CreateLakeModal from './create-lake-modal';

export interface ILakeItem {
  id: string;
  logo: string;
  logoSize?: string;
  logoDark?: string;
  lake: string;
  location: string;
  lake_type?: string;
  status: {
    variant?:
    | 'primary'
    | 'destructive'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | null
    | undefined;
    label: string;
  };
  // statistics: Array<{ total: string; description: string }>;
  // progress: {
  //   variant: string;
  //   value: number;
  // };
}
export interface ILakesContentProps {
  mode: string;
  lakes: any;
}

export function LakesContent({ mode, lakes }: ILakesContentProps) {

  const [currentMode, setCurrentMode] = useState(mode);

  const open = useBoolean();

  // const navigate = useNavigate();


  const renderProject = (item: ILakeItem, index: number) => {
    return (
      <CardCampaign
        id={item?.id || ""}
        logo={lakeImage[index % lakeImage.length].imageUrl}
        logoSize={item?.logoSize || "70px"}
        title={item?.lake || ""}
        description={item.location || ""}
        status={{
          variant: "success",
          label: item?.lake_type || "Fresh Water"
        }}
        // statistics={item.statistics}
        // progress={item.progress}
        url="#"
        key={index}
      />
    );
  };

  const renderItem = (data: ILakeItem, index: number) => {
    return (
      <CardCampaignRow
        id={data?.id || ""}
        logo={lakeImage[index % lakeImage.length].imageUrl}
        logoSize={data?.logoSize || "70px"}
        title={data?.lake || ""}
        description={data.location || ""}
        status={{
          variant: "success",
          label: data?.lake_type || "Fresh Water"
        }}

        url="#"
        key={index}
      />
    );
  };
  // const handleCreateLake = () => {
  //   navigate(paths.businessDashboard.createLake);
  // }

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {lakes.length} Lakes
        </h3>
        <div className="flex gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={currentMode}
            onValueChange={(value) => {
              if (value) setCurrentMode(value);
            }}
          >
            <ToggleGroupItem value="cards">
              <LayoutGrid size={16} />
            </ToggleGroupItem>
            <ToggleGroupItem value="list">
              <List size={16} />
            </ToggleGroupItem>
          </ToggleGroup>
          <Button size="md" onClick={open.onTrue} className="whitespace-nowrap" >
            <Plus /> Add Lake
          </Button>
        </div>
      </div>
      {currentMode === 'cards' && (
        <div id="campaigns_cards">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7.5">

            {
              lakes.map((lake: any, index: number) => {
                return renderProject(lake, index);
              })
            }
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            {/* <Button onClick={() => setPage(page + 1)}>
              Show more Lakes
            </Button> */}
          </div>
        </div>
      )}
      {currentMode === 'list' && (
        <div id="campaigns_list">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {lakes.map((data: any, index: number) => {
              return renderItem(data, index);
            })}
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            {/* <Button  onClick={() => setPage(page + 1)}>
              Show more Lakes
            </Button> */}
          </div>
        </div>
      )}
      <CreateLakeModal open={open.value} onClose={open.onFalse} />
    </div>
  );
}
const lakeImage = [
  {

    imageUrl: 'lake1.jpg',
  },
  {

    imageUrl: 'lake2.jpg',
  },
  {

    imageUrl: 'lake3.jpeg',
  }, {
    imageUrl: 'lake1.jpg',
  }
]

