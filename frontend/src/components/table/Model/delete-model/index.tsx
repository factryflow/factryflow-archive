import React from "react";
import "./index.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { Box, IconButton, Typography } from "@mui/material";
import Deleteicon from "@/assets/images/delete.svg";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
const DeleteModel = ({ deleteModel, setDeleteModel }: any) => {
  return (
    <>
      <Modal
        opened={deleteModel}
        onClose={() => setDeleteModel(false)}
        radius={20}
        size={"md"}
        centered
        withCloseButton={false}
      >
        <div className="main-model">
          <div className="frist_row">
            <IconButton
              size="medium"
              edge="start"
              aria-label="open drawer"
              onClick={() => {}}
              className="delete-icon"
            >
              <img src={Deleteicon} alt="Deleteicon" height={30} width={30} />
            </IconButton>
            <Typography variant="h3" className="h3">
              Are you sure you want to delete?
            </Typography>
            <Typography variant="h6" className="h6">
              By deleting <b>“Loreum Ipsum”</b> Job, all task inside that column
              will also be deleted.
            </Typography>
          </div>
          <Box component={"div"} className="btn-model-row">
            <Button
              variant="contained"
              size="large"
              className="btn-cancel-model"
              onClick={() => setDeleteModel(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              size="large"
              type="submit"
              loading={false}
              variant="contained"
              className="btn-delete-model"
            >
              Delete
            </LoadingButton>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModel;
