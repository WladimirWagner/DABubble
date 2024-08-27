import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { FirebaseAuthService } from './firebase-auth.service';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  fireService = inject(FirestoreService)
  authService = inject(FirebaseAuthService);

  constructor() { }

  /**
   * 
   * @returns the current logged in User
   */
  getCurrentUser() {
    let currentUser: User = new User;
    if (this.authService.auth.currentUser) {
      const uid = this.authService.auth.currentUser.uid;
      const user = this.fireService.users.find(user => user.uid === uid);
      currentUser = new User(user);
    }
      return currentUser;
  }


  /**
   * this method returns the img path for the avatar
   * of the current logged in user
   * returns a fallback img if user has no avatar
   */
  getCurrentUsersAvatar(): string {
    if (this.authService.auth.currentUser) {
      const currentUserUid = this.authService.auth.currentUser.uid;
      const user = this.fireService.users.find(user => user.uid === currentUserUid);
      
      if (user && user.avatar) {
        return user.avatar;
      }
    }
    return 'assets/img/chars/profile_placeholder.png';
  }

   /**
   * set user avatar img
   * fallback to placeholder, if no img set
   * @param user 
   * @returns 
   */
   setAvatarImg(user: User){
    if (user.avatar !== '') {
      return user.avatar;
    } else {
      return 'assets/img/chars/profile_placeholder.png';
    }
  }

  /**
   * Call this method to delete all data in 'users'
   * then push example users to 'users' collection in firebase
   */
  async resetUsersInFirebase(){
    if (confirm('Delete all Users, and replace with example Users?')) {
      await this.deleteAllUsers();
      await this.addExampleUsersToFirebase();
    }
  }

  async addExampleUsersToFirebase(){
    for (let i = 0; i < this.fireService.exampleUsers.length; i++) {
      const user = this.fireService.exampleUsers[i];
      await this.fireService.addUser(user);
    }
  }

  async deleteAllUsers(){
    while (this.fireService.users.length > 0) {
      const id = this.fireService.users[0].id;
      await this.fireService.deleteDocument(id, 'users');
    }
  }
}
