

import ConfirmDialog from "@/components/comfirm-dialog/confirm-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useBoolean } from "@/hooks/use-boolean";
import { formatDate, toAbsoluteUrl } from "@/lib/helpers";
import { Rating } from "@/partials/common/rating";
import { selectUser } from "@/store/slices/userSlice";
import { motion } from "framer-motion";
import { CalendarDays, Edit, Tag, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import QuickEditPOIReviewModal from "./quick-edit-pois-review-modal";
import Lightbox from "@/components/ui/lightbox";


const POIsReview = () => {

  const user = useSelector(selectUser);

  const confirm = useBoolean();

  const edit = useBoolean();
  
  const lightbox = useBoolean();

  const [index, setIndex] = useState(0);

  const [currentReview, setCurrentReview] = useState<object | null>(null);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      country: "United State",
      title: "Beautiful POI View",
      description: "Lorem ipsum dolor sit amet consectetur. Aliquet imperdiet metus eu purus aliquam consequat dictum tincidunt. Placerat elementum et sed at egestas. Lorem ipsum dolor sit amet consectetur. Aliquet imperdiet metus eu purus aliquam consequat dictum tincidunt. Placerat elementum et sed at egestas.",
      rating: 4,
      date: "2025-03-25",
      tags: ["Clean Water", "Family Friendly"],
      photos: [
        "/media/images/rakaposhi.jpg",
        "/media/images/eagles-nest.jpg",
        "/media/images/passu-cones.webp",
        "/media/images/altit-fort.jpg",
      ]
    },
    {
      id: 2,
      country: "United State",
      title: "Amazing Experience!",
      description: "Lorem ipsum dolor sit amet consectetur. Aliquet imperdiet metus eu purus aliquam consequat dictum tincidunt. Placerat elementum et sed at egestas. Lorem ipsum dolor sit amet consectetur. Aliquet imperdiet metus eu purus aliquam consequat dictum tincidunt. Placerat elementum et sed at egestas.",
      rating: 5,
      date: "2025-03-25",
      tags: ["Clean Water", "Family Friendly"],
      photos: [
        "/media/images/rakaposhi.jpg",
        "/media/images/eagles-nest.jpg",
        "/media/images/passu-cones.webp",
        "/media/images/altit-fort.jpg",
      ]
    },
  ]);



  // Handle edit
  const handleEdit = (row: object) => {

    setCurrentReview(row);
    edit.onTrue();
  };

  // Handle delete
  const handleDelete = () => {
    // setReviews((prev) => prev.filter((r) => r.id !== currentReview));
    confirm.onFalse();
  };
  // const handleShareReview = () => {
  //   // Implement share functionality here
  //   alert("Share functionality is not implemented yet.");
  // }

  const onDeleteClick = (reviewId: number) => {
    // setCurrentReview(reviewId);
    confirm.onTrue();
  }
  return (
    <>
      <AnimatePresence>

        {reviews.map((review) => (

          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card>
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <Avatar className={'size-10'}>

                      <AvatarImage
                        src={toAbsoluteUrl((user?.image as { url?: string })?.url || '/media/avatars/300-1.png')}
                        alt="image"
                        className={' border-1 border-background hover:z-10'}
                      />
                    </Avatar>

                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{user?.first_name as string + " " + user?.last_name as string || ""}</h3>

                    <p className="text-xs text-muted-foreground">{user?.country as string || ""}</p>
                  </div>

                </div>

                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEdit(review)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>   Edit Review </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => onDeleteClick(review.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent> Delete Review </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardHeader>

              <CardContent className="">
                <div className='grid grid-cols-1 '>
                  <ScrollArea className=''>
                    <div className="gap-2 flex  ">
                      <div className="border rounded-2xl px-5 flex justify-center gap-2 items-center w-fit md:py-1 mb-4 text-sm  ">
                        Rating: <Rating rating={review.rating} />
                      </div>

                      <div className="border rounded-2xl px-5 flex justify-center gap-2 items-center w-fit py-1 mb-4 text-sm  ">
                        <CalendarDays /> Date: <p className="font-medium whitespace-nowrap">{formatDate(review.date)}</p>
                      </div>

                      <div className="border rounded-2xl px-5 flex justify-center gap-2 items-center w-fit py-1 mb-4 text-sm  ">
                        <Tag />Tags:<p className="font-medium whitespace-nowrap">
                          {review.tags.map((tag: string, index: number) => (
                            <Badge key={index} className="ml-1" variant={"primary"} appearance={"light"}>{tag}</Badge>
                          ))}
                        </p>
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold ">{review.title}!</p>
                  <p>{review.description}</p>
                </div>
                <div className="mt-5">
                  <ScrollArea className="w-full">
                    <div className="flex gap-6">
                      {review.photos.map((photo, i) => (
                        <motion.img
                          key={i}
                          src={photo}
                          alt={`Review Photo ${i + 1}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => {
                            setIndex(i);
                            lightbox.onTrue();
                            setCurrentReview(review);
                          }}
                          className="rounded-xl cursor-pointer w-[100px] h-[100px] object-cover border shadow-md hover:shadow-lg transition-all"
                        />
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              </CardContent>

            </Card>
          </motion.div >
        ))}
      </AnimatePresence >
      <QuickEditPOIReviewModal currentPOIsReview={currentReview} open={edit.value} onClose={() => {
        edit.onFalse();
        setCurrentReview(null);
      }} />
      <ConfirmDialog
        title="Delete View"
        content="Are you sure you want to delete this review?"
        open={confirm.value}
        onClose={confirm.onFalse}
        onConfirm={handleDelete}
      />
      <Lightbox
        images={currentReview ? (currentReview as { photos: string[] }).photos : []}
        open={lightbox.value}
        onClose={lightbox.onFalse}
        currentIndex={index}
      />

      {
        reviews.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">No reviews yet.</p>
        )
      }


    </>
  )
}

export default POIsReview