'use client';

import { 
  HiPaperAirplane, 
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import {  FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";

const Form = () => {
         const { conversationId } = useConversation();
        // get our conversation 
    const {
        // get these values from our form
        register,
        handleSubmit,
        setValue,
        formState: {
        errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
        message: ''
        }
    });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // We accept data as a parameter and return a post to our api if there is a message to be validated. 

    setValue('message', '', { shouldValidate: true });
    // this resets the message value back to nothing and re renders. This is our message bar at the bottom before we send it. 
    axios.post('/api/messages', {
      ...data,
    //   we sprread the data
      conversationId: conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
            // this uploads our image 
            

    })
  }

  return ( 
    <div id="jj"
      className="
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-full
      "
    >
        {/* this is our bottom submit section */}
      <CldUploadButton 
        options={{ maxFiles: 1 }} 
        // can only upload 1 picture
        onUpload={handleUpload} 
        uploadPreset="cqnllw4w"
        // our upload preset from cloudinary
      >
        
      {/* this is our upload button from cloudinary */}
        <HiPhoto size={30} className="text-sky-500" />
        {/* this is for our photo upload.  */}
      </CldUploadButton>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        // 
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput 
          id="message" 
          register={register} 
//   this is essentially our messageBar which we will send. 
          errors={errors} 
          required 
          placeholder="Write a message"
        />
        <button 
            // our submit button to send our message

          type="submit" 
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
            // our submit button to send our message
          />
        </button>
      </form>
    </div>
  );
}
 
export default Form;