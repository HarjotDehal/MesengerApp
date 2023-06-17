'use client';

import React, { useCallback, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { FiAlertTriangle } from 'react-icons/fi'
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import Modal from '@/app/components/modals/Modal';
import Button from '@/app/components/Button';
import useConversation from '@/app/hooks/useConversation';
import { toast } from 'react-hot-toast';
import Modal from '@/app/components/Modal';

    interface ConfirmModalProps {
    isOpen?: boolean;
    // checks if its open or not
    onClose: () => void;
    }

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();

    // our convo which we always need
  const [isLoading, setIsLoading] = useState(false);
  
  const onDelete = useCallback(() => {
    setIsLoading(true);
                    // this deletes our conversation from the database. Then it closes the convo and re routes us to convo page
    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose();
      router.push('/conversations');
      router.refresh();
    })
    .catch(() => toast.error('Something went wrong!'))
    // toast error which is the pop up

    .finally(() => setIsLoading(false))
  }, [router, conversationId, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div 
        // this has a red background
          className="
            mx-auto 
            flex 
            h-12 
            w-12 
            flex-shrink-0 
            items-center 
            justify-center 
            rounded-full 
            bg-red-100 
            sm:mx-0 
            sm:h-10 
            sm:w-10
          "
        >
          <FiAlertTriangle 
        //   similar to hazard sign but it is red
            className="h-6 w-6 text-red-600" 
            aria-hidden="true"
          />
        </div>
        <div 
          className="
            mt-3 
            text-center 
            sm:ml-4 
            sm:mt-0 
            sm:text-left
          "
        >
          <Dialog.Title 
        //   title of our delete alert. Followed by smaller message in the p tag 
            as="h3" 
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this conversation? This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        {/* our two buttons. One deletes and one goes back */}
        <Button
          disabled={isLoading}
          danger
          onClick={onDelete}
        //   deletes thru actions from api
        >
          Delete
        </Button>
        <Button
          disabled={isLoading}
          secondary

        //   goes back to our message screen. 
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal;