import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let valid = true;

    if (!fields.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    if (!fields.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = 'Enter a valid email';
      valid = false;
    }
    if (!fields.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (fields.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');

    // 🔌 Replace this with your real email service (EmailJS, Resend, Formspree, etc.)
    await new Promise(res => setTimeout(res, 1500));

    setFormState('success');
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      transition: 'box-shadow 0.2s',
      '&.Mui-focused': {
        boxShadow: '0 0 0 3px rgba(83, 74, 183, 0.15)',
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {formState === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={5}
            gap={2}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 52, color: '#6db33f' }} />
            <Typography variant="h6" fontWeight={500}>
              Message sent!
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Thanks for reaching out. I'll be in touch soon.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setFormState('idle');
                setFields({ name: '', email: '', message: '' });
              }}
              sx={{ mt: 1, textTransform: 'none', borderRadius: 2 }}
            >
              Send another message
            </Button>
          </Box>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onSubmit={handleSubmit}
          noValidate
        >
          <Box display="flex" flexDirection="column" gap={2.5} pt={1}>
            <TextField
              label="Name"
              name="name"
              value={fields.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
              size="medium"
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              size="medium"
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Message"
              name="message"
              value={fields.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
              fullWidth
              multiline
              rows={4}
              size="medium"
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                    <MessageOutlinedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            {formState === 'error' && (
              <Typography variant="caption" color="error">
                Something went wrong. Please try again.
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              size="large"
              disableElevation
              disabled={formState === 'loading'}
              endIcon={
                formState === 'loading'
                  ? <CircularProgress size={16} color="inherit" />
                  : <SendIcon fontSize="small" />
              }
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: 2,
                py: 1.25,
                bgcolor: '#534AB7',
                '&:hover': {
                  bgcolor: '#3C3489',
                },
              }}
            >
              {formState === 'loading' ? 'Sending…' : 'Send message'}
            </Button>
          </Box>
        </motion.form>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;