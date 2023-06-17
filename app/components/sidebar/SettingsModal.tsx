'use client'



import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { CldUploadButton } from 'next-cloudinary';

import Input from "../inputs/Input";
// import Modal from '../modals/Modal';
import Button from '../Button';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import Modal from '../Modal';

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 

  currentUser = {}
}) => {
  const router = useRouter();

//   check if loading or not
  const [isLoading, setIsLoading] = useState(false);

//   console.log(currentUser, '&TEST_CURRENT_USER')


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image

    //   allows us to upload image of an user
    }
  });

  const image = watch('image');
// this lets it change immediately
  const handleUpload = (result: any) => {
    setValue('image', result.info.secure_url, { 
      shouldValidate: true 
    //   requires us to validate an image for a profile picture
    });
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/settings', data)

    // sends to our database
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    // once it is submit to database, then we go back out of loading
    .finally(() => setIsLoading(false));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* this form lets us change profile information.  */}
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 
              className="
                text-base 
                font-semibold 
                leading-7 
                text-gray-900
              "
            >
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
            //   this is input for our Name. It autofills with our current name first
                disabled={isLoading}
                label="Name" 
                id="name" 
                errors={errors} 
                required 
                register={register}
              />
              <div>
                <label 
                // input for our photo if we wanna change it
                  htmlFor="photo" 
                  className="
                    block 
                    text-sm 
                    font-medium 
                    leading-6 
                    text-gray-900
                  "
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48" 
                    className="rounded-full" 
                    src={image || currentUser?.image || '/images/placeholder.jpg'}
                    alt="Avatar"
                  />
                  <CldUploadButton 
                    options={{ maxFiles: 1 }} 
                    onUpload={handleUpload} 
                    uploadPreset="cqnllw4w"
                  >
                    {/* our same upload button */}
                    <Button
                      disabled={isLoading}
                      secondary
                      type="button"
                    >
                        {/* Change lets us change our picture */}
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="
            mt-6 
            flex 
            items-center 
            justify-end 
            gap-x-6
          "
        >
          <Button 
            disabled={isLoading}
            secondary 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
        //   this lets us get rid of or save changes
            disabled={isLoading}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default SettingsModal;