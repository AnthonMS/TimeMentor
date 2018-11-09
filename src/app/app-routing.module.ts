import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { FeaturesComponent } from './features/features.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { UserComponent } from './user/user.component';
import { RegisterTimeComponent } from './register-time/register-time.component';
import { SupportComponent } from './support/support.component';
import { SuperuserPanelComponent } from './superuser-panel/superuser-panel.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'features',
    component: FeaturesComponent
  },
  {
    path: 'logind',
    component: SigninComponent
  },
  {
    path: 'bruger',
    component: UserComponent
  },
  {
    path: 'registrer-tid',
    component: RegisterTimeComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'admin/manage-users',
    component: SuperuserPanelComponent
  },
  {
    path: 'admin/create-user',
    component: CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
