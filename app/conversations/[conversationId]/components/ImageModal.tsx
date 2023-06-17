'use client';

import Modal from '@/app/components/Modal';
import Image from 'next/image';

interface ImageModalProps {
  isOpen?: boolean;
//   just opens a picture message in middle of screen when you click
  onClose: () => void;
  src?: string | null;
}


const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  src
}) => {
  if (!src) {

    // dont do anything is src is not legit. 
    return null;
  }



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">

        {/* this is for when we open the image model.  */}
        <Image 
          className="object-cover" 
          fill 
          alt="Image" 
          src={src}
        />
      </div>
    </Modal>
  )
}

export default ImageModal;