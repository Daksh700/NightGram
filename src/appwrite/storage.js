import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";

export class StorageService {
    client = new Client();
    bucket;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("Appwrite Service uploadFile error: ", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log("Appwrite Service deleteFile error: ", error);
            return false;
        }
    }

    getFileView(fileId) {
        return this.bucket.getFileView(conf.appwriteBucketId, fileId)
    }

}

const storageService = new StorageService();

export default storageService;