import gql from "graphql-tag";

export default gql`
    mutation inviteShopOwner($input: InviteShopOwnerInput!) {
        inviteShopOwner(input: $input) {
            wasInviteSent
        }
    }
`;
