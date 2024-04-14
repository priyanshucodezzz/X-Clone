import {graphql} from '../../gql'

export const verifyUserGoogleTokenQuery = graphql(`#graphql
    query verifyGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
    }
`);
