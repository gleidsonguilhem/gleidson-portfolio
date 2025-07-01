

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode; // This is the key part! Add children here

};

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Contact Me</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  );
};

export default ContactModal;
