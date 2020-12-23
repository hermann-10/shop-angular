import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

}
