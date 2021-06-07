import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './pages/message/message.component';


const appRoutes: Routes = [    
    
    { path: '**', redirectTo:'/',pathMatch:'full'}    ,
    { path: '', component: MessageComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:false, scrollPositionRestoration:'enabled'})
