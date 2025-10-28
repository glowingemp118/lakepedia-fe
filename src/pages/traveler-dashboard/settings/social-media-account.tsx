import RHFTextField from '@/components/rhf/rhf-textfield'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface PageProps {
  profileData: {

    website: string;
    facebook: string;
    instagram: string;
    youtube: string;
  },

}


const SocialMediaAccount: FC<PageProps> = ({ profileData }) => {

  const defaultValues = useMemo(() => ({
    website: profileData?.website as string || '',
    facebook: profileData?.facebook as string || '',
    instagram: profileData?.instagram as string || '',
    youtube: profileData?.youtube as string || '',
  }), [profileData])

  const schema = z.object({
    website: z.string().url('Invalid URL').optional(),
    facebook: z.string().url('Invalid URL').optional(),
    instagram: z.string().url('Invalid URL').optional(),
    youtube: z.string().url('Invalid URL').optional(),

  });


  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });


  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues])

  const onSubmit = (data: z.infer<typeof schema>) => {
    //console.log(data);
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Website & Social Media Accounts</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Form {...methods} >
          <form onSubmit={methods.handleSubmit(onSubmit)}
            className="block w-full space-y-5">

            <div className='md:col-span-8 col-span-12 md:mb-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <RHFTextField
                  name='website'
                  label='Website'
                  placeholder='https://yourwebsite.com'
                  className='py-2 h-10'
                />
                <RHFTextField
                  name='facebook'
                  label='Facebook Account'
                  placeholder='https://facebook.com/yourpage'
                  className='py-2 h-10'
                />
                <RHFTextField
                  name='instagram'
                  label='Instagram Account'
                  placeholder='https://instagram.com/yourprofile'
                  className='py-2 h-10'
                />
                <RHFTextField
                  name='youtube'
                  label='YouTube Account'
                  placeholder='https://youtube.com/@yourchannel'
                  className='py-2 h-10 md:col-span-2'
                />

              </div>
            </div>
            <div className='flex justify-end items-center gap-2'>
              <Button variant={"outline"} size="lg">Discard</Button>
              <Button type='submit' variant={"primary"} size="lg">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>

  )
}

export default SocialMediaAccount