import React, { useState} from 'react';
import {useNavigate} from'react-router-dom';
import { Button, Modal, Box, Typography, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

// Styles for the modal
const useStyles = makeStyles((theme) => ({
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    maxHeight: '90%',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  listItemTextPrimary: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium,
  },
  listItemTextSecondary: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    color: '#3f51b5',
    marginBottom: theme.spacing(2),
  },
}));

const Instructions = () => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();
const navigate=useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/Home')
  };

  return (
    <div>
      {/* <Button variant="contained" color="primary" onClick={handleOpen} className={classes.button}>
        Show Instructions
      </Button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box className={classes.modalBox}>
        <Button onClick={handleClose} color="secondary" style={{marginTop: '20px',marginRight:'0px'}}>
            Close
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.heading}>
            Important Instructions for Users
          </Typography>
          <Typography variant="body2" component="p" className={classes.listItemTextSecondary}>
            Submission of Original Documents: Users are required to submit an original hard copy of all bills and receipts in the account section that they uploaded/submitted in the online medical reimbursement form. This step is essential for the verification of the application by the account section.
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.heading} style={{marginTop: '20px'}}>
            Hierarchy of Application Verification:
          </Typography>
          <List>
            <ListItem><ListItemText primary="1. Pharmacist" classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
            <ListItem><ListItemText primary="2. Medical Officer" classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
            <ListItem><ListItemText primary="3. Account Section / DA / JAO" classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
            <ListItem><ListItemText primary="4. AO / AR" classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
            <ListItem><ListItemText primary="5. Sr AO (Senior Accounts Officer): Required only if the claimed amount is greater than or equal to 50,000." classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
            <ListItem><ListItemText primary="6. Registrar" classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
            <ListItem><ListItemText primary="7. Director: Necessary only if the allowed amount is greater than or equal to 2,00,000." classes={{ primary: classes.listItemTextPrimary }} /></ListItem>
          </List>

          <Typography id="modal-modal-title" variant="h6" component="h2" className={classes.heading} style={{marginTop: '20px'}}>
            Completion of Verification:
          </Typography>
          <Typography variant="body2" component="p" className={classes.listItemTextSecondary}>
            The application is considered completely verified if:
            <br />- The Registrar verifies the application, and the allowed amount is less than 2,00,000.
            <br />- If the allowed amount is greater than or equal to 2,00,000, then the Director must also verify the application.
          </Typography>

       

        </Box>
      </Modal>
    </div>
  );
};

export default Instructions;
