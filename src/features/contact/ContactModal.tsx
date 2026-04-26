import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pt: 3,
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={500}>
            Get in touch
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            I'll get back to you as soon as possible.
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: 3, pb: 3, pt: 1 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;