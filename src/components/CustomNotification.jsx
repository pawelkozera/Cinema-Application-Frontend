import React, { useState } from 'react';
import { Notification } from '@mantine/core';

function CustomNotification({ onClose, ...props }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose && onClose();
  };

  return (
    show && <Notification {...props} onClose={handleClose} />
  );
}

export default CustomNotification;
