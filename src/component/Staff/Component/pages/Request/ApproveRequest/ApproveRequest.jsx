import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import AddIcon from '@mui/icons-material/Add';
import { Button } from "semantic-ui-react";
// import { TextField } from '@mui/material';
import swal from 'sweetalert';
import action_book from '../../../../../../api/staff/action_book';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApproveRequest(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={handleClickOpen} style={{margin: "8px 0", display: "flex", alignItems: "center"}}>
          Action
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Action"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color={"facebook"} onClick={async ()=> {
                  const result= await action_book(props?.id, 1)
                  if(result?.update=== true) {
                    swal("Notice", "You've approved this request successfully", "success")
                    .then(()=> {
                      handleClose()
                      props?.setChange(prev=> !prev)
                    })
                  }
                  else {
                    swal("Notice", "Error", "error")
                  }
            }}>Approve</Button>
          <Button color={"youtube"} onClick={async ()=> {
              const result= await action_book(props?.id, 2)
              if(result?.update=== true) {
                swal("Notice", "Decliend request", "success")
                .then(()=> {
                  handleClose()
                  props?.setChange(prev=> !prev)
                })
              }
              else {
                swal("Thông báo", "Error", "error")
              }
          }}>Decline</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}