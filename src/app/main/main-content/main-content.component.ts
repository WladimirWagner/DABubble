import { Component, inject } from '@angular/core';
import { WorkspaceMenuComponent } from "../workspace-menu/workspace-menu.component";
import { WorkspaceMenuButtonComponent } from "../workspace-menu-button/workspace-menu-button.component";
import { UiService } from '../../services/ui.service';
import { ChatComponent } from "../chat/chat.component";

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [WorkspaceMenuComponent, WorkspaceMenuButtonComponent, ChatComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  uiService = inject(UiService);
  

}