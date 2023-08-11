import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";


function CustomStatusPopUp({successTitle, successMessage, redirectUrl }) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(!open);

  const handleSubmit = () => {
    window.location.href = redirectUrl;
  }

  console.log(redirectUrl);

  return (
      <div>
        
        <Dialog open={open} handler={handleOpen}>
          <DialogBody className="grid place-items-center gap-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-16 w-16 text-green-500"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" />
            </svg>

            <Typography color="green" variant="h4">
              {successTitle}
            </Typography>
            <Typography className="text-center font-normal">
              {successMessage}
            </Typography>
            <Button variant="gradient" color="green" onClick={handleSubmit}>
              Ok, Got it
            </Button>
          </DialogBody>
        </Dialog>
      </div>
  );
}

export default CustomStatusPopUp;
