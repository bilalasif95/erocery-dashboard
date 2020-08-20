import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { AtomicBlockUtils, EditorState, EntityInstance } from "draft-js";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { buttonMessages } from "@saleor/intl";
import Form from "../Form";

interface ImageSourceProps {
  editorState: EditorState;
  entity?: EntityInstance;
  entityKey?: string;
  entityType: {
    type: string;
  };
  onComplete: (updateState: EditorState) => void;
  onClose: () => void;
}

const ImageSource: React.FC<ImageSourceProps> = ({
  editorState,
  entity,
  entityKey,
  entityType,
  onComplete,
  onClose
}) => {
  const intl = useIntl();

  const initial = entity ? entity.getData().href : "";
  const altInitial = entity ? entity.getData().alt : "";

  const handleSubmit = (href: string,alt: string) => {
    if (href) {
      const content = editorState.getCurrentContent();
      if (entity) {
        const nextContent = content.mergeEntityData(entityKey, { href,alt });
        const nextState = EditorState.push(
          editorState,
          nextContent,
          "apply-entity"
        );
        onComplete(nextState);
      } else {
        const contentWithEntity = content.createEntity(
          entityType.type,
          "IMMUTABLE",
          { href,alt}
        );
        const nextState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          contentWithEntity.getLastCreatedEntityKey(),
          " "
        );

        onComplete(nextState);
      }
    } else {
      onComplete(editorState);
    }
  };

  return (
    <Dialog onClose={onClose} open={true} fullWidth maxWidth="sm">
      <Form
        initial={{ href: initial,alt: altInitial }}
        onSubmit={({ href,alt }) => handleSubmit(href,alt)}
      >
        {({ data, change, submit }) => (
          <>
            <DialogTitle>
              <FormattedMessage
                defaultMessage="Add Image Link"
                description="dialog header"
              />
            </DialogTitle>
            <DialogContent>
              <TextField
                name="href"
                fullWidth
                label={intl.formatMessage({
                  defaultMessage: "Image URL"
                })}
                value={data.href}
                onChange={change}
              />
            </DialogContent>
            <DialogContent>
              <TextField
                name="alt"
                fullWidth
                label={intl.formatMessage({
                  defaultMessage: "Alt Tag"
                })}
                value={data.alt}
                onChange={change}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.cancel} />
              </Button>
              <Button onClick={submit} color="primary" variant="contained">
                <FormattedMessage {...buttonMessages.save} />
              </Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

export default ImageSource;
