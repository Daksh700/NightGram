import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabaseService {

    client = new Client();
    databases;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createPost({caption, featuredImage, userId, name}) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, ID.unique(), {
                caption,
                featuredImage,
                userId,
                name
            })
        } catch (error) {
            console.log("Appwrite Service createPost error: ", error);
        }
    }

    async updatePost(documentId, {caption, featuredImage}) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId, {
                caption,
                featuredImage
            })
        } catch (error) {
            console.log("Appwrite Service updatePost error: ", error);
        }
    }

    async deletePost(documentId) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId);
            return true;
        } catch (error) {
            console.log("Appwrite Service deletePost error: ", error);
            return false;
        }
    }

    async getPost(documentId) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, documentId);
        } catch (error) {
            console.log("Appwrite Service getPost error: ", error);
            return false;
        }
    }

    async getPosts(queries = []) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite Service getPosts error: ", error);
            return false;
        }
    }

}

const databaseService = new DatabaseService();

export default databaseService;