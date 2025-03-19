import conf from "../confi/confi";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Method for making/ creating a account.       
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // when user create account then after creationn we direct ask for login.
                return this.login({ email, password })

            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
        }
    }

    // Methof for Login.
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
        }
    }

    //Method for logout.
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
        }
    }


    // Method for check user is login or not
    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
        }
        return null;
    }
}

const authService = new AuthService()

export default authService