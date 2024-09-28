import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Media {
        id: ID!
        title: String!
        content: String!
        created: String!
        updated: String!
        user: User!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        media: [Media!]!
    }

    type Query {
        getMedia(id: ID!): Media
        getAllMedia: [Media!]!
        searchTitle(title: String!): [Media!]!
        filterByDate(startDate: String!, endDate: String!): [Media!]!
        getMediaByUser(page: Int, limit: Int): MediaPagination!
        getPostByID(id: ID!): Media
    }

    type Mutation {
        createMedia(title: String!, content: String!): Media!
        updateMedia(id: ID!, title: String, content: String): Media!
        deleteMedia(id: ID!): DeleteMediaResponse!
    }

    type MediaPagination {
        total: Int!
        page: Int!
        limit: Int!
        media: [Media!]!
    }

    type DeleteMediaResponse {
        message: String
    }
`;
const mediaTypeDefs = typeDefs;
export default mediaTypeDefs;