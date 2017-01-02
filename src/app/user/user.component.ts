import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,
  FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { SharedService } from '../services/shared.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { DomSanitizer, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { ConfigurationService } from '../shared/configuration.service';
// const URL = 'https://rentany-server.herokuapp.com/upload';
const URL = 'http://localhost:8080/upload';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService]
})

export class UserComponent implements OnInit {

  private userForm: FormGroup;
  private id: string;
  private registered: boolean;
  private user: any = {};
  private loading = false;
  private newUser = false;
  private avatarAlreadyUploaded = false;
  private action: string = "";
  private avatar: SafeStyle;
  private imageSuffix: string;
  private errorMessage: string = '';

  // public uploader:FileUploader = new FileUploader({url: 'https://rentany-server.herokuapp.com/upload', queueLimit: 1});
  public uploader:FileUploader = new FileUploader({url: 'http://localhost:8080/upload', queueLimit: 1});

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private sharedService: SharedService,
              private sanitizer: DomSanitizer,
              private builder: FormBuilder,
              private configurationService: ConfigurationService)
  {
    this.userForm = builder.group({
      username: builder.control('', Validators.required),
      email: builder.control('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        function containsSigne(control: FormControl) {
          const reg = /[@]/;
          if (reg.test(control.value))
            return null;
          else
            return { containsSigne: true };
        }
        ]
      )),
      passwords: builder.group({
        password: builder.control('', Validators.compose([
          Validators.required,
          Validators.minLength(10)
        ])),
        passwordRepeat: builder.control('')
      }, {
        validator(group: FormGroup) {
          if (group.value.password !== group.value.passwordRepeat) {
            return { passwordsNotEqual: true };
          }
        return null;
      }})
    });
  }

  ngOnInit() {
    this.errorMessage = "";
    this.registered = false;
    this.imageSuffix = new Date().toString();
    let rentAnyUser = JSON.parse(sessionStorage.getItem('rentAnyUser'));
    if (rentAnyUser === undefined || rentAnyUser === null ) {
      // New User
      this.user = new User();
      this.action = "Registrieren";
      this.newUser = true;
    }
    else {
      // User already registered -> Edit User Data
      this.id = rentAnyUser.userid;
      this.userService.getUser(this.id)
        .subscribe( user => {
            // console.log("User neu geladen")
            this.user=user;
            this.action = "Benutzerdaten ändern"
            this.newUser = false;
          },
          error => {
            this.errorMessage=error
          }
        );

      // this.getUser();
    }
  }

  addUser() {
    if (this.userForm.valid) {
      this.user.password = this.userForm.value.passwords['password'];
      this.userService.addUser(this.user)
        .subscribe(x => {
            console.log(x);
            this.registered = true;
          }
          ,error => this.errorMessage = error
      );
    }
  }

  updateUser() {
    this.userService.updateUser(this.user)
      .subscribe( user => {
          console.log(user);
          this.user = user; // Refresh
          this.sharedService.showRegisterComponent(false);
      },
      error => {
        this.errorMessage=error
      }
    );
  }

  getUser() {
    this.userService.getUser(this.id)
      .subscribe( user => {
          this.user=user;
      },
      error => {
        this.errorMessage=error
      }
    );
  }

  onChange(event) {
    this.user.avataroriginal = event.srcElement.files[0].name;
  }

  onUpload(event) {
    this.uploader.queue[0].upload()
    this.avatarAlreadyUploaded = true;
  }

  avatarURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.user.avatar);
  }

  openChangePasswordDialog() {
    this.sharedService.showRegisterComponent(false);
    this.sharedService.showPWDChangeComponent(true);
  }
}
