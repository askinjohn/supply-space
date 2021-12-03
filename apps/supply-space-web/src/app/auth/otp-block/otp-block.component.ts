import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'supply-space-otp-block',
  templateUrl: './otp-block.component.html',
  styleUrls: ['./otp-block.component.scss']
})
export class OtpBlockComponent implements OnInit {
@Output() emitOtp:EventEmitter<string>=new EventEmitter()
  otp = new FormControl('',[Validators.required])
  disableOtpButton: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  submitOtp(){
    this.emitOtp.emit(this.otp.value);
    this.disableOtpButton = true
    this.otp.reset();
  }

}
