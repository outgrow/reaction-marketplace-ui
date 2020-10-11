import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import {Card, CardActions, CardContent, CardHeader, Grid, makeStyles} from "@material-ui/core";
import Button from "@reactioncommerce/catalyst/Button";
import Toast from "@reactioncommerce/catalyst/Toast";
import { Components } from "@reactioncommerce/reaction-components";
import { inviteShopOwner } from "../mutations";
import InvitationTable from "/imports/plugins/core/accounts/client/components/Invitations.js";

const useStyles = makeStyles(() => ({
  marginTop: {
    marginTop: "1rem"
  },
  rightAligned: {
    textAlign: "right"
  }
}));

export default function Invitations() {
  const classes = useStyles();

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [shopOwnerInviteEmail, setShopOwnerInviteEmail] = useState("");
  const [shopOwnerName, setShopOwnerName] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("info");

  const [inviteShopOwnerMutation] = useMutation(inviteShopOwner, {
    onCompleted() {
      setIsToastOpen(true);
      setToastMessage(payload.wasInviteSent ? "Invite sent." : "Couldn't send invite.");
      setToastVariant(payload.wasInviteSent ? "success" : "error");
    },
    onError() {
      setIsToastOpen(true);
      setToastMessage(err.message);
      setToastVariant("error");
    }
  });

  const handleInviteShopOwner = async () => {
    await inviteShopOwnerMutation({
      variables: {
        input: {
          emailAddress: shopOwnerInviteEmail,
          name: shopOwnerName
        }
      }
    });
  };

  return (
    <Grid container spacing={1} className={classes.marginTop}>
      <Grid item sm={12}>
        <Card>
          <CardHeader title="Invitations"/>
          <CardContent>
            <Components.TextField
              label="E-mail address"
              type="email"
              value={shopOwnerInviteEmail}
              onChange={(event) => setShopOwnerInviteEmail(event.target.value)}
            />
            <Components.TextField
              label="Full name"
              type="text"
              value={shopOwnerName}
              onChange={(event) => setShopOwnerName(event.target.value)}
            />
          </CardContent>
          <CardActions>
            <Grid container alignItems="center" justify="flex-end">
              <Grid item xs={12} className={classes.rightAligned}>
                <Button color="primary" variant="outlined" onClick={handleInviteShopOwner}>Invite Shop Owner</Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>

      <Grid item sm={12}>
        <InvitationTable />
      </Grid>

      <Toast
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message={toastMessage}
        variant={toastVariant}
      />
    </Grid>
  );
}

