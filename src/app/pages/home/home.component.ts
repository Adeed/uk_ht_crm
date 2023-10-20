import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  messages: string[] = [];

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    // For example, assume you have a service to fetch messages
    // this.messageService.getMessages().subscribe(
    //   data => this.messages = data,
    //   error => console.error(error)
    // );
  }
}
