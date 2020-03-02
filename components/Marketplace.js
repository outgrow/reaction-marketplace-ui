import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Card, CardActions, CardHeader, CardContent, Grid } from "@material-ui/core";
import Button from "@reactioncommerce/catalyst/Button";
import Toast from "@reactioncommerce/catalyst/Toast";
import { Components } from "@reactioncommerce/reaction-components";
import PrimaryAppBar from "/imports/client/ui/components/PrimaryAppBar/PrimaryAppBar";
import { inviteShopOwner } from "../mutations";
import ShopTable from "./ShopTable";

const RightAlignedGrid = styled(Grid)`
  text-align: right;
`;

export default class Marketplace extends Component {
  constructor() {
    super();

    this.state = {
      isToastOpen: false,
      shopOwnerInviteEmail: "",
      shopOwnerName: "",
      toastMessage: "",
      toastVariant: "info"
    };
  }

  handleCloseToast = () => this.setState({
    isToastOpen: false
  });

  handleInputChange = (field, event) => this.setState({
    [field]: event.target.value
  });

  handleInviteShopOwner = async () => {
    const { client } = this.props;

    try {
      const {
        data: {
          inviteShopOwner: payload
        }
      } = await client.mutate({
        mutation: inviteShopOwner,
        variables: {
          input: {
            emailAddress: this.state.shopOwnerInviteEmail,
            name: this.state.shopOwnerName
          }
        }
      });

      this.setState({
        isToastOpen: true,
        toastMessage: payload.wasInviteSent ? "Invite sent." : "Couldn't send invite.",
        toastVariant: payload.wasInviteSent ? "success" : "error"
      });
    } catch (err) {
      this.setState({
        isToastOpen: true,
        toastMessage: err.message,
        toastVariant: "error"
      });
    }
  };

  render() {
    return (
      <Fragment>
        <PrimaryAppBar title="Marketplace" />

        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Card>
              <CardHeader title="Invitations" />
              <CardContent>
                <Components.TextField
                  label="E-mail address"
                  type="email"
                  value={this.state.shopOwnerInviteEmail}
                  onChange={(event) => this.handleInputChange("shopOwnerInviteEmail", event)}
                />
                <Components.TextField
                  label="Full name"
                  type="text"
                  value={this.state.shopOwnerName}
                  onChange={(event) => this.handleInputChange("shopOwnerName", event)}
                />
              </CardContent>
              <CardActions>
                <Grid container alignItems="center" justify="flex-end">
                  <RightAlignedGrid item xs={12}>
                    <Button color="primary" variant="outlined" onClick={this.handleInviteShopOwner}>Invite Shop Owner</Button>
                  </RightAlignedGrid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>

          <Grid item sm={12}>
            <Card>
              <CardHeader title="Marketplace Shops" />
              <CardContent>
                <ShopTable />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Toast
          open={this.state.isToastOpen}
          onClose={this.handleCloseToast}
          message={this.state.toastMessage}
          variant={this.state.toastVariant}
        />
      </Fragment>
    );
  }
}
