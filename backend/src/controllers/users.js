import UsersDataAcces from "../dataAccess/users.js"
import {  ok, serverError } from '../helpers/httpRespose.js'

export default class UsersControllers{
    constructor(){
        this.dataAccess = new UsersDataAcces()
    }

    async getUsers(){
        try {
            const users = await this.dataAccess.getUsers()
            return ok(users)
            
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteUser(userId){
        try {
            const result = await this.dataAccess.deleteUser(userId)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }

    async updateUser(userId, userData){
        try {
            const result = await this.dataAccess.updateUser(userId, userData)
            return ok(result)
            
        } catch (error) {
            return serverError(error)
        }
    }

}