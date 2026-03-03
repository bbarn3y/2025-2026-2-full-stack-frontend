import {ChangeDetectionStrategy, Component, computed, effect, inject, signal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {delay, of} from 'rxjs';
import {ClientService} from '../_services/client.service';

@Component({
  selector: 'app-login.component',
  imports: [
    // Angular modules
    ReactiveFormsModule,
    // Zorro modules
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzIconModule,
    NzInputModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly clientService: ClientService = inject(ClientService);
  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  // private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  readonly loginForm = this.fb.group({
    mail: this.fb.control('', { validators: [Validators.required, Validators.email] }),
    password: this.fb.control('', { validators: [Validators.required] })
  }, {
    updateOn: 'blur'
  });

  // isLoading = false;
  isLoadingSignal = signal(false)
  // notIsLoadingSignal = computed(() => !this.isLoadingSignal())
  // effect(() => {
  //    console.log(this.isLoadingSignal())
  // });

  // constructor(private fb: NonNullableFormBuilder) {
  // }

  login() {
    if (this.loginForm.invalid || this.isLoadingSignal()) {
      return;
    }

    // this.isLoading = true;
    this.isLoadingSignal.set(true);

    this.clientService.login()
      .subscribe({
        next: (response: { token: string, name: string }) => {
          console.log('Mock finished', response);
          // this.isLoading = false;
          this.isLoadingSignal.set(false);
          // this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      })

    // of({ token: 'ABC001' })
    //   .pipe(delay(1000))
    //   .subscribe({
    //     next: (response: { token: string }) => {
    //       console.log('Mock finished', response);
    //       // this.isLoading = false;
    //       this.isLoadingSignal.set(false);
    //       // this.cdr.markForCheck();
    //     },
    //     error: (err) => {
    //       console.error('Login failed', err);
    //     }
    //   })

  }

}
