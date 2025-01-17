/**
 * This Service File is for opening and closing UI Elements
 */
import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  observerService = inject(BreakpointObserver);
  fireService = inject(FirestoreService);

  currentDataPath = '';

  introAnimationPlayed: boolean = false; // the intro animation on the start screen will be played only once

  showWorkspaceMenu: boolean = true; // workspace menu in main-content
  showDirectMessages: boolean = true; // user list in workspace menu
  showChannels: boolean = true; // channel list in workspace menu

  showChannelEditPopup: boolean = false; // opens in channel-chat-component
  showAddUserToChannelPopup: boolean = false;
  showChannelUsersPopup: boolean = false;
  showChannelUsersAddUser: boolean = false;
  showChannelUsers: boolean = true;

  mainContent: 'channelChat' | 'newMessage' | 'directMessage' = 'newMessage';

  showChat: boolean = true; // chat window in main-content
  showThread: boolean = false; // thread window in main-content
  showAddChannelPopup: boolean = false; // add new channel popup
  showAddChannelInlinePopup1: boolean = true; // name and description
  showAddChannelInlinePopup2: boolean = false;  // users
  channelPopup2Searchbar: boolean = false // search users for channel

  showEditUserAndLogoutPopup: boolean = false;
  showViewProfilePopup: boolean = false;
  showEditProfilePopup: boolean = false;
  showVerifyPasswordPopup: boolean = false;
  showChangeAvatarContainer: boolean = false;
  showProfileChangeConfirmationPopup: boolean = false;
  showOtherUsersProfile: boolean = false;

  showMobileNavigation: boolean = false;
  showMobilePopup: boolean = false;

  mobilePopupContent: 'addUser' = 'addUser';


  toggleMobilePopup() {
    this.showMobilePopup = !this.showMobilePopup;
  }

  toggleMobileNavigation(){
    this.showMobileNavigation = !this.showMobileNavigation;
  }

  mobileBackBtn(){
    if (this.showThread) {
      this.showThread = false;
      this.showChat = true;
    } else {
      this.showChat = false;
      this.showWorkspaceMenu = true;
      this.showMobileNavigation = false;
    }
  }

  /**
   * set all userChatActive values to false
   */
  userChatNotActive(){
    this.fireService.users.forEach((user) => {
      user.userChatActive = false;
    })
  }

  /**
   * 
   * @param user set chat active to true and
   * other users to false
   */
  hightlightUserChat(user: User){
    this.fireService.users.forEach((userInList) => {
      if (user.uid === userInList.uid) {
        userInList.userChatActive = true;
      } else {
        userInList.userChatActive = false;
      }
    })
  }

  /**
   * set all channelActive values to false
   */
  channelChatNotActive(){
    this.fireService.channels.forEach((channel) => {
      channel.channelActive = false;
    })
  }

  openChatMobile(content: 'channelChat' | 'newMessage' | 'directMessage'){
    this.mainContent = content;
    this.showWorkspaceMenu = false;
    this.showThread = false;
    this.showChat = true;
    this.showMobileNavigation = true;
  }

  openThreadMobile(){
    this.showWorkspaceMenu = false;
    this.showThread = true;
    this.showChat = false;
    this.showMobileNavigation = true;
  }

  openWorkspaceMenuMobile(){
    this.showWorkspaceMenu = true;
    this.showThread = false;
    this.showChat = false;
    this.showMobileNavigation = false;
  }

  closeThreadWindow() {
    this.showThread = false;
  }

  changeMainContent(content: 'channelChat' | 'newMessage' | 'directMessage'){
    this.mainContent = content;
  }

  showAddUserInChannelUser(){
    this.showChannelUsersAddUser = true;
    this.showChannelUsers = false;
  }

  toggleChannelUsersPopup(){
    this.showChannelUsersPopup = !this.showChannelUsersPopup;
    this.showChannelUsersAddUser = false;
    this.showChannelUsers = true;
  }

  toggleAddUserToChannelPopup(){
    if (this.showChannelUsersAddUser) {
      this.toggleChannelUsersPopup();
    } else {
      this.showAddUserToChannelPopup = !this.showAddUserToChannelPopup;
    }
  }

  toggleEditChannelPopup(){
    this.showChannelEditPopup = !this.showChannelEditPopup;
  }

  /**
   * Close Popup for adding Channel Name and Description
   * Open Popup for adding Users to Channel
   */
  openAddChannelPopup2(){
    this.showAddChannelInlinePopup2 = !this.showAddChannelInlinePopup2;
    this.showAddChannelInlinePopup1 = !this.showAddChannelInlinePopup1;
  }


  toggleAddChannelPopup(){
    this.showAddChannelPopup = !this.showAddChannelPopup;
    this.showAddChannelInlinePopup2 = false;
    this.showAddChannelInlinePopup1 = true;
  }

  toggleWorkspaceMenu(){
    this.showWorkspaceMenu = !this.showWorkspaceMenu;
  }

  toggleDirectMessages(){
    this.showDirectMessages = !this.showDirectMessages;
  }

  toggleChannels(){
    this.showChannels = !this.showChannels;
  }

  /**
   * Toggles the visibility of the popup for editing the user profile and logging out.
   * Resets other related popups to their hidden state.
   */
  toggleEditUserAndLogoutPopup() {
    this.showEditUserAndLogoutPopup = !this.showEditUserAndLogoutPopup;
    this.showViewProfilePopup = false;
    this.showEditProfilePopup = false;
    this.showVerifyPasswordPopup = false;
    this.showChangeAvatarContainer = false;
  }

  /**
   * Toggles the visibility of the popup for viewing the user profile.
   */
  toggleViewProfile() {
    this.showViewProfilePopup = !this.showViewProfilePopup;
  }

  /**
   * Toggles the visibility of the popup for editing the user profile.
   */
  toggleEditProfile() {
    this.showEditProfilePopup = !this.showEditProfilePopup;
  }

  /**
   * Toggles the visibility of the container for changing the user's avatar.
   */
  toggleChangeAvatarContainer() {
    this.showChangeAvatarContainer = !this.showChangeAvatarContainer;
  }

  /**
   * Toggles the visibility of the popup for verifying the user's password.
   */
  toggleVerifyPassword() {
    this.showVerifyPasswordPopup = !this.showVerifyPasswordPopup;
  }

  /**
   * Toggles the visibility of the confirmation popup for profile changes.
   * The variable "showProfileChangeConfirmationPopup" will automatically set to false after 4.5 seconds.
   */
  toggleProfileChangeConfirmationPopup() {
    this.showProfileChangeConfirmationPopup = !this.showProfileChangeConfirmationPopup;
    
    setTimeout(() => {
      this.showProfileChangeConfirmationPopup = false;
    }, 4500);
  }

  toggleOtherUsersProfile() {
    this.showOtherUsersProfile = !this.showOtherUsersProfile;
  }

  constructor() { }
}
